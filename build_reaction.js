// build_reaction.js — generates js/reaction.js
'use strict';
const fs = require('fs');

// ── Helper: escape all non-ASCII to \uXXXX ───────────────────
function esc(str) {
  return JSON.stringify(str)
    .replace(/[\u0080-\uffff]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4,'0'));
}
function escObj(obj) {
  return JSON.stringify(obj)
    .replace(/[\u0080-\uffff]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4,'0'));
}

// ── UI Strings (Arabic) ───────────────────────────────────────
const UI = {
  addHint:    'أضف عناصر من الجدول وابدأ التفاعل 🔬',
  noEl:       'لا توجد عناصر. انقر "+ أضف عنصراً"',
  needTwo:    'أضف عنصرين على الأقل ثم انقر تفاعل!',
  noRxn:      'لا يوجد تفاعل معروف بين هذه العناصر. جرّب ظروفاً مساعدة أو غيّر العناصر.',
  success:    'تفاعل ناجح! الناتج: ',
  cleared:    'تم مسح المختبر 🗑️',
  alreadyIn:  'هذا العنصر مضاف فعلاً',
  pickHint:   '← انقر على عنصر من الجدول لإضافته إلى المتفاعلات',
  possTitle:  'تفاعلات محتملة مع عناصرك:',
  suggTitle:  '📋 تفاعلات شائعة — انقر لتحميل:',
  guideTitle: 'خطوات إجراء التجربة:',
  warning:    '⚠️ تحذير: هذا التفاعل خطير — يُجرى تحت إشراف متخصص فقط',
  ready:      '✅ جاهز للتفاعل',
  needs:      'يحتاج: ',
  misses:     'ينقص: ',
  condNeeded: 'الظروف المطلوبة: ',
  delTip:     'انقر للحذف',
  noRxnTitle: 'لا يوجد تفاعل',
  noRxnSub:   'جرّب ظروفاً مساعدة (حرارة، ضغط، محفز...) أو عناصر مختلفة.',
  intro:      'اختر عناصر من الجدول الدوري، أضف الظروف المناسبة، ثم انقر "تفاعل!" لمشاهدة ما سيحدث.',
};

// ── Reactions Database ────────────────────────────────────────
// r: element atomic numbers (all must be present)
// reqCond: conditions that MUST be selected
// prod: formula, prodAr: Arabic name
// eq: full equation, effect: canvas effect, sound: audio type
// color: flash colour, warning: show danger flag
// desc: Arabic description, guide: Arabic steps array
const RXNS = [
{r:[1,8], reqCond:[], prod:'H\u2082O', prodAr:'\u0645\u0627\u0621',
 eq:'2H\u2082 + O\u2082 \u2192 2H\u2082O', effect:'fire', sound:'crackle', color:'#ff6b00',
 desc:'احتراق الهيدروجين مع الأكسجين ينتج الماء وطاقة ضخمة. يُستخدم في محركات الصواريخ الفضائية ويُعدّ مصدر طاقة نظيف للمستقبل.',
 guide:['جهّز غاز الهيدروجين H₂ في وعاء مغلق','جهّز غاز الأكسجين O₂','أشعل شرارة كهربائية أو لهب','ستلاحظ اشتعالاً سريعاً وإنتاج قطرات ماء','احذر: التفاعل انفجاري مع الكميات الكبيرة'], warning:true},

{r:[11,17], reqCond:[], prod:'NaCl', prodAr:'\u0645\u0644\u062d \u0627\u0644\u0637\u0639\u0627\u0645',
 eq:'2Na + Cl\u2082 \u2192 2NaCl', effect:'explosion', sound:'boom', color:'#ffff00',
 desc:'يتحد الصوديوم المعدني مع غاز الكلور السام في تفاعل عنيف جداً لينتج ملح الطعام الآمن. مثال رائع على كيف تتحد مواد خطيرة لتنتج مادة مألوفة!',
 guide:['ضع معدن الصوديوم في وعاء زجاجي','أدخل غاز الكلور بتركيز منضبط','التفاعل يبدأ فوراً بدون حرارة','تتكون بلورات بيضاء من ملح الطعام','يُجرى هذا التفاعل تحت شفاط في المختبر'], warning:true},

{r:[1,17], reqCond:[], prod:'HCl', prodAr:'\u062d\u0645\u0636 \u0627\u0644\u0647\u064a\u062f\u0631\u0648\u0643\u0644\u0648\u0631\u064a\u0643',
 eq:'H\u2082 + Cl\u2082 \u2192 2HCl', effect:'smoke', sound:'hiss', color:'#aaffaa',
 desc:'يتفاعل الهيدروجين مع الكلور (خاصة في الضوء) لإنتاج حمض الهيدروكلوريك. هذا هو نفس الحمض الموجود في معدة الإنسان الذي يساعد على الهضم!',
 guide:['امزج غاز الهيدروجين مع غاز الكلور','الضوء يُسرّع التفاعل بشكل كبير','ينتج دخان أبيض كثيف هو HCl','يذوب في الماء ليعطي حمض الهيدروكلوريك','الحمض قوي ويُخرّب الجلد والأنسجة'], warning:true},

{r:[26,8], reqCond:[], prod:'Fe\u2082O\u2083', prodAr:'\u0635\u062f\u0623 \u0627\u0644\u062d\u062f\u064a\u062f',
 eq:'4Fe + 3O\u2082 \u2192 2Fe\u2082O\u2083', effect:'rust', sound:'sizzle', color:'#8b4513',
 desc:'يتأكسد الحديد ببطء في وجود الأكسجين والرطوبة لينتج الصدأ الأحمر. تُكلف ظاهرة الصدأ الاقتصاد العالمي مئات المليارات سنوياً.',
 guide:['تأكد من وجود رطوبة في الهواء','الحديد يتفاعل ببطء مع الأكسجين','تتشكل طبقة حمراء على السطح','التفاعل يستمر حتى تآكل المعدن كلياً','الدهان والطلاء يمنعان وصول الأكسجين'], warning:false},

{r:[6,8], reqCond:[], prod:'CO\u2082', prodAr:'\u062b\u0627\u0646\u064a \u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0643\u0631\u0628\u0648\u0646',
 eq:'C + O\u2082 \u2192 CO\u2082', effect:'fire', sound:'crackle', color:'#ff4400',
 desc:'احتراق الكربون مع الأكسجين ينتج ثاني أكسيد الكربون. هذا ما يحدث عند حرق الفحم والوقود، وهو الغاز المسبب للاحتباس الحراري.',
 guide:['أشعل الكربون (فحم/خشب) في الهواء','الأكسجين يتحد مع ذرات الكربون','ينتج CO₂ وطاقة حرارية كبيرة','CO₂ غاز عديم اللون والرائحة','يُستخدم في إطفاء الحرائق وصناعة المشروبات'], warning:false},

{r:[12,8], reqCond:[], prod:'MgO', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0645\u063a\u0646\u064a\u0633\u064a\u0648\u0645',
 eq:'2Mg + O\u2082 \u2192 2MgO', effect:'glow', sound:'flash', color:'#ffffff',
 desc:'يحترق المغنيسيوم بلهب أبيض ساطع جداً لا يمكن النظر إليه مباشرة! يُستخدم في الألعاب النارية والإضاءة الطبية وصواريخ الإشارة.',
 guide:['أمسك شريط المغنيسيوم بملقط معدني','اشعله بلهب موقد','لا تنظر مباشرة للهب الأبيض (ضار للعيون)','لا تطفئه بالماء (يزيد التفاعل شدة)','الناتج مسحوق أبيض من أكسيد المغنيسيوم'], warning:true},

{r:[7,1], reqCond:['heat','pressure','catalyst'], prod:'NH\u2083', prodAr:'\u063a\u0627\u0632 \u0627\u0644\u0623\u0645\u0648\u0646\u064a\u0627',
 eq:'N\u2082 + 3H\u2082 \u2192 2NH\u2083', effect:'bubble', sound:'bubble', color:'#00ccff',
 desc:'عملية هابر: ثورة في تاريخ البشرية. تُستخدم لصنع الأسمدة التي تُغذّي أكثر من نصف سكان الأرض! تحتاج حرارة وضغطاً عالياً ومحفزاً.',
 guide:['ارفع درجة الحرارة إلى 400-500°C','ارفع الضغط إلى 150-300 ضغط جوي','أضف محفزاً من الحديد (Fe)','النيتروجين والهيدروجين يتحدان ببطء','ينتج غاز الأمونيا ذو الرائحة النفاذة'], warning:false},

{r:[20,8], reqCond:[], prod:'CaO', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0643\u0627\u0644\u0633\u064a\u0648\u0645 (\u0627\u0644\u062c\u064a\u0631 \u0627\u0644\u062d\u064a)',
 eq:'2Ca + O\u2082 \u2192 2CaO', effect:'spark', sound:'crackle', color:'#ffaa00',
 desc:'يحترق الكالسيوم بشرر برتقالي لينتج الجير الحي (CaO). يُستخدم الجير الحي في صناعة الأسمنت والجبس ومعالجة مياه الصرف.',
 guide:['أشعل معدن الكالسيوم','يحترق بشرر برتقالي جميل','ينتج مسحوق أبيض كثيف','الجير الحي يتفاعل مع الماء بشدة','يُستخدم في البناء والزراعة'], warning:false},

{r:[11,8], reqCond:[], prod:'Na\u2082O', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0635\u0648\u062f\u064a\u0648\u0645',
 eq:'4Na + O\u2082 \u2192 2Na\u2082O', effect:'explosion', sound:'boom', color:'#ffff44',
 desc:'يحترق الصوديوم بلهب أصفر ساطع لإنتاج أكسيد الصوديوم. لهذا يجب تخزين الصوديوم المعدني في الكيروسين بعيداً عن الهواء والماء!',
 guide:['لا تلمس الصوديوم باليد أبداً','ضعه في الكيروسين لحين الاستخدام','اسحب قطعة صغيرة جداً فقط','التفاعل فوري ومشتعل باللون الأصفر','يُولّد حرارة شديدة'], warning:true},

{r:[19,17], reqCond:[], prod:'KCl', prodAr:'\u0643\u0644\u0648\u0631\u064a\u062f \u0627\u0644\u0628\u0648\u062a\u0627\u0633\u064a\u0648\u0645',
 eq:'2K + Cl\u2082 \u2192 2KCl', effect:'explosion', sound:'boom', color:'#cc44ff',
 desc:'يتحد البوتاسيوم مع الكلور بتفاعل عنيف لإنتاج كلوريد البوتاسيوم. يُستخدم في الأسمدة الزراعية وبديلاً لملح الطعام في حمية قليلة الصوديوم.',
 guide:['البوتاسيوم أكثر نشاطاً من الصوديوم','التفاعل أقوى وأكثر خطورة','يُجرى تحت شفاط إجباري','ينتج بلورات شفافة من KCl','يُستخدم في الأسمدة وحمية الملح'], warning:true},

{r:[6,1], reqCond:[], prod:'CH\u2084', prodAr:'\u0627\u0644\u0645\u064a\u062b\u0627\u0646 (\u0627\u0644\u063a\u0627\u0632 \u0627\u0644\u0637\u0628\u064a\u0639\u064a)',
 eq:'C + 2H\u2082 \u2192 CH\u2084', effect:'bubble', sound:'bubble', color:'#44ffaa',
 desc:'الميثان هو المكون الرئيسي للغاز الطبيعي المستخدم في الطبخ والتدفئة. وقود أنظف من الفحم ويُنتج عند تحلل المواد العضوية.',
 guide:['امزج الكربون مع الهيدروجين تحت ضغط','يُنتج الميثان طبيعياً في المستنقعات','غاز عديم اللون والرائحة','خفيف يطفو في الهواء','قابل للاشتعال بسهولة — احذر من التسرب'], warning:false},

{r:[16,8], reqCond:[], prod:'SO\u2082', prodAr:'\u062b\u0627\u0646\u064a \u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0643\u0628\u0631\u064a\u062a',
 eq:'S + O\u2082 \u2192 SO\u2082', effect:'smoke', sound:'hiss', color:'#aaff00',
 desc:'يحترق الكبريت بلهب أزرق جميل لإنتاج ثاني أكسيد الكبريت ذو الرائحة النفاذة. انبعاثاته من المصانع هي سبب المطر الحمضي.',
 guide:['أشعل الكبريت الأصفر','يحترق بلهب أزرق مميز','ينتج غاز خانق برائحة نفاذة','في الجو: SO₂+H₂O → حمض كبريتيك','سبب المطر الحمضي الضار بالبيئة'], warning:true},

{r:[13,8], reqCond:[], prod:'Al\u2082O\u2083', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0623\u0644\u0648\u0645\u0646\u064a\u0648\u0645',
 eq:'4Al + 3O\u2082 \u2192 2Al\u2082O\u2083', effect:'spark', sound:'crackle', color:'#ffffff',
 desc:'يحترق الألومنيوم المسحوق بشرر أبيض ساطع. طبقة رقيقة من Al₂O₃ تتكون تلقائياً على سطح الألومنيوم وتحميه من التآكل (لهذا لا يصدأ الألومنيوم).',
 guide:['الألومنيوم المطحون قابل للاشتعال','يحترق بشرر أبيض ساطع','يُستخدم في الألعاب النارية','طبقة الأكسيد الطبيعية تحمي المعدن','الكوراندوم واليوبي بلورات من Al₂O₃'], warning:true},

{r:[29,8], reqCond:['heat'], prod:'CuO', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0646\u062d\u0627\u0633 \u0627\u0644\u0623\u0633\u0648\u062f',
 eq:'2Cu + O\u2082 \u2192 2CuO', effect:'rust', sound:'sizzle', color:'#1a1a1a',
 desc:'عند تسخين النحاس في الهواء يتأكسد ويتحول إلى اللون الأسود. هذا ما يحدث عند طبخ الطعام في أوانٍ نحاسية بدرجات حرارة عالية.',
 guide:['سخّن شريط نحاسي فوق اللهب','لاحظ تغير اللون من أحمر إلى أسود','التفاعل يبدأ عند 300°C تقريباً','ينتج أكسيد النحاس الأسود CuO','يمكن إعادة اختزاله بالهيدروجين'], warning:false},

{r:[26,16], reqCond:['heat'], prod:'FeS', prodAr:'\u0643\u0628\u0631\u064a\u062a\u064a\u062f \u0627\u0644\u062d\u062f\u064a\u062f',
 eq:'Fe + S \u2192 FeS', effect:'glow', sound:'crackle', color:'#ffaa00',
 desc:'خليط الحديد والكبريت لا يتفاعل في درجة الحرارة العادية، لكن عند التسخين يتحدان في تفاعل انبعاثي. مثال كلاسيكي في المختبر المدرسي!',
 guide:['امزج مسحوق الحديد مع مسحوق الكبريت','لاحظ أن المغناطيس يجذب الحديد (قبل التفاعل)','سخّن الخليط ببطء','التفاعل ذاتي الاستمرار بعد البدء','الناتج لا يجذبه المغناطيس: دليل كيميائي'], warning:false},

{r:[15,8], reqCond:[], prod:'P\u2082O\u2085', prodAr:'\u062e\u0645\u0627\u0633\u064a \u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0641\u0633\u0641\u0648\u0631',
 eq:'4P + 5O\u2082 \u2192 2P\u2082O\u2085', effect:'glow', sound:'flash', color:'#ffffff',
 desc:'الفوسفور يشتعل بلهب أبيض ساطع. P₂O₅ ممتص قوي للرطوبة ويُستخدم في المختبرات لتجفيف الغازات والمواد.',
 guide:['الفوسفور الأبيض يشتعل في هواء الغرفة!','خطر جداً: لا يُلمس باليد أبداً','يحترق بلهب أبيض كثيف الدخان','ينتج P₂O₅ وهو ممتص قوي للرطوبة','الفوسفور الأحمر (أقلام الثقاب) أقل خطورة'], warning:true},

{r:[7,8], reqCond:['electricity'], prod:'NO', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0646\u064a\u062a\u0631\u064a\u0643',
 eq:'N\u2082 + O\u2082 \u2192 2NO', effect:'smoke', sound:'hiss', color:'#aa8800',
 desc:'يتحد النيتروجين والأكسجين في درجات حرارة عالية جداً كالبرق لإنتاج أكسيد النيتريك. يتأكسد في الهواء ليعطي NO₂ البني المسبب للضباب الدخاني.',
 guide:['يحتاج درجات حرارة فوق 1200°C','يحدث طبيعياً أثناء البرق والرعد','لا يحدث في ظروف المختبر العادية بدون كهرباء','ينتج غاز عديم اللون','يتحول في الهواء إلى NO₂ البني السام'], warning:true},

{r:[3,8], reqCond:[], prod:'Li\u2082O', prodAr:'\u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0644\u064a\u062b\u064a\u0648\u0645',
 eq:'4Li + O\u2082 \u2192 2Li\u2082O', effect:'fire', sound:'crackle', color:'#ff4400',
 desc:'الليثيوم أخف الفلزات القلوية يحترق باللون الأحمر القرمزي الجميل. هذا اللون المميز يُستخدم في الألعاب النارية الحمراء!',
 guide:['احفظ الليثيوم بعيداً عن الهواء دائماً','قطعة صغيرة تكفي للتجربة','يحترق باللون الأحمر المميز','أبطأ وأقل عنفاً من Na و K','يُستخدم لون اللون القرمزي في الألعاب النارية'], warning:false},

{r:[30,16], reqCond:['heat'], prod:'ZnS', prodAr:'\u0643\u0628\u0631\u064a\u062a\u064a\u062f \u0627\u0644\u0632\u0646\u0643',
 eq:'Zn + S \u2192 ZnS', effect:'explosion', sound:'boom', color:'#ffff00',
 desc:'تفاعل شديد الانبعاث الحراري. كبريتيد الزنك يُستخدم في شاشات التلفزيون القديمة ولوحات المؤشرات المضيئة في الظلام.',
 guide:['امزج مسحوق الزنك مع الكبريت','ابتعد وأشعله من مسافة آمنة','تفاعل انفجاري قوي وسريع','الناتج مسحوق يضيء في الظلام','يُستخدم في شاشات الرادار وأنابيب أشعة كاثود'], warning:true},

{r:[14,8], reqCond:['heat'], prod:'SiO\u2082', prodAr:'\u062b\u0627\u0646\u064a \u0623\u0643\u0633\u064a\u062f \u0627\u0644\u0633\u064a\u0644\u064a\u0643\u0648\u0646 (\u0631\u0645\u0644)',
 eq:'Si + O\u2082 \u2192 SiO\u2082', effect:'spark', sound:'crackle', color:'#aaaaaa',
 desc:'أكسيد السيليكون هو المكون الرئيسي للرمل والزجاج. يُحيط بنا في كل مكان! السيليكون شبه موصل يُستخدم في الرقائق الإلكترونية.',
 guide:['يحتاج تسخيناً لدرجات عالية','السيليكون يحترق ببطء','ينتج SiO₂ أبيض شفاف','الزجاج الذي تراه هو SiO₂ بصورة رئيسية','يُستخدم في الألياف البصرية والرقائق'], warning:false}
];

const RXNS_JSON = escObj(RXNS);
const UI_JSON   = escObj(UI);

// ── Canvas / Audio / Logic JS (all Arabic via \u) ────────────
const js = `// reaction.js — Reaction Lab | auto-generated
(function(){
'use strict';
var RXNS=${RXNS_JSON};
var UI=${UI_JSON};

var rxnEls=[], rxnRaf=null, rxnAudioCtx=null;

// ── Public hooks called from main.js ─────────────────────────
window.rxnOnEl=function(n){
  var el=window.EL&&window.EL[n];
  if(!el)return;
  if(rxnEls.some(function(e){return e.n===n;})){
    setRxnStatus(el.sym+' — '+UI.alreadyIn);return;
  }
  rxnEls.push(el);
  endRxnPick();
  renderTray();
  updateGuide();
  setRxnStatus(el.ar+' \u2795 \u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629');
};

window.rxnSetMode=function(){
  rxnEls=[];
  renderTray();
  clearRxnCanvas();
  resetResult();
  updateGuide();
  setRxnStatus(UI.addHint);
};

// ── Tray ─────────────────────────────────────────────────────
function renderTray(){
  var tray=document.getElementById('rxn-tray');
  if(!tray)return;
  if(!rxnEls.length){tray.innerHTML='<div class="rxn-empty-msg">'+UI.noEl+'</div>';return;}
  var parts=rxnEls.map(function(el,i){
    return '<div class="rxn-el-tile c-'+el.cat+'" title="'+UI.delTip+'" onclick="rxnRemoveEl('+i+')">'+
      '<span class="ret-sym">'+el.sym+'</span>'+
      '<span class="ret-name">'+el.ar+'</span>'+
      '<span class="ret-del">\u00d7</span></div>';
  });
  // interleave + signs
  var html='';
  parts.forEach(function(p,i){html+=(i?'<div class="rxn-plus">+</div>':'')+p;});
  tray.innerHTML=html;
}

window.rxnRemoveEl=function(i){
  rxnEls.splice(i,1);
  renderTray();updateGuide();resetResult();clearRxnCanvas();
};

// ── Pick mode ─────────────────────────────────────────────────
function startRxnPick(){
  var panel=document.getElementById('reaction-panel');
  if(panel)panel.classList.add('picking');
  var ht=document.getElementById('rxn-hint-txt');
  if(ht)ht.textContent=UI.pickHint;
}
function endRxnPick(){
  var panel=document.getElementById('reaction-panel');
  if(panel)panel.classList.remove('picking');
}
window.startRxnPick=startRxnPick;
window.endRxnPick=endRxnPick;

// ── Conditions ───────────────────────────────────────────────
function getConds(){
  var cbs=document.querySelectorAll('#rxn-conditions input:checked');
  return Array.prototype.map.call(cbs,function(cb){return cb.value;});
}

// ── Match reaction ────────────────────────────────────────────
function matchRxn(){
  var nums=rxnEls.map(function(e){return e.n;});
  var conds=getConds();
  var best=null,bestScore=0;
  RXNS.forEach(function(rxn){
    var allPresent=rxn.r.every(function(n){return nums.indexOf(n)!==-1;});
    if(!allPresent)return;
    if(rxn.reqCond&&rxn.reqCond.length){
      var metAll=rxn.reqCond.every(function(c){return conds.indexOf(c)!==-1;});
      if(!metAll)return;
    }
    var score=rxn.r.length*10-(nums.length-rxn.r.length);
    if(score>bestScore){bestScore=score;best=rxn;}
  });
  return best;
}

// ── Run reaction ──────────────────────────────────────────────
window.runReaction=function(){
  if(rxnEls.length<1){setRxnStatus(UI.needTwo);return;}
  var rxn=matchRxn();
  if(!rxn){
    setRxnStatus(UI.noRxn);
    showNoRxn();
    playRxnSound('bubble');
    return;
  }
  showResult(rxn);
  startRxnAnim(rxn.effect,rxnEls,rxn.prod,rxn.color);
  playRxnSound(rxn.sound);
  setRxnStatus(UI.success+rxn.prodAr);
};

window.clearReaction=function(){
  rxnEls=[];
  renderTray();clearRxnCanvas();resetResult();updateGuide();
  document.querySelectorAll('#rxn-conditions input').forEach(function(cb){cb.checked=false;});
  setRxnStatus(UI.cleared);
};

// ── Result panel ─────────────────────────────────────────────
function showResult(rxn){
  var d=document.getElementById('rxn-result');
  if(d)d.classList.remove('hidden');
  setText('rxn-eq',rxn.eq);
  setText('rxn-prod-name',rxn.prod+' \u2014 '+rxn.prodAr);
  setText('rxn-prod-desc',rxn.desc);
  showGuide(rxn);
}
function showNoRxn(){
  var d=document.getElementById('rxn-result');
  if(d)d.classList.remove('hidden');
  setText('rxn-eq','?');
  setText('rxn-prod-name',UI.noRxnTitle);
  setText('rxn-prod-desc',UI.noRxnSub);
}
function resetResult(){
  var d=document.getElementById('rxn-result');
  if(d)d.classList.add('hidden');
}
function setText(id,txt){var el=document.getElementById(id);if(el)el.textContent=txt;}
function setRxnStatus(msg){var el=document.getElementById('rxn-status');if(el)el.textContent=msg;}

// ── Guide panel ───────────────────────────────────────────────
function showGuide(rxn){
  var gc=document.getElementById('guide-content');
  if(!gc)return;
  gc.innerHTML=
    '<div class="guide-steps-title">'+UI.guideTitle+'</div>'+
    rxn.guide.map(function(s,i){
      return '<div class="guide-step"><span class="step-num">'+(i+1)+'</span>'+s+'</div>';
    }).join('')+
    (rxn.warning?'<div class="guide-warning">'+UI.warning+'</div>':'');
}

function updateGuide(){
  var gc=document.getElementById('guide-content');
  if(!gc)return;
  if(!rxnEls.length){
    // Show suggestions
    var sugg=RXNS.slice(0,8);
    gc.innerHTML='<p class="guide-intro">'+UI.intro+'</p>'+
      '<div class="guide-sugg-title">'+UI.suggTitle+'</div>'+
      sugg.map(function(rxn){
        return '<div class="guide-sugg" onclick="rxnQuickLoad('+JSON.stringify(rxn.r)+')">'+rxn.eq+'</div>';
      }).join('');
    return;
  }
  var nums=rxnEls.map(function(e){return e.n;});
  var conds=getConds();
  var possible=RXNS.filter(function(rxn){
    return rxn.r.some(function(n){return nums.indexOf(n)!==-1;});
  });
  if(!possible.length){gc.innerHTML='<p class="guide-intro">'+UI.intro+'</p>';return;}
  gc.innerHTML='<div class="guide-sugg-title">'+UI.possTitle+'</div>'+
    possible.map(function(rxn){
      var complete=rxn.r.every(function(n){return nums.indexOf(n)!==-1;});
      var condMet=!rxn.reqCond.length||rxn.reqCond.every(function(c){return conds.indexOf(c)!==-1;});
      var missing=rxn.r.filter(function(n){return nums.indexOf(n)===-1;});
      var condMiss=rxn.reqCond.filter(function(c){return conds.indexOf(c)===-1;});
      var cls=complete&&condMet?'ready':complete?'condwait':'partial';
      return '<div class="guide-possible '+cls+'">'+
        '<span class="gp-eq">'+rxn.eq+'</span>'+
        (complete&&condMet?'<span class="gp-badge ready">'+UI.ready+'</span>':'')+
        (missing.length?'<span class="gp-badge miss">'+UI.misses+missing.map(function(n){var e=window.EL&&window.EL[n];return e?e.sym:'?';}).join(', ')+'</span>':'')+
        (condMiss.length?'<span class="gp-badge cond">'+UI.needs+condMiss.join(', ')+'</span>':'')+
        '</div>';
    }).join('');
}

window.rxnQuickLoad=function(nums){
  rxnEls=[];
  nums.forEach(function(n){var el=window.EL&&window.EL[n];if(el)rxnEls.push(el);});
  renderTray();updateGuide();resetResult();clearRxnCanvas();
  setRxnStatus(UI.addHint);
};

// ── Canvas ────────────────────────────────────────────────────
function clearRxnCanvas(){
  stopRxnAnim();
  var cv=document.getElementById('rxn-canvas');if(!cv)return;
  var cx=cv.getContext('2d');
  cx.fillStyle='#030712';cx.fillRect(0,0,cv.width,cv.height);
  drawIdleCanvas(cv,cx);
}

function drawIdleCanvas(cv,cx){
  if(!rxnEls.length){
    cx.fillStyle='rgba(40,60,120,0.12)';cx.fillRect(0,0,cv.width,cv.height);
    cx.font='44px serif';cx.fillStyle='#1a2a5a';
    cx.textAlign='center';cx.textBaseline='middle';
    cx.fillText('\u2697\ufe0f',cv.width/2,cv.height/2-18);
    cx.font='13px sans-serif';cx.fillStyle='#2a4080';
    cx.fillText(UI.addHint,cv.width/2,cv.height/2+26);
    return;
  }
  var n=rxnEls.length;
  rxnEls.forEach(function(el,i){
    drawAtomCircle(cx,(i+1)*cv.width/(n+1),cv.height/2,26,el);
  });
}

function drawAtomCircle(cx,x,y,r,el){
  var hue=el.n*31%360;
  var g=cx.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);
  g.addColorStop(0,'hsl('+hue+',75%,72%)');
  g.addColorStop(1,'hsl('+hue+',55%,35%)');
  cx.beginPath();cx.arc(x,y,r,0,Math.PI*2);
  cx.fillStyle=g;cx.fill();
  cx.strokeStyle='hsl('+hue+',80%,65%)';cx.lineWidth=1.5;cx.stroke();
  cx.fillStyle='#fff';
  cx.font='bold '+(r*.65)+'px monospace';
  cx.textAlign='center';cx.textBaseline='middle';
  cx.fillText(el.sym,x,y);
}

function stopRxnAnim(){if(rxnRaf){cancelAnimationFrame(rxnRaf);rxnRaf=null;}}

function startRxnAnim(effect,els,productStr,flashCol){
  stopRxnAnim();
  var cv=document.getElementById('rxn-canvas');if(!cv)return;
  var cx=cv.getContext('2d');
  var W=cv.width,H=cv.height;
  var particles=[];
  var frame=0,phase=0;
  var flashA=0,flashC=flashCol||'#ffffff';
  var nR=els.length;
  var atoms=els.map(function(el,i){
    return{x:(i+1)*W/(nR+1),y:H*.38,tx:W/2,ty:H*.5,vx:0,vy:0,el:el,a:1};
  });

  var EFFECTS={
    fire:    {count:6,bottom:true, hue:10,hr:40,rMin:5,rMax:14,da:.022,spd:0, sat:100,lit:62,stroke:false},
    explosion:{count:14,bottom:false,hue:20,hr:60,rMin:3,rMax:12,da:.024,spd:5.5,sat:100,lit:65,stroke:false},
    smoke:   {count:4,bottom:false,hue:0, hr:0, rMin:8,rMax:20,da:.008,spd:1, sat:0,  lit:58,stroke:false},
    rust:    {count:5,bottom:false,hue:15,hr:15,rMin:4,rMax:14,da:.012,spd:2, sat:55, lit:38,stroke:false},
    glow:    {count:9,bottom:false,hue:50,hr:60,rMin:5,rMax:18,da:.015,spd:3, sat:80, lit:70,stroke:false},
    bubble:  {count:3,bottom:true, hue:195,hr:45,rMin:5,rMax:14,da:.010,spd:0,sat:70, lit:65,stroke:true},
    spark:   {count:12,bottom:false,hue:45,hr:25,rMin:2,rMax:6, da:.03, spd:6, sat:100,lit:72,stroke:false},
    flash:   {count:8,bottom:false,hue:50,hr:70,rMin:4,rMax:16,da:.018,spd:3.5,sat:85,lit:68,stroke:false}
  };

  function spawn(eo,count){
    var cfg=EFFECTS[eo]||EFFECTS.explosion;
    count=count||cfg.count;
    for(var i=0;i<count;i++){
      var ang=Math.random()*Math.PI*2;
      var spd=(cfg.spd||3)*(0.5+Math.random());
      particles.push({
        x:W/2+(Math.random()-.5)*24,
        y:cfg.bottom?H-18:H*.5+(Math.random()-.5)*24,
        vx:cfg.bottom?(Math.random()-.5)*3:Math.cos(ang)*spd,
        vy:cfg.bottom?-(Math.random()*5+2):Math.sin(ang)*spd,
        r:(cfg.rMin||3)+Math.random()*(cfg.rMax||10),
        a:.9+Math.random()*.1,da:cfg.da||.018,
        hue:cfg.hue+Math.random()*(cfg.hr||40),
        sat:cfg.sat!==undefined?cfg.sat:90,
        lit:cfg.lit||60,stroke:cfg.stroke||false
      });
    }
  }

  function drawParticles(){
    particles=particles.filter(function(p){
      p.x+=p.vx;p.y+=p.vy;
      if(effect==='fire'||effect==='bubble')p.vy-=.07;
      if(effect==='smoke'){p.r*=1.008;p.vx+=(Math.random()-.5)*.25;p.vy-=.04;}
      if(effect==='explosion'||effect==='spark'){p.vx*=.96;p.vy*=.96;}
      p.a=Math.max(0,p.a-p.da);
      return p.a>.01&&p.r>.5;
    });
    particles.forEach(function(p){
      cx.beginPath();cx.arc(p.x,p.y,p.r,0,Math.PI*2);
      var col='hsla('+p.hue+','+p.sat+'%,'+p.lit+'%,'+p.a+')';
      if(p.stroke){cx.strokeStyle=col;cx.lineWidth=2;cx.stroke();}
      else{cx.fillStyle=col;cx.fill();}
    });
  }

  function tick(){
    cx.fillStyle='#030712';cx.fillRect(0,0,W,H);
    if(flashA>.01){
      cx.globalAlpha=flashA;cx.fillStyle=flashC;cx.fillRect(0,0,W,H);
      cx.globalAlpha=1;flashA*=.87;
    }
    if(phase===0){
      var done=true;
      atoms.forEach(function(a){
        var dx=a.tx-a.x,dy=a.ty-a.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d>8){a.vx+=dx*.04;a.vy+=dy*.04;a.vx*=.82;a.vy*=.82;a.x+=a.vx;a.y+=a.vy;done=false;}
        drawAtomCircle(cx,a.x,a.y,24,a.el);
      });
      if(done&&frame>12){
        phase=1;frame=0;
        flashA=effect==='glow'||effect==='flash'||effect==='explosion'?.95:.5;
      }
    } else if(phase===1){
      spawn(effect);drawParticles();
      if(frame>85){phase=2;frame=0;particles=[];}
    } else {
      if(frame%5===0&&particles.length<35)spawn(effect,Math.ceil((EFFECTS[effect]||EFFECTS.explosion).count/3));
      drawParticles();
      var pulse=30+Math.sin(frame*.06)*5;
      cx.beginPath();cx.arc(W/2,H/2,pulse+5,0,Math.PI*2);
      cx.fillStyle='hsla('+(frame*1.5%360)+',55%,25%,.45)';cx.fill();
      cx.beginPath();cx.arc(W/2,H/2,pulse,0,Math.PI*2);
      cx.fillStyle='hsl('+(frame*1.5%360)+',65%,50%)';cx.fill();
      cx.fillStyle='#fff';cx.font='bold 14px monospace';
      cx.textAlign='center';cx.textBaseline='middle';
      cx.fillText(productStr,W/2,H/2);
    }
    frame++;
    rxnRaf=requestAnimationFrame(tick);
  }
  tick();
}

// ── Web Audio ─────────────────────────────────────────────────
function getACtx(){
  if(!rxnAudioCtx){try{rxnAudioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}
  return rxnAudioCtx;
}
function playRxnSound(type){
  var ctx=getACtx();if(!ctx)return;
  try{
    if(ctx.state==='suspended')ctx.resume();
    var t=ctx.currentTime;
    if(type==='boom'){
      var o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);o.type='sawtooth';
      o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(22,t+.55);
      g.gain.setValueAtTime(.7,t);g.gain.exponentialRampToValueAtTime(.001,t+.7);
      o.start(t);o.stop(t+.7);
      var bn=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.25),ctx.sampleRate);
      var bd=bn.getChannelData(0);for(var bi=0;bi<bd.length;bi++)bd[bi]=(Math.random()*2-1)*(1-bi/bd.length);
      var bns=ctx.createBufferSource(),bng=ctx.createGain();
      bns.buffer=bn;bns.connect(bng);bng.connect(ctx.destination);
      bng.gain.setValueAtTime(.55,t);bng.gain.exponentialRampToValueAtTime(.001,t+.3);bns.start(t);
    } else if(type==='crackle'){
      for(var ci=0;ci<7;ci++){
        (function(d){
          var cb=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.05),ctx.sampleRate);
          var cd=cb.getChannelData(0);for(var k=0;k<cd.length;k++)cd[k]=Math.random()*2-1;
          var cs=ctx.createBufferSource(),cg=ctx.createGain();
          cs.buffer=cb;cs.connect(cg);cg.connect(ctx.destination);
          cg.gain.setValueAtTime(.35,t+d);cg.gain.exponentialRampToValueAtTime(.001,t+d+.07);cs.start(t+d);
        })(ci*.1+Math.random()*.06);
      }
    } else if(type==='bubble'){
      for(var bi2=0;bi2<9;bi2++){
        (function(d){
          var bo=ctx.createOscillator(),bg=ctx.createGain();
          bo.connect(bg);bg.connect(ctx.destination);
          bo.frequency.setValueAtTime(500+Math.random()*400,t+d);
          bo.frequency.exponentialRampToValueAtTime(200,t+d+.13);
          bg.gain.setValueAtTime(.25,t+d);bg.gain.exponentialRampToValueAtTime(.001,t+d+.16);
          bo.start(t+d);bo.stop(t+d+.2);
        })(bi2*.13+Math.random()*.07);
      }
    } else if(type==='hiss'){
      var hb=ctx.createBuffer(1,Math.floor(ctx.sampleRate*1.5),ctx.sampleRate);
      var hd=hb.getChannelData(0);for(var hi=0;hi<hd.length;hi++)hd[hi]=Math.random()*2-1;
      var hs=ctx.createBufferSource(),hf=ctx.createBiquadFilter(),hg=ctx.createGain();
      hf.type='bandpass';hf.frequency.value=3800;hf.Q.value=.4;
      hs.buffer=hb;hs.connect(hf);hf.connect(hg);hg.connect(ctx.destination);
      hg.gain.setValueAtTime(.18,t);hg.gain.exponentialRampToValueAtTime(.001,t+1.5);hs.start(t);
    } else if(type==='sizzle'){
      var sb=ctx.createBuffer(1,Math.floor(ctx.sampleRate*1.8),ctx.sampleRate);
      var sd=sb.getChannelData(0);
      for(var si=0;si<sd.length;si++)sd[si]=(Math.random()*2-1)*Math.pow(1-si/sd.length,1.5);
      var ss=ctx.createBufferSource(),sf=ctx.createBiquadFilter(),sg=ctx.createGain();
      sf.type='highpass';sf.frequency.value=2800;
      ss.buffer=sb;ss.connect(sf);sf.connect(sg);sg.connect(ctx.destination);
      sg.gain.setValueAtTime(.15,t);sg.gain.exponentialRampToValueAtTime(.001,t+1.8);ss.start(t);
    } else if(type==='flash'){
      var fo=ctx.createOscillator(),fg=ctx.createGain();
      fo.connect(fg);fg.connect(ctx.destination);fo.type='square';
      fo.frequency.setValueAtTime(1600,t);fo.frequency.exponentialRampToValueAtTime(80,t+.14);
      fg.gain.setValueAtTime(.5,t);fg.gain.exponentialRampToValueAtTime(.001,t+.17);
      fo.start(t);fo.stop(t+.17);
    }
  }catch(e){console.warn(e);}
}

// ── Close / init ──────────────────────────────────────────────
window.closeReaction=function(){
  stopRxnAnim();
  document.getElementById('reaction-panel').classList.add('hidden');
  if(window.setMode)window.setMode('explore');
};

clearRxnCanvas();
updateGuide();
})();
`;

fs.writeFileSync('d:/VR Experience/js/reaction.js', js, {encoding:'utf8'});
console.log('Done! reaction.js size:', js.length);
