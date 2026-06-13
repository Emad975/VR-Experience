/* portal3d.js — animated 3D background for portal pages.
   Floating glowing particles + drifting molecule clusters, with mouse and
   device-orientation parallax. Degrades silently when WebGL is missing.
   Requires js/vendor/three.min.js loaded first. */
(function(){
'use strict';
if(typeof THREE==='undefined')return;

var holder=document.createElement('div');
holder.className='bg3d';
document.body.prepend(holder);

var renderer;
try{
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
}catch(e){holder.remove();return;}
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);
holder.appendChild(renderer.domElement);

var scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x06091a,0.035);
var camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,120);
camera.position.set(0,0,22);

scene.add(new THREE.AmbientLight(0x445588,1.4));
var pl=new THREE.PointLight(0x60a5fa,1.2,80);
pl.position.set(10,12,18);
scene.add(pl);

/* glow sprite texture */
function glowTex(rgb){
  var cv=document.createElement('canvas');cv.width=cv.height=64;
  var c=cv.getContext('2d');
  var g=c.createRadialGradient(32,32,2,32,32,32);
  g.addColorStop(0,'rgba('+rgb+',.9)');
  g.addColorStop(.4,'rgba('+rgb+',.25)');
  g.addColorStop(1,'rgba('+rgb+',0)');
  c.fillStyle=g;c.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(cv);
}
var texBlue=glowTex('96,165,250'),texPurple=glowTex('167,139,250'),
    texGreen=glowTex('52,211,153'),texPink=glowTex('244,114,182');
var TEXES=[texBlue,texPurple,texGreen,texPink];
var COLS=[0x60a5fa,0xa78bfa,0x34d399,0xf472b6];
var drifters=[];

/* ── dust particles (Points) ── */
(function(){
  var n=700,pos=new Float32Array(n*3);
  for(var i=0;i<n;i++){
    pos[i*3]=(Math.random()*2-1)*45;
    pos[i*3+1]=(Math.random()*2-1)*28;
    pos[i*3+2]=(Math.random()*2-1)*30-5;
  }
  var g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var m=new THREE.PointsMaterial({color:0x7d9bd6,size:.14,transparent:true,opacity:.7,sizeAttenuation:true});
  var pts=new THREE.Points(g,m);
  pts.userData.spin=.004;
  scene.add(pts);
  drifters.push(pts);
})();

/* ── molecule clusters ── */
var sphereGeo=new THREE.SphereGeometry(1,14,11);
function molecule(atomCount,spread,colIdx){
  var grp=new THREE.Group();
  var mat=new THREE.MeshStandardMaterial({
    color:COLS[colIdx],roughness:.3,metalness:.2,
    emissive:COLS[colIdx],emissiveIntensity:.35
  });
  var atoms=[];
  for(var i=0;i<atomCount;i++){
    var a=new THREE.Mesh(sphereGeo,mat);
    a.position.set((Math.random()*2-1)*spread,(Math.random()*2-1)*spread,(Math.random()*2-1)*spread);
    a.scale.setScalar(.28+Math.random()*.3);
    var s=new THREE.Sprite(new THREE.SpriteMaterial({map:TEXES[colIdx],transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
    s.scale.setScalar(2.2);
    a.add(s);
    grp.add(a);atoms.push(a);
  }
  /* bonds: connect each atom to its nearest neighbour */
  var lineMat=new THREE.LineBasicMaterial({color:COLS[colIdx],transparent:true,opacity:.35});
  for(var i=0;i<atoms.length;i++){
    var best=-1,bd=1e9;
    for(var j=0;j<atoms.length;j++){
      if(i===j)continue;
      var d=atoms[i].position.distanceToSquared(atoms[j].position);
      if(d<bd){bd=d;best=j;}
    }
    if(best>=0){
      var lg=new THREE.BufferGeometry().setFromPoints([atoms[i].position,atoms[best].position]);
      grp.add(new THREE.Line(lg,lineMat));
    }
  }
  return grp;
}

for(var i=0;i<7;i++){
  var m=molecule(3+Math.floor(Math.random()*4),1.6,i%4);
  m.position.set((Math.random()*2-1)*30,(Math.random()*2-1)*16,-4-Math.random()*18);
  m.userData.spin=.06+Math.random()*.12;
  m.userData.drift=new THREE.Vector3((Math.random()*2-1)*.18,(Math.random()*2-1)*.1,0);
  m.userData.bobPhase=Math.random()*Math.PI*2;
  scene.add(m);
  drifters.push(m);
}

/* big slow wireframe icosahedron — depth anchor */
var wire=new THREE.Mesh(
  new THREE.IcosahedronGeometry(9,1),
  new THREE.MeshBasicMaterial({color:0x60a5fa,wireframe:true,transparent:true,opacity:.05})
);
wire.position.set(-14,4,-16);
scene.add(wire);

/* ── parallax: mouse + gyro ── */
var px=0,py=0,tx=0,ty=0;
window.addEventListener('mousemove',function(e){
  tx=(e.clientX/window.innerWidth-.5)*2;
  ty=(e.clientY/window.innerHeight-.5)*2;
});
window.addEventListener('deviceorientation',function(e){
  if(e.gamma===null)return;
  tx=Math.max(-1,Math.min(1,e.gamma/30));
  ty=Math.max(-1,Math.min(1,(e.beta-45)/30));
});

window.addEventListener('resize',function(){
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});

var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var clock=new THREE.Clock();
renderer.setAnimationLoop(function(){
  var dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;
  if(!reduced){
    for(var i=0;i<drifters.length;i++){
      var d=drifters[i];
      d.rotation.y+=(d.userData.spin||0)*dt;
      d.rotation.x+=(d.userData.spin||0)*dt*.6;
      if(d.userData.drift){
        d.position.addScaledVector(d.userData.drift,dt);
        d.position.y+=Math.sin(t*.5+d.userData.bobPhase)*dt*.3;
        if(d.position.x>34)d.position.x=-34;
        if(d.position.x<-34)d.position.x=34;
      }
    }
    wire.rotation.y+=dt*.02;wire.rotation.z+=dt*.012;
  }
  px+=(tx-px)*.04;py+=(ty-py)*.04;
  camera.position.x=px*2.4;
  camera.position.y=-py*1.6;
  camera.lookAt(0,0,-6);
  renderer.render(scene,camera);
});
})();
