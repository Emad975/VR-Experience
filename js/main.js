// Periodic Table Interactive — Edama
(function(){
'use strict';
var ELEMENTS=[{"n":1,"sym":"H","ar":"هيدروجين","en":"Hydrogen","mass":1.008,"cat":"nonmetal","period":1,"group":1,"shells":[1],"neutrons":0,"desc":"أخف العناصر وأكثرها وفرة في الكون. يدخل في تركيب الماء H₂O ويُستخدم وقوداً نظيفاً للمستقبل."},{"n":2,"sym":"He","ar":"هيليوم","en":"Helium","mass":4.003,"cat":"noble","period":1,"group":18,"shells":[2],"neutrons":2,"desc":"غاز خامل خفيف جداً. يُستخدم لملء البالونات والمناطيد. لا يشتعل ولا يتفاعل مع غيره."},{"n":3,"sym":"Li","ar":"ليثيوم","en":"Lithium","mass":6.941,"cat":"alkali","period":2,"group":1,"shells":[2,1],"neutrons":4,"desc":"فلز قلوي خفيف يطفو على الماء. يدخل في صناعة بطاريات الهواتف والسيارات."},{"n":4,"sym":"Be","ar":"بيريليوم","en":"Beryllium","mass":9.012,"cat":"alkaline","period":2,"group":2,"shells":[2,2],"neutrons":5,"desc":"فلز خفيف صلب يدخل في سبائك الفضاء."},{"n":5,"sym":"B","ar":"بورون","en":"Boron","mass":10.81,"cat":"metalloid","period":2,"group":13,"shells":[2,3],"neutrons":6,"desc":"شبه فلز. يدخل في صناعة الزجاج المقاوم للحرارة."},{"n":6,"sym":"C","ar":"كربون","en":"Carbon","mass":12.011,"cat":"nonmetal","period":2,"group":14,"shells":[2,4],"neutrons":6,"desc":"أساس الحياة. يكوّن ملايين المركبات العضوية. الماس أصلب مواد الطبيعة."},{"n":7,"sym":"N","ar":"نيتروجين","en":"Nitrogen","mass":14.007,"cat":"nonmetal","period":2,"group":15,"shells":[2,5],"neutrons":7,"desc":"يشكّل 78% من الهواء. ضروري لبناء البروتينات والحمض النووي."},{"n":8,"sym":"O","ar":"أكسجين","en":"Oxygen","mass":15.999,"cat":"nonmetal","period":2,"group":16,"shells":[2,6],"neutrons":8,"desc":"ضروري للتنفس والاحتراق. يشكّل 21% من الهواء. ثالث أكثر عنصر في الكون."},{"n":9,"sym":"F","ar":"فلور","en":"Fluorine","mass":18.998,"cat":"halogen","period":2,"group":17,"shells":[2,7],"neutrons":10,"desc":"أقوى عامل كيميائي وأشدها تفاعلاً. يدخل في تركيب معجون الأسنان."},{"n":10,"sym":"Ne","ar":"نيون","en":"Neon","mass":20.18,"cat":"noble","period":2,"group":18,"shells":[2,8],"neutrons":10,"desc":"غاز نبيل يتوهج باللون البرتقالي. يُستخدم في اللافتات."},{"n":11,"sym":"Na","ar":"صوديوم","en":"Sodium","mass":22.99,"cat":"alkali","period":3,"group":1,"shells":[2,8,1],"neutrons":12,"desc":"ملح الطعام (NaCl). ضروري لعمل الأعصاب."},{"n":12,"sym":"Mg","ar":"ماغنيسيوم","en":"Magnesium","mass":24.305,"cat":"alkaline","period":3,"group":2,"shells":[2,8,2],"neutrons":12,"desc":"ضروري لعظام الإنسان. يدخل في سبائك الطائرات."},{"n":13,"sym":"Al","ar":"ألومنيوم","en":"Aluminium","mass":26.982,"cat":"post","period":3,"group":13,"shells":[2,8,3],"neutrons":14,"desc":"أكثر الفلزات وفرة في قشرة الأرض. يدخل في صناعة العلب وهياكل الطائرات."},{"n":14,"sym":"Si","ar":"سيليكون","en":"Silicon","mass":28.086,"cat":"metalloid","period":3,"group":14,"shells":[2,8,4],"neutrons":14,"desc":"أساس صناعة الإلكترونيات والحواسيب."},{"n":15,"sym":"P","ar":"فسفور","en":"Phosphorus","mass":30.974,"cat":"nonmetal","period":3,"group":15,"shells":[2,8,5],"neutrons":16,"desc":"ضروري لبناء DNA وعظام الإنسان."},{"n":16,"sym":"S","ar":"كبريت","en":"Sulfur","mass":32.06,"cat":"nonmetal","period":3,"group":16,"shells":[2,8,6],"neutrons":16,"desc":"عنصر أصفر ذو رائحة مميزة. يدخل في صناعة حمض الكبريتيك."},{"n":17,"sym":"Cl","ar":"كلور","en":"Chlorine","mass":35.453,"cat":"halogen","period":3,"group":17,"shells":[2,8,7],"neutrons":18,"desc":"يُستخدم لتعقيم مياه الشرب ومسابح السباحة."},{"n":18,"sym":"Ar","ar":"أرغون","en":"Argon","mass":39.948,"cat":"noble","period":3,"group":18,"shells":[2,8,8],"neutrons":22,"desc":"غاز نبيل يشكّل 1% من الهواء."},{"n":19,"sym":"K","ar":"بوتاسيوم","en":"Potassium","mass":39.098,"cat":"alkali","period":4,"group":1,"shells":[2,8,8,1],"neutrons":20,"desc":"ضروري لعمل القلب والعضلات."},{"n":20,"sym":"Ca","ar":"كالسيوم","en":"Calcium","mass":40.078,"cat":"alkaline","period":4,"group":2,"shells":[2,8,8,2],"neutrons":20,"desc":"أساس بناء العظام والأسنان."},{"n":21,"sym":"Sc","ar":"سكانديوم","en":"Scandium","mass":44.956,"cat":"trans","period":4,"group":3,"shells":[2,8,9,2],"neutrons":24,"desc":""},{"n":22,"sym":"Ti","ar":"تيتانيوم","en":"Titanium","mass":47.867,"cat":"trans","period":4,"group":4,"shells":[2,8,10,2],"neutrons":26,"desc":"فلز قوي خفيف يدخل في صناعة الطائرات والغرسات الطبية."},{"n":23,"sym":"V","ar":"فاناديوم","en":"Vanadium","mass":50.942,"cat":"trans","period":4,"group":5,"shells":[2,8,11,2],"neutrons":28,"desc":""},{"n":24,"sym":"Cr","ar":"كروم","en":"Chromium","mass":51.996,"cat":"trans","period":4,"group":6,"shells":[2,8,13,1],"neutrons":28,"desc":"يعطي الفولاذ مظهره اللامع."},{"n":25,"sym":"Mn","ar":"منغنيز","en":"Manganese","mass":54.938,"cat":"trans","period":4,"group":7,"shells":[2,8,13,2],"neutrons":30,"desc":""},{"n":26,"sym":"Fe","ar":"حديد","en":"Iron","mass":55.845,"cat":"trans","period":4,"group":8,"shells":[2,8,14,2],"neutrons":30,"desc":"الفلز الأكثر استخداماً. أساس الفولاذ والصلب. يحمل الدم الأكسجين."},{"n":27,"sym":"Co","ar":"كوبالت","en":"Cobalt","mass":58.933,"cat":"trans","period":4,"group":9,"shells":[2,8,15,2],"neutrons":32,"desc":""},{"n":28,"sym":"Ni","ar":"نيكل","en":"Nickel","mass":58.693,"cat":"trans","period":4,"group":10,"shells":[2,8,16,2],"neutrons":31,"desc":""},{"n":29,"sym":"Cu","ar":"نحاس","en":"Copper","mass":63.546,"cat":"trans","period":4,"group":11,"shells":[2,8,18,1],"neutrons":35,"desc":"موصل جيد للكهرباء. يدخل في سلك الكهرباء ومكونات الإلكترونيات."},{"n":30,"sym":"Zn","ar":"زنك","en":"Zinc","mass":65.38,"cat":"trans","period":4,"group":12,"shells":[2,8,18,2],"neutrons":35,"desc":""},{"n":31,"sym":"Ga","ar":"غاليوم","en":"Gallium","mass":69.723,"cat":"post","period":4,"group":13,"shells":[2,8,18,3],"neutrons":39,"desc":""},{"n":32,"sym":"Ge","ar":"جرمانيوم","en":"Germanium","mass":72.63,"cat":"metalloid","period":4,"group":14,"shells":[2,8,18,4],"neutrons":41,"desc":""},{"n":33,"sym":"As","ar":"زرنيخ","en":"Arsenic","mass":74.922,"cat":"metalloid","period":4,"group":15,"shells":[2,8,18,5],"neutrons":42,"desc":""},{"n":34,"sym":"Se","ar":"سيلينيوم","en":"Selenium","mass":78.971,"cat":"nonmetal","period":4,"group":16,"shells":[2,8,18,6],"neutrons":45,"desc":""},{"n":35,"sym":"Br","ar":"بروم","en":"Bromine","mass":79.904,"cat":"halogen","period":4,"group":17,"shells":[2,8,18,7],"neutrons":45,"desc":""},{"n":36,"sym":"Kr","ar":"كريبتون","en":"Krypton","mass":83.798,"cat":"noble","period":4,"group":18,"shells":[2,8,18,8],"neutrons":48,"desc":""},{"n":37,"sym":"Rb","ar":"روبيديوم","en":"Rubidium","mass":85.468,"cat":"alkali","period":5,"group":1,"shells":[2,8,18,8,1],"neutrons":48,"desc":""},{"n":38,"sym":"Sr","ar":"سترونشيوم","en":"Strontium","mass":87.62,"cat":"alkaline","period":5,"group":2,"shells":[2,8,18,8,2],"neutrons":50,"desc":""},{"n":39,"sym":"Y","ar":"يتريوم","en":"Yttrium","mass":88.906,"cat":"trans","period":5,"group":3,"shells":[2,8,18,9,2],"neutrons":50,"desc":""},{"n":40,"sym":"Zr","ar":"زيركونيوم","en":"Zirconium","mass":91.224,"cat":"trans","period":5,"group":4,"shells":[2,8,18,10,2],"neutrons":51,"desc":""},{"n":41,"sym":"Nb","ar":"نيوبيوم","en":"Niobium","mass":92.906,"cat":"trans","period":5,"group":5,"shells":[2,8,18,12,1],"neutrons":52,"desc":""},{"n":42,"sym":"Mo","ar":"موليبدينوم","en":"Molybdenum","mass":95.96,"cat":"trans","period":5,"group":6,"shells":[2,8,18,13,1],"neutrons":54,"desc":""},{"n":43,"sym":"Tc","ar":"تكنيشيوم","en":"Technetium","mass":98,"cat":"trans","period":5,"group":7,"shells":[2,8,18,13,2],"neutrons":55,"desc":""},{"n":44,"sym":"Ru","ar":"روثينيوم","en":"Ruthenium","mass":101.07,"cat":"trans","period":5,"group":8,"shells":[2,8,18,15,1],"neutrons":57,"desc":""},{"n":45,"sym":"Rh","ar":"روديوم","en":"Rhodium","mass":102.906,"cat":"trans","period":5,"group":9,"shells":[2,8,18,16,1],"neutrons":58,"desc":""},{"n":46,"sym":"Pd","ar":"باليديوم","en":"Palladium","mass":106.42,"cat":"trans","period":5,"group":10,"shells":[2,8,18,18],"neutrons":60,"desc":""},{"n":47,"sym":"Ag","ar":"فضة","en":"Silver","mass":107.868,"cat":"trans","period":5,"group":11,"shells":[2,8,18,18,1],"neutrons":61,"desc":"منذ آلاف السنين يُستخدم عملة وحلية. أفضل موصل للكهرباء."},{"n":48,"sym":"Cd","ar":"كادميوم","en":"Cadmium","mass":112.411,"cat":"trans","period":5,"group":12,"shells":[2,8,18,18,2],"neutrons":64,"desc":""},{"n":49,"sym":"In","ar":"إنديوم","en":"Indium","mass":114.818,"cat":"post","period":5,"group":13,"shells":[2,8,18,18,3],"neutrons":66,"desc":""},{"n":50,"sym":"Sn","ar":"قصدير","en":"Tin","mass":118.71,"cat":"post","period":5,"group":14,"shells":[2,8,18,18,4],"neutrons":69,"desc":""},{"n":51,"sym":"Sb","ar":"أنتيمون","en":"Antimony","mass":121.76,"cat":"metalloid","period":5,"group":15,"shells":[2,8,18,18,5],"neutrons":71,"desc":""},{"n":52,"sym":"Te","ar":"تيلوريوم","en":"Tellurium","mass":127.6,"cat":"metalloid","period":5,"group":16,"shells":[2,8,18,18,6],"neutrons":76,"desc":""},{"n":53,"sym":"I","ar":"يود","en":"Iodine","mass":126.904,"cat":"halogen","period":5,"group":17,"shells":[2,8,18,18,7],"neutrons":74,"desc":"ضروري لعمل الغدة الدرقية."},{"n":54,"sym":"Xe","ar":"زينون","en":"Xenon","mass":131.293,"cat":"noble","period":5,"group":18,"shells":[2,8,18,18,8],"neutrons":77,"desc":""},{"n":55,"sym":"Cs","ar":"سيزيوم","en":"Caesium","mass":132.905,"cat":"alkali","period":6,"group":1,"shells":[2,8,18,18,8,1],"neutrons":78,"desc":""},{"n":56,"sym":"Ba","ar":"باريوم","en":"Barium","mass":137.327,"cat":"alkaline","period":6,"group":2,"shells":[2,8,18,18,8,2],"neutrons":81,"desc":""},{"n":57,"sym":"La","ar":"لانثانوم","en":"Lanthanum","mass":138.905,"cat":"lantha","period":6,"group":3,"shells":[2,8,18,18,9,2],"neutrons":82,"desc":""},{"n":58,"sym":"Ce","ar":"سيريوم","en":"Cerium","mass":140.116,"cat":"lantha","period":6,"group":4,"shells":[2,8,18,19,9,2],"neutrons":82,"desc":""},{"n":59,"sym":"Pr","ar":"براسيوديميوم","en":"Praseodymium","mass":140.908,"cat":"lantha","period":6,"group":5,"shells":[2,8,18,21,8,2],"neutrons":82,"desc":""},{"n":60,"sym":"Nd","ar":"نيوديميوم","en":"Neodymium","mass":144.242,"cat":"lantha","period":6,"group":6,"shells":[2,8,18,22,8,2],"neutrons":84,"desc":""},{"n":61,"sym":"Pm","ar":"برومثيوم","en":"Promethium","mass":145,"cat":"lantha","period":6,"group":7,"shells":[2,8,18,23,8,2],"neutrons":84,"desc":""},{"n":62,"sym":"Sm","ar":"ساماريوم","en":"Samarium","mass":150.36,"cat":"lantha","period":6,"group":8,"shells":[2,8,18,24,8,2],"neutrons":88,"desc":""},{"n":63,"sym":"Eu","ar":"يوروبيوم","en":"Europium","mass":151.964,"cat":"lantha","period":6,"group":9,"shells":[2,8,18,25,8,2],"neutrons":89,"desc":""},{"n":64,"sym":"Gd","ar":"غادولينيوم","en":"Gadolinium","mass":157.25,"cat":"lantha","period":6,"group":10,"shells":[2,8,18,25,9,2],"neutrons":93,"desc":""},{"n":65,"sym":"Tb","ar":"تيربيوم","en":"Terbium","mass":158.925,"cat":"lantha","period":6,"group":11,"shells":[2,8,18,27,8,2],"neutrons":94,"desc":""},{"n":66,"sym":"Dy","ar":"ديسبروسيوم","en":"Dysprosium","mass":162.5,"cat":"lantha","period":6,"group":12,"shells":[2,8,18,28,8,2],"neutrons":97,"desc":""},{"n":67,"sym":"Ho","ar":"هولميوم","en":"Holmium","mass":164.93,"cat":"lantha","period":6,"group":13,"shells":[2,8,18,29,8,2],"neutrons":98,"desc":""},{"n":68,"sym":"Er","ar":"إربيوم","en":"Erbium","mass":167.259,"cat":"lantha","period":6,"group":14,"shells":[2,8,18,30,8,2],"neutrons":99,"desc":""},{"n":69,"sym":"Tm","ar":"ثوليوم","en":"Thulium","mass":168.934,"cat":"lantha","period":6,"group":15,"shells":[2,8,18,31,8,2],"neutrons":100,"desc":""},{"n":70,"sym":"Yb","ar":"يتربيوم","en":"Ytterbium","mass":173.04,"cat":"lantha","period":6,"group":16,"shells":[2,8,18,32,8,2],"neutrons":103,"desc":""},{"n":71,"sym":"Lu","ar":"لوتيشيوم","en":"Lutetium","mass":174.967,"cat":"lantha","period":6,"group":17,"shells":[2,8,18,32,9,2],"neutrons":104,"desc":""},{"n":72,"sym":"Hf","ar":"هافنيوم","en":"Hafnium","mass":178.49,"cat":"trans","period":6,"group":4,"shells":[2,8,18,32,10,2],"neutrons":106,"desc":""},{"n":73,"sym":"Ta","ar":"تنتالوم","en":"Tantalum","mass":180.948,"cat":"trans","period":6,"group":5,"shells":[2,8,18,32,11,2],"neutrons":108,"desc":""},{"n":74,"sym":"W","ar":"تنغستن","en":"Tungsten","mass":183.84,"cat":"trans","period":6,"group":6,"shells":[2,8,18,32,12,2],"neutrons":110,"desc":"أعلى نقطة انصهار بين العناصر. فتيلة مصباح التنغستن تصل 3422 درجة."},{"n":75,"sym":"Re","ar":"رينيوم","en":"Rhenium","mass":186.207,"cat":"trans","period":6,"group":7,"shells":[2,8,18,32,13,2],"neutrons":111,"desc":""},{"n":76,"sym":"Os","ar":"أوزميوم","en":"Osmium","mass":190.23,"cat":"trans","period":6,"group":8,"shells":[2,8,18,32,14,2],"neutrons":114,"desc":""},{"n":77,"sym":"Ir","ar":"إيريديوم","en":"Iridium","mass":192.217,"cat":"trans","period":6,"group":9,"shells":[2,8,18,32,15,2],"neutrons":115,"desc":""},{"n":78,"sym":"Pt","ar":"بلاتين","en":"Platinum","mass":195.084,"cat":"trans","period":6,"group":10,"shells":[2,8,18,32,17,1],"neutrons":117,"desc":"فلز ثمين لامع لا يصدأ. يُستخدم في المجوهرات."},{"n":79,"sym":"Au","ar":"ذهب","en":"Gold","mass":196.967,"cat":"trans","period":6,"group":11,"shells":[2,8,18,32,18,1],"neutrons":118,"desc":"منذ آلاف السنين يُستخدم عملة وحلية. لا يصدأ ولا يتفاعل."},{"n":80,"sym":"Hg","ar":"زئبق","en":"Mercury","mass":200.592,"cat":"trans","period":6,"group":12,"shells":[2,8,18,32,18,2],"neutrons":121,"desc":"الفلز الوحيد السائل عند درجة حرارة الغرفة."},{"n":81,"sym":"Tl","ar":"ثاليوم","en":"Thallium","mass":204.38,"cat":"post","period":6,"group":13,"shells":[2,8,18,32,18,3],"neutrons":123,"desc":""},{"n":82,"sym":"Pb","ar":"رصاص","en":"Lead","mass":207.2,"cat":"post","period":6,"group":14,"shells":[2,8,18,32,18,4],"neutrons":125,"desc":"فلز ثقيل. يحمي من الإشعاع النووي."},{"n":83,"sym":"Bi","ar":"بزموت","en":"Bismuth","mass":208.98,"cat":"post","period":6,"group":15,"shells":[2,8,18,32,18,5],"neutrons":126,"desc":""},{"n":84,"sym":"Po","ar":"بولونيوم","en":"Polonium","mass":209,"cat":"metalloid","period":6,"group":16,"shells":[2,8,18,32,18,6],"neutrons":125,"desc":""},{"n":85,"sym":"At","ar":"أستاتين","en":"Astatine","mass":210,"cat":"halogen","period":6,"group":17,"shells":[2,8,18,32,18,7],"neutrons":125,"desc":""},{"n":86,"sym":"Rn","ar":"رادون","en":"Radon","mass":222,"cat":"noble","period":6,"group":18,"shells":[2,8,18,32,18,8],"neutrons":136,"desc":""},{"n":87,"sym":"Fr","ar":"فرانسيوم","en":"Francium","mass":223,"cat":"alkali","period":7,"group":1,"shells":[2,8,18,32,18,8,1],"neutrons":136,"desc":""},{"n":88,"sym":"Ra","ar":"راديوم","en":"Radium","mass":226,"cat":"alkaline","period":7,"group":2,"shells":[2,8,18,32,18,8,2],"neutrons":138,"desc":"عنصر مشع اكتشفته ماري كيوري."},{"n":89,"sym":"Ac","ar":"أكتينيوم","en":"Actinium","mass":227,"cat":"actini","period":7,"group":3,"shells":[2,8,18,32,18,9,2],"neutrons":138,"desc":""},{"n":90,"sym":"Th","ar":"ثوريوم","en":"Thorium","mass":232.038,"cat":"actini","period":7,"group":4,"shells":[2,8,18,32,18,10,2],"neutrons":142,"desc":""},{"n":91,"sym":"Pa","ar":"بروتاكتينيوم","en":"Protactinium","mass":231.036,"cat":"actini","period":7,"group":5,"shells":[2,8,18,32,20,9,2],"neutrons":140,"desc":""},{"n":92,"sym":"U","ar":"يورانيوم","en":"Uranium","mass":238.029,"cat":"actini","period":7,"group":6,"shells":[2,8,18,32,21,9,2],"neutrons":146,"desc":"يُستخدم وقوداً في المفاعلات النووية. ينتج طاقة هائلة."},{"n":93,"sym":"Np","ar":"نبتونيوم","en":"Neptunium","mass":237,"cat":"actini","period":7,"group":7,"shells":[2,8,18,32,22,9,2],"neutrons":144,"desc":""},{"n":94,"sym":"Pu","ar":"بلوتونيوم","en":"Plutonium","mass":244,"cat":"actini","period":7,"group":8,"shells":[2,8,18,32,24,8,2],"neutrons":150,"desc":""},{"n":95,"sym":"Am","ar":"أمريشيوم","en":"Americium","mass":243,"cat":"actini","period":7,"group":9,"shells":[2,8,18,32,25,8,2],"neutrons":148,"desc":""},{"n":96,"sym":"Cm","ar":"كيوريوم","en":"Curium","mass":247,"cat":"actini","period":7,"group":10,"shells":[2,8,18,32,25,9,2],"neutrons":151,"desc":""},{"n":97,"sym":"Bk","ar":"بيركيليوم","en":"Berkelium","mass":247,"cat":"actini","period":7,"group":11,"shells":[2,8,18,32,27,8,2],"neutrons":150,"desc":""},{"n":98,"sym":"Cf","ar":"كاليفورنيوم","en":"Californium","mass":251,"cat":"actini","period":7,"group":12,"shells":[2,8,18,32,28,8,2],"neutrons":153,"desc":""},{"n":99,"sym":"Es","ar":"آينشتانيوم","en":"Einsteinium","mass":252,"cat":"actini","period":7,"group":13,"shells":[2,8,18,32,29,8,2],"neutrons":153,"desc":""},{"n":100,"sym":"Fm","ar":"فيرميوم","en":"Fermium","mass":257,"cat":"actini","period":7,"group":14,"shells":[2,8,18,32,30,8,2],"neutrons":157,"desc":""},{"n":101,"sym":"Md","ar":"مندلفيوم","en":"Mendelevium","mass":258,"cat":"actini","period":7,"group":15,"shells":[2,8,18,32,31,8,2],"neutrons":157,"desc":""},{"n":102,"sym":"No","ar":"نوبيليوم","en":"Nobelium","mass":259,"cat":"actini","period":7,"group":16,"shells":[2,8,18,32,32,8,2],"neutrons":157,"desc":""},{"n":103,"sym":"Lr","ar":"لورنسيوم","en":"Lawrencium","mass":266,"cat":"actini","period":7,"group":17,"shells":[2,8,18,32,32,8,3],"neutrons":163,"desc":""},{"n":104,"sym":"Rf","ar":"رذرفورديوم","en":"Rutherfordium","mass":267,"cat":"trans","period":7,"group":4,"shells":[2,8,18,32,32,10,2],"neutrons":163,"desc":""},{"n":105,"sym":"Db","ar":"دوبنيوم","en":"Dubnium","mass":268,"cat":"trans","period":7,"group":5,"shells":[2,8,18,32,32,11,2],"neutrons":163,"desc":""},{"n":106,"sym":"Sg","ar":"سيبورغيوم","en":"Seaborgium","mass":269,"cat":"trans","period":7,"group":6,"shells":[2,8,18,32,32,12,2],"neutrons":163,"desc":""},{"n":107,"sym":"Bh","ar":"بوريوم","en":"Bohrium","mass":270,"cat":"trans","period":7,"group":7,"shells":[2,8,18,32,32,13,2],"neutrons":163,"desc":""},{"n":108,"sym":"Hs","ar":"هاسيوم","en":"Hassium","mass":277,"cat":"trans","period":7,"group":8,"shells":[2,8,18,32,32,14,2],"neutrons":169,"desc":""},{"n":109,"sym":"Mt","ar":"مايتنيريوم","en":"Meitnerium","mass":278,"cat":"unknown","period":7,"group":9,"shells":[2,8,18,32,32,15,2],"neutrons":169,"desc":""},{"n":110,"sym":"Ds","ar":"دارمشتاتيوم","en":"Darmstadtium","mass":281,"cat":"unknown","period":7,"group":10,"shells":[2,8,18,32,32,17,1],"neutrons":171,"desc":""},{"n":111,"sym":"Rg","ar":"رونتغينيوم","en":"Roentgenium","mass":282,"cat":"unknown","period":7,"group":11,"shells":[2,8,18,32,32,18,1],"neutrons":171,"desc":""},{"n":112,"sym":"Cn","ar":"كوبرنيسيوم","en":"Copernicium","mass":285,"cat":"trans","period":7,"group":12,"shells":[2,8,18,32,32,18,2],"neutrons":173,"desc":""},{"n":113,"sym":"Nh","ar":"نيهونيوم","en":"Nihonium","mass":286,"cat":"post","period":7,"group":13,"shells":[2,8,18,32,32,18,3],"neutrons":173,"desc":""},{"n":114,"sym":"Fl","ar":"فليروفيوم","en":"Flerovium","mass":289,"cat":"post","period":7,"group":14,"shells":[2,8,18,32,32,18,4],"neutrons":175,"desc":""},{"n":115,"sym":"Mc","ar":"موسكوفيوم","en":"Moscovium","mass":290,"cat":"post","period":7,"group":15,"shells":[2,8,18,32,32,18,5],"neutrons":175,"desc":""},{"n":116,"sym":"Lv","ar":"ليفرموريوم","en":"Livermorium","mass":293,"cat":"post","period":7,"group":16,"shells":[2,8,18,32,32,18,6],"neutrons":177,"desc":""},{"n":117,"sym":"Ts","ar":"تينيسين","en":"Tennessine","mass":294,"cat":"halogen","period":7,"group":17,"shells":[2,8,18,32,32,18,7],"neutrons":177,"desc":""},{"n":118,"sym":"Og","ar":"أوغانيسون","en":"Oganesson","mass":294,"cat":"noble","period":7,"group":18,"shells":[2,8,18,32,32,18,8],"neutrons":176,"desc":""}];
var EL_VIS={"1":["g",200,225,255],"2":["n",255,120,40],"5":["s",75,60,50],"6":["s",40,42,48],"7":["g",185,210,245],"8":["g",160,205,255],"9":["g",225,245,160],"10":["n",255,55,15],"15":["s",245,225,60],"16":["s",255,205,5],"17":["g",185,240,110],"18":["n",155,75,255],"29":["s",184,115,51],"35":["l",175,35,15],"36":["n",100,165,255],"47":["s",205,208,215],"50":["s",190,193,200],"54":["n",75,120,255],"78":["s",210,212,218],"79":["s",255,200,50],"80":["l",185,190,200],"82":["s",100,102,115],"83":["s",205,180,210],"86":["n",200,230,255],"118":["n",180,200,255]};
var CAT={
  alkali:{cls:'c-alkali',ar:'فلزات قلوية'},
  alkaline:{cls:'c-alkaline',ar:'فلزات قلوية ترابية'},
  trans:{cls:'c-trans',ar:'فلزات انتقالية'},
  post:{cls:'c-post',ar:'فلزات بعد انتقالية'},
  metalloid:{cls:'c-meta',ar:'أشباه فلزات'},
  nonmetal:{cls:'c-nonmetal',ar:'لافلزات'},
  halogen:{cls:'c-halogen',ar:'هالوجينات'},
  noble:{cls:'c-noble',ar:'غازات نبيلة'},
  lantha:{cls:'c-lantha',ar:'لانثانيدات'},
  actini:{cls:'c-actini',ar:'أكتينيدات'},
  unknown:{cls:'c-unknown',ar:'غير معروف'}
};
var POS=[null,
  [1,1],[1,18],[2,1],[2,2],[2,13],[2,14],[2,15],[2,16],[2,17],[2,18],
  [3,1],[3,2],[3,13],[3,14],[3,15],[3,16],[3,17],[3,18],
  [4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12],[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],
  [5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],
  [6,1],[6,2],
  [9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10],[9,11],[9,12],[9,13],[9,14],[9,15],[9,16],[9,17],
  [6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[6,15],[6,16],[6,17],[6,18],
  [7,1],[7,2],
  [10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[10,11],[10,12],[10,13],[10,14],[10,15],[10,16],[10,17],
  [7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],[7,11],[7,12],[7,13],[7,14],[7,15],[7,16],[7,17],[7,18]
];
var EL={};
ELEMENTS.forEach(function(e){EL[e.n]=e;});
var activeCatFilter=null;
function buildLegend(){
  var lg=document.getElementById('legend');
  Object.keys(CAT).forEach(function(k){
    var c=CAT[k];
    var d=document.createElement('div');d.className='leg-item';d.dataset.cat=k;
    d.innerHTML='<div class="leg-dot '+c.cls+'"></div><span>'+c.ar+'</span>';
    d.addEventListener('click',function(){filterCat(k);});
    lg.appendChild(d);
  });
}
function filterCat(cat){
  if(activeCatFilter===cat){activeCatFilter=null;}else{activeCatFilter=cat;}
  document.querySelectorAll('.leg-item').forEach(function(li){
    li.classList.toggle('active-filter',li.dataset.cat===activeCatFilter);
  });
  applyFilter(document.getElementById('search-inp').value);
}
function applyFilter(q){
  q=(q||'').trim().toLowerCase();
  ELEMENTS.forEach(function(e){
    var card=document.getElementById('el-'+e.n);if(!card)return;
    var matchSearch=!q||(e.sym.toLowerCase().indexOf(q)>-1||e.en.toLowerCase().indexOf(q)>-1||e.ar.indexOf(q)>-1||String(e.n)===q);
    var matchCat=!activeCatFilter||(e.cat===activeCatFilter);
    var match=matchSearch&&matchCat;
    card.classList.toggle('dim',!match);
    card.classList.toggle('highlight',match&&(q.length>0||activeCatFilter));
  });
}
function searchEl(q){
  var inp=document.getElementById('search-inp');
  if(inp&&inp.value!==q)inp.value=q;
  var res=document.getElementById('search-results');
  applyFilter(q);
  if(!q){res.innerHTML='';return;}
  var ql=q.trim().toLowerCase();
  var hits=ELEMENTS.filter(function(e){
    return e.sym.toLowerCase().indexOf(ql)>-1||e.en.toLowerCase().indexOf(ql)>-1||e.ar.indexOf(ql)>-1||String(e.n)===ql;
  }).slice(0,12);
  res.innerHTML=hits.map(function(e){
    var cat=CAT[e.cat]||CAT.unknown;
    return '<div class="sr-chip '+cat.cls+'" onclick="onEl('+e.n+')">'+e.sym+' — '+e.ar+'</div>';
  }).join('');
}
function buildTable(){
  var pt=document.getElementById('ptable');pt.innerHTML='';
  var l6=mkLbl('لانثانيدات *');l6.style.cssText='grid-row:6;grid-column:3;';pt.appendChild(l6);
  var l7=mkLbl('أكتينيدات *');l7.style.cssText='grid-row:7;grid-column:3;';pt.appendChild(l7);
  ELEMENTS.forEach(function(e){
    var pos=POS[e.n];if(!pos)return;
    var card=document.createElement('div');
    card.className='el '+(CAT[e.cat]?CAT[e.cat].cls:'c-unknown');
    card.id='el-'+e.n;
    card.style.gridRow=pos[0];card.style.gridColumn=pos[1];
    card.title=e.ar+' — '+e.en;
    card.innerHTML='<div class="el-num">'+e.n+'</div><div class="el-sym">'+e.sym+'</div><div class="el-nar">'+e.ar+'</div>';
    card.addEventListener('click',function(){onEl(e.n);});
    pt.appendChild(card);
  });
}
function mkLbl(t){var d=document.createElement('div');d.className='tbl-label';d.style.fontSize='7px';d.innerHTML=t;return d;}
var mode='explore',compareSlot='left',presentIdx=1,buildStep=0,buildEl=null,atomAnim=null,presentAnim=null;
var quizQ=[],quizCur=0,quizScore=0;
function setMode(m){
  mode=m;
  document.querySelectorAll('.mode-btn').forEach(function(b){b.classList.toggle('active',b.dataset.mode===m);});
  clearSel();
  ['quiz-panel','compare-panel','reaction-panel'].forEach(function(id){var p=document.getElementById(id);if(p)p.classList.add('hidden');});
  if(m==='quiz'){document.getElementById('quiz-panel').classList.remove('hidden');startQuiz();setStatus('انقر على العنصر الصحيح');}
  else if(m==='compare'){document.getElementById('compare-panel').classList.remove('hidden');compareSlot='left';setStatus('انقر عنصرين لمقارنتهما');}
  else if(m==='reaction'){document.getElementById('reaction-panel').classList.remove('hidden');if(window.rxnSetMode)window.rxnSetMode();setStatus('مختبر التفاعلات — اختر عناصر من الجدول');}
  else setStatus(m==='build'?'انقر عنصراً لبناء ذرته':'انقر على أي عنصر 🔬');
}
function clearSel(){document.querySelectorAll('.el').forEach(function(c){c.className=c.className.replace(/ ?(selected|compare-picked|quiz-correct|quiz-wrong|quiz-dim)/g,'');});}
function onEl(n){
  if(mode==='explore')openExplore(n);
  else if(mode==='build')openBuild(n);
  else if(mode==='quiz')handleQuizClick(n);
  else if(mode==='compare')handleCmpClick(n);
  else if(mode==='reaction'){if(window.rxnOnEl)window.rxnOnEl(n);}
}
function openExplore(n){
  var e=EL[n];if(!e)return;
  clearSel();document.getElementById('el-'+n).classList.add('selected');
  document.getElementById('build-extras').style.display='none';
  fillInfo(e);document.getElementById('atom-modal').classList.remove('hidden');
  stopAtom();atomAnim=startAtom(document.getElementById('atom-canvas'),e,99);
}
/* ── Element photo canvas renderers ── */
function _drawMetal(c,cx,cy,R,r,g,b){
  var bg=c.createRadialGradient(cx,cy,R*.05,cx,cy,R*1.4);
  bg.addColorStop(0,'rgba(20,25,40,1)');bg.addColorStop(1,'rgba(5,8,20,1)');
  c.fillStyle=bg;c.fillRect(0,0,cx*2,cy*2);
  var g2=c.createRadialGradient(cx-R*.3,cy-R*.3,R*.05,cx,cy,R);
  g2.addColorStop(0,'rgb('+Math.min(255,r+80)+','+Math.min(255,g+80)+','+Math.min(255,b+80)+')');
  g2.addColorStop(.4,'rgb('+r+','+g+','+b+')');
  g2.addColorStop(1,'rgb('+Math.max(0,r-60)+','+Math.max(0,g-60)+','+Math.max(0,b-60)+')');
  c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.fillStyle=g2;c.fill();
  var g3=c.createRadialGradient(cx-R*.32,cy-R*.32,0,cx-R*.28,cy-R*.28,R*.45);
  g3.addColorStop(0,'rgba(255,255,255,.72)');g3.addColorStop(.5,'rgba(255,255,255,.14)');g3.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.fillStyle=g3;c.fill();
}
function _drawGas(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(8,12,24)';c.fillRect(0,0,cx*2,cy*2);
  var g1=c.createRadialGradient(cx,cy,0,cx,cy,R);
  g1.addColorStop(0,'rgba('+r+','+g+','+b+',.55)');
  g1.addColorStop(.6,'rgba('+r+','+g+','+b+',.25)');
  g1.addColorStop(1,'rgba('+r+','+g+','+b+',.04)');
  c.beginPath();c.arc(cx,cy,R*1.15,0,Math.PI*2);c.fillStyle=g1;c.fill();
  var g2=c.createRadialGradient(cx-R*.3,cy-R*.3,0,cx-R*.3,cy-R*.3,R*.35);
  g2.addColorStop(0,'rgba(255,255,255,.55)');g2.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.arc(cx,cy,R*1.15,0,Math.PI*2);c.fillStyle=g2;c.fill();
}
function _drawNoble(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(4,5,15)';c.fillRect(0,0,cx*2,cy*2);
  var i,gx;
  for(i=3;i>=0;i--){
    gx=c.createRadialGradient(cx,cy,R*.2,cx,cy,R*(1.1+i*.28));
    gx.addColorStop(0,'rgba('+r+','+g+','+b+','+(0.26-i*.04)+')');
    gx.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
    c.beginPath();c.arc(cx,cy,R*(1.1+i*.28),0,Math.PI*2);c.fillStyle=gx;c.fill();
  }
  var inn=c.createRadialGradient(cx,cy,0,cx,cy,R*.8);
  inn.addColorStop(0,'rgba('+Math.min(255,r+120)+','+Math.min(255,g+120)+','+Math.min(255,b+120)+',.9)');
  inn.addColorStop(.5,'rgba('+r+','+g+','+b+',.55)');
  inn.addColorStop(1,'rgba('+r+','+g+','+b+',0)');
  c.beginPath();c.arc(cx,cy,R*.8,0,Math.PI*2);c.fillStyle=inn;c.fill();
}
function _drawLiquid(c,cx,cy,R,r,g,b){
  c.fillStyle='rgb(8,10,22)';c.fillRect(0,0,cx*2,cy*2);
  var py=cy+R*.12,pw=R*1.05,ph=R*.52;
  var g1=c.createRadialGradient(cx,py,0,cx,py,pw);
  g1.addColorStop(0,'rgb('+Math.min(255,r+60)+','+Math.min(255,g+60)+','+Math.min(255,b+60)+')');
  g1.addColorStop(.6,'rgb('+r+','+g+','+b+')');
  g1.addColorStop(1,'rgb('+Math.max(0,r-50)+','+Math.max(0,g-50)+','+Math.max(0,b-50)+')');
  c.beginPath();c.ellipse(cx,py,pw,ph,0,0,Math.PI*2);c.fillStyle=g1;c.fill();
  var shine=c.createLinearGradient(cx-pw*.4,py-ph*.4,cx+pw*.2,py-ph*.2);
  shine.addColorStop(0,'rgba(255,255,255,0)');shine.addColorStop(.45,'rgba(255,255,255,.5)');shine.addColorStop(1,'rgba(255,255,255,0)');
  c.beginPath();c.ellipse(cx-pw*.05,py-ph*.1,pw*.55,ph*.25,-.2,0,Math.PI*2);c.fillStyle=shine;c.fill();
  var dg=c.createRadialGradient(cx-R*.08,cy-R*.22,0,cx,cy-R*.18,R*.32);
  dg.addColorStop(0,'rgb('+Math.min(255,r+80)+','+Math.min(255,g+80)+','+Math.min(255,b+80)+')');
  dg.addColorStop(1,'rgb('+r+','+g+','+b+')');
  c.beginPath();c.arc(cx,cy-R*.18,R*.32,0,Math.PI*2);c.fillStyle=dg;c.fill();
}
function drawElementPhoto(cv,e){
  var c=cv.getContext('2d');
  var W=cv.width,H=cv.height,cx=W/2,cy=H/2,R=Math.min(W,H)*.39;
  var vis=EL_VIS[e.n],st,r,g,b;
  if(vis){st=vis[0];r=vis[1];g=vis[2];b=vis[3];}
  else if(e.cat==='noble'){st='n';r=150;g=180;b=255;}
  else if(e.cat==='nonmetal'){st='g';r=200;g=220;b=245;}
  else if(e.cat==='halogen'){st='g';r=195;g=235;b=155;}
  else{st='s';r=175;g=178;b=188;}
  if(st==='n')_drawNoble(c,cx,cy,R,r,g,b);
  else if(st==='l')_drawLiquid(c,cx,cy,R,r,g,b);
  else if(st==='g')_drawGas(c,cx,cy,R,r,g,b);
  else _drawMetal(c,cx,cy,R,r,g,b);
}
/* ── end element photo ── */
function fillInfo(e){
  var cat=CAT[e.cat]||CAT.unknown;
  var sh=e.shells.map(function(n,i){return '<div class="shell-grp"><div class="shell-n">'+n+'</div><div class="shell-lbl">غلاف'+(i+1)+'</div></div>';}).join('<div class="shell-sep">→</div>');
  document.getElementById('element-info').innerHTML=
    '<canvas id="el-photo-c" width="150" height="150" class="el-photo-c"></canvas>'+
    '<div class="ei-sym" style="color:hsl('+(e.n*31%360)+',80%,70%)">'+e.sym+'</div>'+
    '<div class="ei-name">'+e.ar+'</div><div class="ei-name-en">'+e.en+'</div>'+
    '<div class="info-grid">'+
    ii('العدد الذري',e.n)+ii('الكتلة',e.mass)+
    ii('بروتونات',e.n)+ii('إلكترونات',e.n)+
    ii('نيوترونات',e.neutrons)+ii('الفصيلة',cat.ar)+
    '</div>'+
    '<div class="shells-row"><div class="shells-label">توزيع الإلكترونات</div><div class="shells-dots">'+sh+'</div></div>'+
    '<div class="ei-desc">'+(e.desc||('عنصر '+e.ar+' من فصيلة '+cat.ar+'.'))+'</div>';
  setTimeout(function(){var cv=document.getElementById('el-photo-c');if(cv)drawElementPhoto(cv,e);},0);
}
function ii(l,v){return '<div class="info-item"><div class="info-label">'+l+'</div><div class="info-val">'+v+'</div></div>';}
var BSTEPS=[
  '⭐ ابدأ بالنواة الفارغة',
  '❎ إضافة البروتونات (حمراء)',
  '⚪ إضافة النيوترونات (رمادية)',
  '🟡 إضافة الإلكترونات',
  '✅ الذرة مكتملة!'
];
function openBuild(n){buildEl=EL[n];if(!buildEl)return;buildStep=0;clearSel();document.getElementById('el-'+n).classList.add('selected');fillInfo(buildEl);document.getElementById('atom-modal').classList.remove('hidden');document.getElementById('build-extras').style.display='block';updBuild();}
function updBuild(){
  var p='';for(var i=0;i<BSTEPS.length;i++)p+='<div class="bpd'+(i<buildStep?' done':i===buildStep?' cur':'')+'"></div>';
  document.getElementById('build-prog').innerHTML=p;
  document.getElementById('build-lbl').textContent=BSTEPS[Math.min(buildStep,BSTEPS.length-1)];
  stopAtom();atomAnim=startAtom(document.getElementById('atom-canvas'),buildEl,buildStep);
}
function buildNext(){if(buildStep<BSTEPS.length-1){buildStep++;updBuild();}}
function buildPrev(){if(buildStep>0){buildStep--;updBuild();}}
function rndEl(){return ELEMENTS[Math.floor(Math.random()*ELEMENTS.length)];}
function rndElExcept(ns){var e;do{e=rndEl();}while(ns.indexOf(e.n)>-1);return e;}
function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function _uniq4(correct,getFn,key){
  var opts=[correct];var seen=[correct[key]];
  while(opts.length<4){var c=getFn();if(seen.indexOf(c[key])===-1){seen.push(c[key]);opts.push(c);}}
  return shuffle(opts);
}
function buildQuestions(){
  var qs=[];
  var used=[];
  var pool=shuffle(ELEMENTS.slice()).slice(0,30);
  pool.forEach(function(e){
    var type=qs.length%8;
    var cat=CAT[e.cat]||CAT.unknown;
    if(type===0){
      // ما رمز هذا العنصر؟ — hide sym
      var opts=_uniq4(e,function(){return rndElExcept([e.n]);},'sym');
      qs.push({el:e,hide:'sym',q:'ما رمز عنصر '+e.ar+'؟',choices:opts.map(function(x){return x.sym;}),ans:e.sym});
    } else if(type===1){
      // ما اسم العنصر الذي رمزه X؟ — show only symbol
      var opts2=_uniq4(e,function(){return rndElExcept([e.n]);},'sym');
      qs.push({el:null,sym:e.sym,hide:'',q:'ما اسم العنصر الذي رمزه ('+e.sym+')؟',choices:opts2.map(function(x){return x.ar;}),ans:e.ar});
    } else if(type===2){
      // كم عدد البروتونات؟ — hide atomic number
      var ns=[e.n];var opts3=[e.n];
      while(opts3.length<4){var x=Math.floor(Math.random()*118)+1;if(ns.indexOf(x)===-1){ns.push(x);opts3.push(x);}}
      qs.push({el:e,hide:'n',q:'كم عدد البروتونات في نواة '+e.ar+'؟',choices:shuffle(opts3),ans:e.n});
    } else if(type===3){
      // إلى أي فصيلة ينتمي؟ — hide category
      var cats=Object.keys(CAT).filter(function(k){return k!==e.cat;});shuffle(cats);
      var choicesCat=[cat.ar];
      for(var ci=0;ci<3;ci++){choicesCat.push((CAT[cats[ci]]||CAT.unknown).ar);}
      qs.push({el:e,hide:'cat',q:'إلى أي فصيلة ينتمي عنصر '+e.ar+'؟',choices:shuffle(choicesCat),ans:cat.ar});
    } else if(type===4){
      // كم عدد النيوترونات؟ — neutrons not shown in card anyway
      var nns=[e.neutrons];var opts4=[e.neutrons];
      while(opts4.length<4){var nx=e.neutrons+Math.floor(Math.random()*20)-10;if(nx>0&&nns.indexOf(nx)===-1){nns.push(nx);opts4.push(nx);}}
      qs.push({el:e,hide:'',q:'كم عدد النيوترونات في ذرة '+e.ar+'؟',choices:shuffle(opts4),ans:e.neutrons});
    } else if(type===5){
      // كم عدد الأغلفة؟ — not shown in card
      var sh=e.shells.length;var sns=[sh];var opts5=[sh];
      while(opts5.length<4){var sx=Math.floor(Math.random()*7)+1;if(sns.indexOf(sx)===-1){sns.push(sx);opts5.push(sx);}}
      qs.push({el:e,hide:'',q:'كم عدد مستويات الطاقة (الأغلفة) في عنصر '+e.ar+'؟',choices:shuffle(opts5),ans:sh});
    } else if(type===6){
      // ما الكتلة الذرية؟ — not shown in card
      var m=Math.round(e.mass);var ms=[m];var opts6=[m];
      while(opts6.length<4){var mx=m+Math.floor(Math.random()*30)-15;if(mx>0&&ms.indexOf(mx)===-1){ms.push(mx);opts6.push(mx);}}
      qs.push({el:e,hide:'',q:'ما الكتلة الذرية التقريبية لعنصر '+e.ar+' بالوحدة الذرية؟',choices:shuffle(opts6),ans:m});
    } else {
      // في أي دورة يقع؟ — hide period (not directly shown but add period hide)
      var pr=e.period;var ps=[pr];var opts7=[pr];
      while(opts7.length<4){var px=Math.floor(Math.random()*7)+1;if(ps.indexOf(px)===-1){ps.push(px);opts7.push(px);}}
      qs.push({el:e,hide:'',q:'في أي دورة يقع عنصر '+e.ar+'؟',choices:shuffle(opts7),ans:pr});
    }
  });
  return shuffle(qs).slice(0,12);
}
function startQuiz(){
  document.getElementById('quiz-result').style.display='none';
  document.getElementById('quiz-game').style.display='flex';
  quizQ=buildQuestions();
  quizCur=0;quizScore=0;showQ();
}
function showQ(){
  if(quizCur>=quizQ.length){showResult();return;}
  var q=quizQ[quizCur];
  var total=quizQ.length;
  document.getElementById('quiz-score').textContent=quizScore+' / '+quizCur;
  document.getElementById('quiz-progress-fill').style.width=Math.round(quizCur/total*100)+'%';
  document.getElementById('quiz-fb').textContent='';
  document.getElementById('quiz-fb').className='quiz-fb';
  document.getElementById('quiz-next').classList.add('hidden');
  // element card — hide the field being tested
  var card=document.getElementById('quiz-el-card');
  if(q.el){
    var cat=CAT[q.el.cat]||CAT.unknown;
    var hue=(q.el.n*31%360);
    var nHtml   = q.hide==='n'
      ? '<div class="qz-el-n qz-hidden">?</div>'
      : '<div class="qz-el-n">'+q.el.n+'</div>';
    var symHtml = q.hide==='sym'
      ? '<div class="qz-el-sym qz-hidden">?</div>'
      : '<div class="qz-el-sym '+cat.cls+'" style="color:hsl('+hue+',80%,70%)">'+q.el.sym+'</div>';
    var catHtml = q.hide==='cat'
      ? ''
      : '<div class="qz-el-cat">'+cat.ar+'</div>';
    card.innerHTML='<div class="qz-el-card">'+nHtml+symHtml+'<div class="qz-el-ar">'+q.el.ar+'</div>'+catHtml+'</div>';
  } else if(q.sym){
    card.innerHTML='<div class="qz-el-card"><div class="qz-el-sym" style="color:#60a5fa;font-size:3.8rem">'+q.sym+'</div></div>';
  } else {
    card.innerHTML='';
  }
  document.getElementById('quiz-q').textContent=q.q;
  var chWrap=document.getElementById('quiz-choices');
  chWrap.innerHTML='';
  q.choices.forEach(function(c){
    var btn=document.createElement('button');
    btn.className='qc-btn';
    btn.textContent=(c===null?'—':c);
    btn.addEventListener('click',function(){handleChoice(btn,c);});
    chWrap.appendChild(btn);
  });
}
function handleChoice(btn,val){
  var q=quizQ[quizCur];if(!q)return;
  if(document.querySelectorAll('.qc-btn')[0].disabled)return;
  var ok=(String(val)===String(q.ans));
  if(ok)quizScore++;
  document.querySelectorAll('.qc-btn').forEach(function(b){
    b.disabled=true;
    if(String(b.textContent)===String(q.ans))b.classList.add('correct');
  });
  if(!ok)btn.classList.add('wrong');
  var fb=document.getElementById('quiz-fb');
  fb.textContent=ok?'✅ إجابة صحيحة، أحسنت!':'❌ الإجابة الصحيحة: '+q.ans;
  fb.className='quiz-fb '+(ok?'ok':'bad');
  document.getElementById('quiz-score').textContent=quizScore+' / '+(quizCur+1);
  document.getElementById('quiz-next').classList.remove('hidden');
}
function handleQuizClick(){}
function nextQuestion(){quizCur++;showQ();}
function showResult(){
  document.getElementById('quiz-progress-fill').style.width='100%';
  document.getElementById('quiz-game').style.display='none';
  document.getElementById('quiz-result').style.display='flex';
  var p=Math.round(quizScore/quizQ.length*100);
  var stars=p>=90?'⭐⭐⭐':p>=70?'⭐⭐':p>=50?'⭐':'';
  document.getElementById('result-stars').textContent=stars;
  document.getElementById('result-title').textContent=p>=90?'ممتاز جداً!':p>=70?'جيد جداً!':p>=50?'جيد — استمر!':'حاول مرة أخرى';
  document.getElementById('result-sub').textContent='نتيجتك: '+quizScore+' من '+quizQ.length+' — ('+p+'%)';
  document.getElementById('quiz-score').textContent=quizScore+' / '+quizQ.length;
}
function closeQuiz(){document.getElementById('quiz-panel').classList.add('hidden');mode='explore';setMode('explore');}
var cmpL=null,cmpR=null;
function pickCompare(s){
  compareSlot=s;
  var panel=document.getElementById('compare-panel');
  panel.classList.add('picking');
  var slotAr=s==='left'?'اليسار':'اليمين';
  document.getElementById('pick-hint').innerHTML=
    '← انقر على عنصر من الجدول لخانة '+slotAr+
    ' &nbsp;<button onclick="cancelPick()" style="background:#ef4444;border:none;color:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:.9rem">إلغاء</button>';
}
function cancelPick(){document.getElementById('compare-panel').classList.remove('picking');}
function handleCmpClick(n){
  var e=EL[n];if(!e)return;
  if(compareSlot==='left')cmpL=e;else cmpR=e;
  document.getElementById('compare-panel').classList.remove('picking');
  renderCmp();
  compareSlot=(compareSlot==='left')?'right':'left';
}
function renderCmp(){renderCmpCard('cmp-left',cmpL,cmpR);renderCmpCard('cmp-right',cmpR,cmpL);}
function renderCmpCard(id,e,o){
  var el=document.getElementById(id);
  if(!e){el.className='cmp-card cmp-empty';el.innerHTML='انقر عنصراً من الجدول';el.onclick=function(){pickCompare(id.includes('left')?'left':'right');};return;}
  el.className='cmp-card';el.onclick=null;
  var cat=CAT[e.cat]||CAT.unknown;
  var stats=[['العدد الذري',e.n,o?e.n-o.n:0],['الكتلة',e.mass,o?e.mass-o.mass:0],['بروتونات',e.n,o?e.n-o.n:0],['نيوترونات',e.neutrons,o?e.neutrons-o.neutrons:0],['أغلفة',e.shells.length,o?e.shells.length-o.shells.length:0]];
  el.innerHTML='<div class="cmp-sym '+cat.cls+'" style="border-radius:6px;padding:2px 8px;">'+e.sym+'</div><div class="cmp-name">'+e.ar+'</div><div class="cmp-name-en">'+e.en+'</div><div class="cmp-stats">'+stats.map(function(s){var h=o?(s[2]>0?'hi':s[2]<0?'lo':''):'';return '<div class="cmp-stat"><span>'+s[0]+'</span><span class="cmp-stat-v '+h+'">'+s[1]+'</span></div>';}).join('')+'</div>';
}
function closeCompare(){document.getElementById('compare-panel').classList.add('hidden');cmpL=null;cmpR=null;setMode('explore');}
function openPresent(){document.getElementById('present-overlay').classList.remove('hidden');presentIdx=1;renderPresent();try{document.documentElement.requestFullscreen();}catch(e){}}
function closePresent(){document.getElementById('present-overlay').classList.add('hidden');stopPresAnim();try{document.exitFullscreen();}catch(e){}}
function presentMove(d){presentIdx=Math.max(1,Math.min(118,presentIdx+d));renderPresent();}
function renderPresent(){
  var e=EL[presentIdx];if(!e)return;
  var cat=CAT[e.cat]||CAT.unknown;
  var sh=e.shells.map(function(n,i){return '<div class="p-shell-g"><div class="p-shell-n">'+n+'</div><div class="p-shell-l">غلاف'+(i+1)+'</div></div>';}).join('<div class="p-shell-sep">→</div>');
  document.getElementById('present-info').innerHTML=
    '<div class="p-num">العدد الذري: '+e.n+'</div>'+
    '<div class="p-sym" style="color:hsl('+(e.n*31%360)+',80%,70%)">'+e.sym+'</div>'+
    '<div class="p-name">'+e.ar+'</div><div class="p-name-en">'+e.en+'</div>'+
    '<div class="p-facts"><div class="p-fact"><div class="p-fact-lbl">الكتلة الذرية</div><div class="p-fact-v">'+e.mass+'</div></div><div class="p-fact"><div class="p-fact-lbl">بروتونات</div><div class="p-fact-v">'+e.n+'</div></div><div class="p-fact"><div class="p-fact-lbl">نيوترونات</div><div class="p-fact-v">'+e.neutrons+'</div></div></div>'+
    '<div class="p-shells">'+sh+'</div>'+
    '<div class="p-desc">'+(e.desc||('عنصر '+e.ar+' من فصيلة '+cat.ar+'.'))+'</div>';
  document.getElementById('p-counter').textContent=presentIdx+' / 118';
  stopPresAnim();presentAnim=startAtom(document.getElementById('present-canvas'),e,99);
}
function stopPresAnim(){if(presentAnim){cancelAnimationFrame(presentAnim._raf);presentAnim=null;}}
function stopAtom(){if(atomAnim){cancelAnimationFrame(atomAnim._raf);atomAnim=null;}}
function startAtom(canvas,el,step){
  var ctx=canvas.getContext('2d');
  var W=canvas.width,H=canvas.height,cx=W/2,cy=H/2;
  var ang=0,raf;
  var total=Math.min(el.n+el.neutrons,60);
  var nuc=[];
  for(var i=0;i<total;i++){
    var a0=(i/total)*Math.PI*2+i*0.7;
    var r0=Math.max(4,Math.min(30,Math.sqrt(total)*2.2))*(0.35+0.65*((i*7919)%100/100));
    nuc.push({a:a0,r:r0,p:i<el.n});
  }
  var shells=el.shells;
  var maxR=Math.min(cx,cy)*0.86;
  var sR=shells.map(function(_,i){return maxR*(i+1)/shells.length;});
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#030712';ctx.fillRect(0,0,W,H);
    shells.forEach(function(cnt,si){
      var r=sR[si];
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(96,165,250,0.22)';ctx.setLineDash([4,4]);ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);
      if(step<3)return;
      for(var ei=0;ei<cnt;ei++){
        var spd=0.45/(si+1);
        var ea=(ei/cnt)*Math.PI*2+ang*spd*(si%2?-1:1);
        var ex=cx+r*Math.cos(ea),ey=cy+r*Math.sin(ea);
        var g=ctx.createRadialGradient(ex,ey,0,ex,ey,8);
        g.addColorStop(0,'rgba(96,165,250,0.95)');g.addColorStop(1,'rgba(96,165,250,0)');
        ctx.beginPath();ctx.arc(ex,ey,8,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(ex,ey,3,0,Math.PI*2);ctx.fillStyle='#93c5fd';ctx.fill();
      }
    });
    if(step>=1){
      nuc.forEach(function(np){
        var nx=cx+np.r*Math.cos(np.a+ang*0.07);
        var ny=cy+np.r*Math.sin(np.a+ang*0.07);
        var col=step>=2?(np.p?'#ef4444':'#94a3b8'):'#6b7280';
        var gc=ctx.createRadialGradient(nx,ny,0,nx,ny,6);
        gc.addColorStop(0,col);gc.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath();ctx.arc(nx,ny,6,0,Math.PI*2);ctx.fillStyle=gc;ctx.fill();
        ctx.beginPath();ctx.arc(nx,ny,3.5,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();
      });
    }
    ang+=0.013;
    raf=requestAnimationFrame(draw);
  }
  draw();
  return {_raf:raf,stop:function(){cancelAnimationFrame(raf);}};
}
function setStatus(t){document.getElementById('status-bar').textContent=t;}
function closeModal(id){document.getElementById(id).classList.add('hidden');stopAtom();clearSel();}
document.addEventListener('keydown',function(ev){
  var po=document.getElementById('present-overlay');
  if(!po.classList.contains('hidden')){
    if(ev.key==='ArrowRight'||ev.key==='ArrowDown')presentMove(1);
    else if(ev.key==='ArrowLeft'||ev.key==='ArrowUp')presentMove(-1);
    else if(ev.key==='Escape')closePresent();
  }
});
buildLegend();buildTable();
document.querySelectorAll('.mode-btn').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.mode);});});
document.getElementById('btn-present').addEventListener('click',openPresent);
window.closeModal=closeModal;window.buildNext=buildNext;window.buildPrev=buildPrev;
window.closeQuiz=closeQuiz;window.startQuiz=startQuiz;window.nextQuestion=nextQuestion;
window.handleChoice=handleChoice;window.closeCompare=closeCompare;window.pickCompare=pickCompare;
window.closePresent=closePresent;window.presentMove=presentMove;
window.setMode=setMode;window.EL=EL;window.setStatus=setStatus;
window.searchEl=searchEl;window.filterCat=filterCat;
window.onEl=onEl;
window.toggleFullscreen=function(){
  var btn=document.getElementById('btn-fullscreen');
  if(!document.fullscreenElement&&!document.webkitFullscreenElement){
    var el=document.documentElement;
    if(el.requestFullscreen)el.requestFullscreen();
    else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
    if(btn)btn.textContent='⋆⋆';
  }else{
    if(document.exitFullscreen)document.exitFullscreen();
    else if(document.webkitExitFullscreen)document.webkitExitFullscreen();
    if(btn)btn.textContent='⛶';
  }
};
document.addEventListener('fullscreenchange',function(){
  var btn=document.getElementById('btn-fullscreen');
  if(btn)btn.textContent=document.fullscreenElement?'⋆⋆':'⛶';
});
document.addEventListener('webkitfullscreenchange',function(){
  var btn=document.getElementById('btn-fullscreen');
  if(btn)btn.textContent=document.webkitFullscreenElement?'⋆⋆':'⛶';
});
})();