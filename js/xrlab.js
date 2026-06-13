/* xrlab.js — shared framework for EDAMA immersive 3D/VR labs.
   Provides: scene + lights + starfield + grid floor, orbit controls,
   Arabic VR button, XR controllers with laser pointers, text sprites,
   and a frame-callback loop. Requires three.min.js + OrbitControls.js +
   VRButton.js loaded first. */
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

  /* XR controllers with laser pointers */
  var controllers=[];
  var selectCbs=[];
  for(var ci=0;ci<2;ci++){
    var c=renderer.xr.getController(ci);
    var lg=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,-6)]);
    c.add(new THREE.Line(lg,new THREE.LineBasicMaterial({color:0x60a5fa,transparent:true,opacity:.7})));
    var tip=new THREE.Mesh(new THREE.SphereGeometry(.012,8,6),new THREE.MeshBasicMaterial({color:0x93c5fd}));
    c.add(tip);
    c.addEventListener('selectstart',function(ev){
      for(var i=0;i<selectCbs.length;i++)selectCbs[i](ev.target);
    });
    scene.add(c);
    controllers.push(c);
  }

  var frameCbs=[];
  var clock=new THREE.Clock();
  renderer.setAnimationLoop(function(){
    var dt=Math.min(clock.getDelta(),.05);
    controls.update();
    for(var i=0;i<frameCbs.length;i++)frameCbs[i](dt,clock.elapsedTime);
    renderer.render(scene,camera);
  });

  window.addEventListener('resize',function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });

  return {
    scene:scene,camera:camera,renderer:renderer,controls:controls,
    controllers:controllers,
    onFrame:function(cb){frameCbs.push(cb);},
    onSelect:function(cb){selectCbs.push(cb);},
    textSprite:textSprite,
    glowTexture:glowTexture
  };
}

return {init:init,textSprite:textSprite,glowTexture:glowTexture};
})();
