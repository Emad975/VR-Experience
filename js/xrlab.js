/* xrlab.js — shared framework for EDAMA immersive 3D/VR labs.
   Provides: scene + lights + starfield + grid floor, orbit controls,
   Arabic VR button, XR controllers with laser pointers, text sprites,
   a frame-callback loop, an IN-HEADSET control panel (sliders/buttons
   mirrored from the page DOM, plus exit + zoom), spatial audio, and
   in-scene live value readouts. Requires three.min.js + OrbitControls.js
   + VRButton.js loaded first. */
var XRLab=(function(){
'use strict';

function glowTexture(inner,outer){
  var cv=document.createElement('canvas');cv.width=cv.height=128;
  var c=cv.getContext('2d');
  var g=c.createRadialGradient(64,64,4,64,64,64);
  g.addColorStop(0,inner);g.addColorStop(.35,outer);g.addColorStop(1,'rgba(0,0,0,0)');
  c.fillStyle=g;c.fillRect(0,0,128,128);
  return new THREE.CanvasTexture(cv);
}

/* sprite with crisp Arabic text; call sprite.setText() to update */
function textSprite(text,color,worldH){
  worldH=worldH||.5;
  var cv=document.createElement('canvas');cv.width=512;cv.height=128;
  var c=cv.getContext('2d');
  var tex=new THREE.CanvasTexture(cv);
  tex.anisotropy=4;
  var mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false});
  var s=new THREE.Sprite(mat);
  s.scale.set(worldH*4,worldH,1);
  s.setText=function(t,col){
    c.clearRect(0,0,512,128);
    c.font='900 56px Tajawal, Arial';
    c.textAlign='center';c.textBaseline='middle';
    c.shadowColor=col||color;c.shadowBlur=16;
    c.fillStyle=col||color;
    c.fillText(t,256,64);
    tex.needsUpdate=true;
  };
  s.setText(text,color);
  return s;
}

/* rounded-rect path helper for canvas */
function rr(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

/* ───────────────────────── audio ───────────────────────── */
function makeAudio(){
  var ctx=null,master=null,ambGain=null,enabled=true,started=false;
  function ensure(){
    if(ctx)return;
    try{ctx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
    master=ctx.createGain();master.gain.value=.5;master.connect(ctx.destination);
  }
  function startAmbient(){
    if(started||!ctx)return;started=true;
    ambGain=ctx.createGain();ambGain.gain.value=0;ambGain.connect(master);
    /* slow detuned pad */
    [110,110.4,164.8].forEach(function(f,i){
      var o=ctx.createOscillator();o.type=i===2?'triangle':'sine';o.frequency.value=f;
      var g=ctx.createGain();g.gain.value=i===2?.12:.22;
      o.connect(g);g.connect(ambGain);o.start();
    });
    /* gentle LFO swell */
    var lfo=ctx.createOscillator();lfo.frequency.value=.06;
    var lg=ctx.createGain();lg.gain.value=.04;
    lfo.connect(lg);lg.connect(ambGain.gain);lfo.start();
    ambGain.gain.setTargetAtTime(enabled?.5:0,ctx.currentTime,1.5);
  }
  function resume(){
    ensure();if(!ctx)return;
    if(ctx.state==='suspended')ctx.resume();
    startAmbient();
  }
  function blip(freq,dur,type,vol){
    ensure();if(!ctx||!enabled)return;
    if(ctx.state==='suspended')ctx.resume();
    var o=ctx.createOscillator();o.type=type||'sine';o.frequency.value=freq||440;
    var g=ctx.createGain();var t=ctx.currentTime;dur=dur||.12;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(vol||.3,t+.012);
    g.gain.exponentialRampToValueAtTime(.0008,t+dur);
    o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.02);
  }
  return {
    resume:resume,
    blip:blip,
    click:function(){blip(660,.09,'triangle',.25);},
    ok:function(){blip(523,.1,'sine',.28);setTimeout(function(){blip(784,.14,'sine',.28);},90);},
    tone:function(f,d,t,v){blip(f,d,t,v);},
    isEnabled:function(){return enabled;},
    setEnabled:function(b){
      enabled=b;
      if(ambGain&&ctx)ambGain.gain.setTargetAtTime(b?.5:0,ctx.currentTime,.4);
    },
    toggle:function(){this.setEnabled(!enabled);return enabled;}
  };
}

/* ─────────────────── in-headset control panel ─────────────────── */
/* Builds 3D widgets attached to a controller, mirroring the page's
   .side-panel / .ctl-bar DOM so values can be changed inside VR. */
function buildPanel(env){
  var THREEv=THREE;
  var group=new THREEv.Group();          /* whole wrist panel */
  var targets=[];                         /* interactive meshes */
  var liveRows=[];                        /* {valEl,draw} live readouts */
  var PW=0.30;                            /* panel width (m) */
  var PADX=0.012, ROWH=0.05, GAP=0.006, TITLEH=0.034;

  function canvasMesh(w,h){
    var px=Math.max(64,Math.round(w*900)), py=Math.max(48,Math.round(h*900));
    var cv=document.createElement('canvas');cv.width=px;cv.height=py;
    var c=cv.getContext('2d');
    var tex=new THREEv.CanvasTexture(cv);tex.anisotropy=4;
    var mat=new THREEv.MeshBasicMaterial({map:tex,transparent:true});
    var mesh=new THREEv.Mesh(new THREEv.PlaneGeometry(w,h),mat);
    mesh.userData.cv=cv;mesh.userData.ctx=c;mesh.userData.tex=tex;mesh.userData.px=px;mesh.userData.py=py;
    return mesh;
  }

  function drawButton(mesh,label,state){
    var c=mesh.userData.ctx,px=mesh.userData.px,py=mesh.userData.py;
    c.clearRect(0,0,px,py);
    var on=state==='on',hover=state==='hover';
    rr(c,3,3,px-6,py-6,18);
    c.fillStyle=on?'rgba(52,211,153,.20)':(hover?'rgba(96,165,250,.18)':'rgba(16,24,52,.92)');
    c.fill();
    c.lineWidth=hover?7:3.5;
    c.strokeStyle=on?'#34d399':(hover?'#93c5fd':'rgba(255,255,255,.28)');
    c.stroke();
    c.fillStyle=on?'#34d399':'#e7edf7';
    c.font='900 '+Math.round(py*.42)+'px Tajawal, Arial';
    c.textAlign='center';c.textBaseline='middle';
    c.fillText(label,px/2,py/2+2);
    mesh.userData.tex.needsUpdate=true;
  }

  /* generic action button (exit/zoom/audio/dom-button) */
  function actionButton(label,w,getState,onClick){
    var h=ROWH;
    var mesh=canvasMesh(w,h);
    mesh.userData.kind='button';
    mesh.userData.labelFn=(typeof label==='function')?label:function(){return label;};
    mesh.userData.redraw=function(hover){
      drawButton(mesh,mesh.userData.labelFn(),hover?'hover':(getState&&getState()?'on':'off'));
    };
    mesh.userData.activate=function(){onClick();};
    mesh.userData.redraw(false);
    targets.push(mesh);
    return mesh;
  }

  function drawSlider(mesh){
    var ctrl=mesh.userData.ctrl;
    var c=mesh.userData.ctx,px=mesh.userData.px,py=mesh.userData.py;
    var min=+ctrl.input.min,max=+ctrl.input.max,val=+ctrl.input.value;
    if(isNaN(min))min=0;if(isNaN(max))max=100;
    var t=(max-min)?(val-min)/(max-min):0;t=Math.max(0,Math.min(1,t));
    var hover=mesh.userData.hover;
    c.clearRect(0,0,px,py);
    rr(c,3,3,px-6,py-6,16);
    c.fillStyle='rgba(16,24,52,.92)';c.fill();
    c.lineWidth=hover?6:3;c.strokeStyle=hover?'#93c5fd':'rgba(255,255,255,.22)';c.stroke();
    /* label (right, RTL) + value (left) */
    c.textBaseline='middle';
    c.font='800 '+Math.round(py*.26)+'px Tajawal, Arial';
    c.fillStyle='#cbd5e1';c.textAlign='right';
    c.fillText(ctrl.label||'',px-px*.04,py*.30);
    c.fillStyle='#fbbf24';c.textAlign='left';
    var vtxt=ctrl.valEl?ctrl.valEl.textContent:String(val);
    c.fillText(vtxt,px*.04,py*.30);
    /* track */
    var tx0=px*.08,tx1=px*.92,ty=py*.70,tw=tx1-tx0;
    c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=py*.06;c.lineCap='round';
    c.beginPath();c.moveTo(tx0,ty);c.lineTo(tx1,ty);c.stroke();
    c.strokeStyle='#60a5fa';
    c.beginPath();c.moveTo(tx0,ty);c.lineTo(tx0+tw*t,ty);c.stroke();
    /* handle */
    c.beginPath();c.arc(tx0+tw*t,ty,py*.13,0,Math.PI*2);
    c.fillStyle='#dbeafe';c.fill();
    c.lineWidth=3;c.strokeStyle='#60a5fa';c.stroke();
    mesh.userData.tex.needsUpdate=true;
    mesh.userData.t0=0.08;mesh.userData.t1=0.92; /* fractional track extents */
  }

  function sliderRow(ctrl){
    var mesh=canvasMesh(PW-PADX*2,ROWH*1.15);
    mesh.userData.kind='slider';
    mesh.userData.ctrl=ctrl;
    mesh.userData.redraw=function(){drawSlider(mesh);};
    mesh.userData.setFromLocalX=function(lx){
      var w=PW-PADX*2;
      var u=(lx/w)+0.5;                 /* 0..1 across plane */
      var t=(u-mesh.userData.t0)/(mesh.userData.t1-mesh.userData.t0);
      t=Math.max(0,Math.min(1,t));
      var min=+ctrl.input.min,max=+ctrl.input.max,step=+ctrl.input.step||0;
      if(isNaN(min))min=0;if(isNaN(max))max=100;
      var v=min+t*(max-min);
      if(step>0)v=Math.round(v/step)*step;
      v=Math.round(v*1e6)/1e6;
      if(String(v)!==String(ctrl.input.value)){
        ctrl.input.value=v;
        ctrl.input.dispatchEvent(new Event('input',{bubbles:true}));
        ctrl.input.dispatchEvent(new Event('change',{bubbles:true}));
        if(env.audio)env.audio.blip(420+t*360,.04,'sine',.12);
      }
      drawSlider(mesh);
    };
    drawSlider(mesh);
    targets.push(mesh);
    return mesh;
  }

  function titleMesh(text){
    var mesh=canvasMesh(PW-PADX*2,TITLEH);
    var c=mesh.userData.ctx,px=mesh.userData.px,py=mesh.userData.py;
    c.clearRect(0,0,px,py);
    c.font='900 '+Math.round(py*.6)+'px Tajawal, Arial';
    c.fillStyle='#7dd3fc';c.textAlign='center';c.textBaseline='middle';
    c.fillText(text,px/2,py/2);
    mesh.userData.tex.needsUpdate=true;
    return mesh;
  }

  /* gather DOM controls */
  function collect(){
    var sliders=[],buttons=[];
    var sp=document.querySelector('.side-panel');
    document.querySelectorAll('.side-panel input[type=range]').forEach(function(inp){
      var row=inp.closest('.sp-row')||inp.parentNode;
      var nm=row.querySelector('.sp-name');
      var vl=row.querySelector('.sp-val');
      sliders.push({input:inp,label:nm?nm.textContent.trim():'',valEl:vl});
    });
    document.querySelectorAll('.ctl-bar .ctl-btn, .side-panel .sp-tab, .side-panel .sp-btn').forEach(function(b){
      buttons.push({el:b,label:(b.textContent||'').trim()});
    });
    var stats=[];
    document.querySelectorAll('.side-panel .sp-stat').forEach(function(s){
      var l=s.querySelector('.sp-stat-l'),v=s.querySelector('.sp-stat-v');
      if(v)stats.push({labelEl:l,valEl:v});
    });
    return {sliders:sliders,buttons:buttons,stats:stats};
  }

  var dom=collect();
  var y=0; var bg;

  function row(mesh,h){
    mesh.position.set(0,y-h/2,0.001);
    group.add(mesh);
    y-=(h+GAP);
  }

  /* ── system row: exit / zoom / audio ── */
  row(titleMesh('🎛️ لوحة التحكم'),TITLEH);

  var halfBtnW=(PW-PADX*2-GAP)/2;
  /* exit (full width, prominent) */
  var exitBtn=actionButton('🚪 خروج من العالم الافتراضي',PW-PADX*2,null,function(){
    if(env.audio)env.audio.click();
    var s=env.renderer.xr.getSession();
    if(s)s.end();
  });
  /* paint exit red-ish by overriding redraw */
  exitBtn.userData.redraw=function(hover){
    var c=exitBtn.userData.ctx,px=exitBtn.userData.px,py=exitBtn.userData.py;
    c.clearRect(0,0,px,py);
    rr(c,3,3,px-6,py-6,18);
    c.fillStyle=hover?'rgba(239,68,68,.32)':'rgba(127,29,29,.55)';c.fill();
    c.lineWidth=hover?7:3.5;c.strokeStyle=hover?'#fca5a5':'#ef4444';c.stroke();
    c.fillStyle='#fee2e2';c.font='900 '+Math.round(py*.38)+'px Tajawal, Arial';
    c.textAlign='center';c.textBaseline='middle';c.fillText('🚪 خروج من العالم الافتراضي',px/2,py/2+2);
    exitBtn.userData.tex.needsUpdate=true;
  };
  exitBtn.userData.redraw(false);
  row(exitBtn,ROWH);

  /* zoom out / zoom in side by side */
  var zoomOut=actionButton('🔍➖ تصغير',halfBtnW,null,function(){env.zoom(0.8);if(env.audio)env.audio.blip(300,.06,'sine',.18);});
  var zoomIn =actionButton('🔍➕ تكبير',halfBtnW,null,function(){env.zoom(1.25);if(env.audio)env.audio.blip(560,.06,'sine',.18);});
  zoomOut.position.set(-(halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(zoomOut);
  zoomIn.position.set( (halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(zoomIn);
  y-=(ROWH+GAP);

  /* reset zoom + audio toggle side by side */
  var zoomReset=actionButton('⟳ الحجم الأصلي',halfBtnW,null,function(){env.zoomReset();if(env.audio)env.audio.click();});
  var audioBtn=actionButton(function(){return env.audio&&env.audio.isEnabled()?'🔊 الصوت':'🔇 صامت';},halfBtnW,
    function(){return env.audio&&env.audio.isEnabled();},
    function(){if(env.audio){env.audio.toggle();}audioBtn.userData.redraw(false);});
  zoomReset.position.set(-(halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(zoomReset);
  audioBtn.position.set( (halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(audioBtn);
  y-=(ROWH+GAP);

  /* ── experiment sliders ── */
  if(dom.sliders.length){
    row(titleMesh('⚙️ القيم'),TITLEH);
    dom.sliders.forEach(function(ctrl){row(sliderRow(ctrl),ROWH*1.15);});
  }

  /* ── experiment buttons (2 per row) ── */
  if(dom.buttons.length){
    row(titleMesh('🔘 الأدوات'),TITLEH);
    var domBtn=function(b,w){
      var mesh=actionButton(b.label,w,
        function(){return b.el.classList.contains('on')||b.el.classList.contains('active');},
        function(){b.el.click();if(env.audio)env.audio.click();});
      mesh.userData.labelFn=function(){return (b.el.textContent||'').trim();};
      return mesh;
    };
    for(var i=0;i<dom.buttons.length;i+=2){
      var b1=dom.buttons[i],b2=dom.buttons[i+1];
      var m1=domBtn(b1,b2?halfBtnW:(PW-PADX*2));
      if(b2){
        var m2=domBtn(b2,halfBtnW);
        m1.position.set(-(halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(m1);
        m2.position.set( (halfBtnW+GAP)/2,y-ROWH/2,0.001);group.add(m2);
        y-=(ROWH+GAP);
      }else{
        row(m1,ROWH);
      }
    }
  }

  /* ── live readouts (fixes "frozen values" in VR) ── */
  if(dom.stats.length){
    row(titleMesh('📊 القيم الحية'),TITLEH);
    dom.stats.forEach(function(st){
      var mesh=canvasMesh(PW-PADX*2,ROWH);
      var draw=function(){
        var c=mesh.userData.ctx,px=mesh.userData.px,py=mesh.userData.py;
        c.clearRect(0,0,px,py);
        rr(c,3,3,px-6,py-6,14);c.fillStyle='rgba(0,0,0,.32)';c.fill();
        c.textBaseline='middle';
        c.font='800 '+Math.round(py*.32)+'px Tajawal, Arial';
        c.fillStyle='#94a3b8';c.textAlign='right';
        c.fillText(st.labelEl?st.labelEl.textContent.trim():'',px-px*.05,py/2);
        c.font='900 '+Math.round(py*.42)+'px Tajawal, Arial';
        c.fillStyle='#e7edf7';c.textAlign='left';
        c.fillText(st.valEl.textContent.trim(),px*.05,py/2);
        mesh.userData.tex.needsUpdate=true;
      };
      mesh.userData.lastVal=null;
      mesh.userData.tick=function(){
        if(mesh.userData.lastVal!==st.valEl.textContent){
          mesh.userData.lastVal=st.valEl.textContent;draw();
        }
      };
      draw();
      row(mesh,ROWH);
      liveRows.push(mesh);
    });
  }

  /* ── background plate sized to content ── */
  var totalH=-y+0.02;
  bg=new THREEv.Mesh(
    new THREEv.PlaneGeometry(PW,totalH),
    new THREEv.MeshBasicMaterial({color:0x05081a,transparent:true,opacity:.82})
  );
  bg.position.set(0,(-totalH/2)+0.0,-0.002);
  /* shift everything so top starts near 0; children already laid from y=0 downward */
  group.add(bg);
  var border=new THREEv.Mesh(
    new THREEv.PlaneGeometry(PW+0.006,totalH+0.006),
    new THREEv.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:.35})
  );
  border.position.set(0,(-totalH/2),-0.003);
  group.add(border);

  /* anchor: wrist-mounted on controller 0, tilted toward the face */
  group.scale.setScalar(1);
  group.position.set(0.0,0.045,-0.07);
  group.rotation.set(-Math.PI*0.42,0,0);
  group.translateY(totalH*0.5);   /* center vertically on anchor */

  return {
    group:group,
    targets:targets,
    redrawAll:function(hoverMesh){
      targets.forEach(function(m){
        if(m.userData.kind==='slider'){m.userData.hover=(m===hoverMesh);m.userData.redraw();}
        else m.userData.redraw(m===hoverMesh);
      });
    },
    tickLive:function(){for(var i=0;i<liveRows.length;i++)liveRows[i].userData.tick();}
  };
}

function init(opts){
  opts=opts||{};
  var renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.xr.enabled=true;
  (opts.container||document.body).appendChild(renderer.domElement);

  document.body.appendChild(VRButton.createButton(renderer,{
    enter:'🥽 دخول الواقع الافتراضي',exit:'خروج من VR',
    notSupported:'VR غير مدعوم على هذا الجهاز',notSecure:'VR يتطلب HTTPS'
  }));

  var scene=new THREE.Scene();
  scene.background=new THREE.Color(0x04061a);
  scene.fog=new THREE.FogExp2(0x04061a,opts.fog!==undefined?opts.fog:.014);

  /* world group — experiment content lives here so it can be zoomed
     (scaled) without touching controllers / UI / floor */
  var world=new THREE.Group();
  scene.add(world);

  var camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.05,400);
  var cp=opts.cameraPos||[0,2.4,8];
  camera.position.set(cp[0],cp[1],cp[2]);

  var controls=new THREE.OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;controls.dampingFactor=.06;
  var ct=opts.target||[0,1.2,0];
  controls.target.set(ct[0],ct[1],ct[2]);
  controls.minDistance=opts.minDistance||1.5;
  controls.maxDistance=opts.maxDistance||50;

  /* lights */
  scene.add(new THREE.HemisphereLight(0x8899ff,0x1a2236,1.05));
  var key=new THREE.DirectionalLight(0xffffff,1.15);
  key.position.set(6,12,5);
  scene.add(key);
  var rim=new THREE.PointLight(0x60a5fa,.7,60);
  rim.position.set(-8,6,-6);
  scene.add(rim);

  /* starfield dome */
  (function(){
    var n=1400,pos=new Float32Array(n*3);
    for(var i=0;i<n;i++){
      var r=90+Math.random()*120,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
      pos[i*3]=r*Math.sin(ph)*Math.cos(th);
      pos[i*3+1]=Math.abs(r*Math.cos(ph))*.7+2;
      pos[i*3+2]=r*Math.sin(ph)*Math.sin(th);
    }
    var g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    scene.add(new THREE.Points(g,new THREE.PointsMaterial({color:0x8899cc,size:.5,transparent:true,opacity:.75})));
  })();

  /* glowing grid floor */
  if(opts.floor!==false){
    var grid=new THREE.GridHelper(80,80,0x2f55b8,0x16224a);
    scene.add(grid);
    var fl=new THREE.Mesh(
      new THREE.CircleGeometry(40,48),
      new THREE.MeshBasicMaterial({color:0x070d22,transparent:true,opacity:.85})
    );
    fl.rotation.x=-Math.PI/2;fl.position.y=-.01;
    scene.add(fl);
  }

  /* audio */
  var audio=makeAudio();

  /* zoom — scales the world group around the controls target */
  var zoomState=1;
  var pivot=new THREE.Vector3(ct[0],ct[1],ct[2]);
  function applyZoom(){
    world.scale.setScalar(zoomState);
    world.position.copy(pivot).multiplyScalar(1-zoomState);
  }
  function zoomBy(f){zoomState=Math.max(0.2,Math.min(4,zoomState*f));applyZoom();}
  function zoomReset(){zoomState=1;applyZoom();}

  /* XR controllers with laser pointers */
  var controllers=[];
  for(var ci=0;ci<2;ci++){
    var c=renderer.xr.getController(ci);
    var lg=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-6)]);
    c.add(new THREE.Line(lg,new THREE.LineBasicMaterial({color:0x60a5fa,transparent:true,opacity:.7})));
    var tip=new THREE.Mesh(new THREE.SphereGeometry(.012,8,6),new THREE.MeshBasicMaterial({color:0x93c5fd}));
    c.add(tip);
    scene.add(c);
    controllers.push(c);
  }

  /* ── VR control panel (built on first session start) ── */
  var panel=null;
  var raycaster=new THREE.Raycaster();
  var dragSlider=null,dragController=null;
  var hoverMesh=null;
  var tmpMat=new THREE.Matrix4();

  function controllerRay(controller){
    tmpMat.identity().extractRotation(controller.matrixWorld);
    var origin=new THREE.Vector3().setFromMatrixPosition(controller.matrixWorld);
    var dir=new THREE.Vector3(0,0,-1).applyMatrix4(tmpMat).normalize();
    return {origin:origin,dir:dir};
  }
  function pickUI(controller){
    if(!panel)return null;
    var r=controllerRay(controller);
    raycaster.set(r.origin,r.dir);
    var hits=raycaster.intersectObjects(panel.targets,false);
    return hits.length?hits[0]:null;
  }

  function ensurePanel(){
    if(panel)return;
    panel=buildPanel({renderer:renderer,audio:audio,zoom:zoomBy,zoomReset:zoomReset});
    /* attach to controller 0 (wrist menu); point with the other hand */
    controllers[0].add(panel.group);
  }

  renderer.xr.addEventListener('sessionstart',function(){
    audio.resume();
    ensurePanel();
    if(panel)panel.group.visible=true;
    zoomReset();
  });
  renderer.xr.addEventListener('sessionend',function(){
    if(panel)panel.group.visible=false;
    zoomReset();
  });

  var frameCbs=[];
  var selectCbs=[];

  /* select handling: UI first, else experiment callbacks */
  controllers.forEach(function(ctrl){
    ctrl.addEventListener('selectstart',function(ev){
      var hit=pickUI(ctrl);
      if(hit){
        var m=hit.object;
        audio.resume();
        if(m.userData.kind==='slider'){
          dragSlider=m;dragController=ctrl;
          var lp=m.worldToLocal(hit.point.clone());
          m.userData.setFromLocalX(lp.x);
        }else if(m.userData.activate){
          m.userData.activate();
          panel.redrawAll(m);
        }
        return; /* consume — don't fire experiment select */
      }
      for(var i=0;i<selectCbs.length;i++)selectCbs[i](ctrl);
    });
    ctrl.addEventListener('selectend',function(){
      if(dragController===ctrl){dragSlider=null;dragController=null;}
    });
  });

  var clock=new THREE.Clock();
  renderer.setAnimationLoop(function(){
    var dt=Math.min(clock.getDelta(),.05);
    controls.update();

    /* VR panel interaction */
    if(panel&&renderer.xr.isPresenting){
      /* slider drag */
      if(dragSlider&&dragController){
        var r=controllerRay(dragController);
        raycaster.set(r.origin,r.dir);
        var hh=raycaster.intersectObject(dragSlider,false);
        if(hh.length){
          var lp=dragSlider.worldToLocal(hh[0].point.clone());
          dragSlider.userData.setFromLocalX(lp.x);
        }
      }
      /* hover (use controller 1 — the free hand) */
      var hoverCtrl=controllers[1];
      var h=pickUI(hoverCtrl)||pickUI(controllers[0]);
      var nh=h?h.object:null;
      if(nh!==hoverMesh){hoverMesh=nh;panel.redrawAll(hoverMesh);}
      /* thumbstick zoom (axes[3]) */
      var sess=renderer.xr.getSession();
      if(sess&&sess.inputSources){
        for(var s=0;s<sess.inputSources.length;s++){
          var gp=sess.inputSources[s].gamepad;
          if(gp&&gp.axes&&gp.axes.length>=4){
            var ay=gp.axes[3];
            if(Math.abs(ay)>0.25)zoomBy(1-ay*dt*1.4);
          }
        }
      }
      panel.tickLive();
    }

    for(var i=0;i<frameCbs.length;i++)frameCbs[i](dt,clock.elapsedTime);
    renderer.render(scene,camera);
  });

  window.addEventListener('resize',function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });

  /* first user gesture on the page also warms up audio */
  window.addEventListener('pointerdown',function once(){audio.resume();window.removeEventListener('pointerdown',once);},{once:true});

  return {
    scene:world,            /* experiment content (zoomable) */
    realScene:scene,
    world:world,
    camera:camera,renderer:renderer,controls:controls,
    controllers:controllers,
    audio:audio,
    zoom:zoomBy,zoomReset:zoomReset,
    onFrame:function(cb){frameCbs.push(cb);},
    onSelect:function(cb){selectCbs.push(cb);},
    textSprite:textSprite,
    glowTexture:glowTexture
  };
}

return {init:init,textSprite:textSprite,glowTexture:glowTexture};
})();
