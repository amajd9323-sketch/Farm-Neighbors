(() => {
'use strict';
if(window.__fn3dWorld)return;window.__fn3dWorld=true;
const css=document.createElement('style');
css.textContent='#fn3d-open{position:fixed;z-index:9998;right:18px;bottom:76px;border:1px solid #ffffff35;border-radius:15px;padding:12px 15px;background:linear-gradient(135deg,#315f9b,#4c86c5);color:#fff;font:700 13px system-ui;box-shadow:0 8px 25px #0006}#fn3d{display:none;position:fixed;z-index:10000;inset:0;background:#09151c;color:#fff;font-family:system-ui}#fn3d.on{display:flex;flex-direction:column}#fn3d header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:#10241c}#fn3d header strong{font-size:15px}#fn3d header button{border:0;border-radius:10px;padding:9px 13px;background:#ffffff20;color:white}#fn3d canvas{display:block;width:100%;height:100%;touch-action:none;flex:1}#fn3d .hint{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);padding:8px 12px;background:#07110dcc;border:1px solid #ffffff24;border-radius:20px;font-size:11px;white-space:nowrap;color:#e4f4e7}';
document.head.appendChild(css);
const open=document.createElement('button');open.id='fn3d-open';open.textContent='🌍 3D Farm';document.body.appendChild(open);
const shell=document.createElement('div');shell.id='fn3d';shell.innerHTML='<header><strong>🌳 Farm Neighbors · 3D World</strong><button id="fn3d-close">✕</button></header><canvas id="fn3d-canvas"></canvas><div class="hint">Drag to rotate · Pinch / wheel to zoom</div>';document.body.appendChild(shell);
const canvas=document.getElementById('fn3d-canvas'),gl=canvas.getContext('webgl',{antialias:true,alpha:false});
if(!gl){open.disabled=true;open.textContent='3D unavailable';return;}
const vs='attribute vec3 p;attribute vec3 c;uniform mat4 mvp;varying vec3 v;void main(){gl_Position=mvp*vec4(p,1.0);v=c;}';
const fs='precision mediump float;varying vec3 v;void main(){gl_FragColor=vec4(v,1.0);}';
function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));}catch(e){open.disabled=true;open.textContent='3D error';return;}
gl.useProgram(program);
const pos=gl.getAttribLocation(program,'p'),col=gl.getAttribLocation(program,'c'),mvpLoc=gl.getUniformLocation(program,'mvp');
let vertices=[],colors=[];
function tri(a,b,c,color){for(const v of [a,b,c]){vertices.push(...v);colors.push(...color);}}
function quad(a,b,c,d,color){tri(a,b,c,color);tri(a,c,d,color);}
function cube(x,y,z,w,h,d,color){let x0=x-w/2,x1=x+w/2,y0=y,y1=y+h,z0=z-d/2,z1=z+d/2;let a=[x0,y0,z0],b=[x1,y0,z0],c=[x1,y1,z0],e=[x0,y1,z0],f=[x0,y0,z1],g=[x1,y0,z1],j=[x1,y1,z1],k=[x0,y1,z1];quad(a,b,c,e,color);quad(g,f,k,j,color);quad(f,a,e,k,color);quad(b,g,j,c,color);quad(e,c,j,k,color);quad(f,g,b,a,color);}
function ground(){quad([-12,-.15,-12],[12,-.15,-12],[12,-.15,12],[-12,-.15,12],[.25,.48,.29]);}
function tree(x,z,s=1){cube(x,-.05,z,.24*s,.9*s,.24*s,[.34,.2,.1]);cube(x,.48*s,z,.95*s,.95*s,.95*s,[.13,.42,.19]);cube(x,.85*s,z,.65*s,.7*s,.65*s,[.18,.52,.22]);}
function house(x,z){cube(x,0,z,2.1,1.2,1.8,[.76,.65,.45]);cube(x,.9,z,2.35,.65,2.05,[.56,.19,.16]);cube(x,.15,z+.92,.48,.75,.08,[.27,.17,.1]);cube(x-.55,.62,z+.93,.42,.4,.08,[.36,.7,.83]);cube(x+.55,.62,z+.93,.42,.4,.08,[.36,.7,.83]);}
function build(){
vertices=[];colors=[];ground();
for(let i=0;i<24;i++){let x=(i%6-2.5)*1.55,z=(Math.floor(i/6)-1.5)*1.55;cube(x,-.02,z,1.35,.12,1.28,[.42,.27,.13]);}
tree(-6,-5,1.5);tree(6,-4,1.4);tree(-6,5,1.25);tree(6,5,1.5);tree(4,-7,1.1);house(-4,-5);
cube(0,-.04,-5,3,.08,.7,[.63,.58,.38]);
const data=(()=>{try{return JSON.parse(localStorage.getItem('fn-farm-v1')||'{}')}catch(e){return {}}})();
const plots=data.plots||[];
for(let i=0;i<Math.min(24,plots.length);i++){let p=plots[i];if(!p.crop)continue;let x=(i%6-2.5)*1.55,z=(Math.floor(i/6)-1.5)*1.55;let ripe=p.ready&&p.ready<=Date.now(),color=p.crop==='wheat'?[.83,.68,.22]:p.crop==='carrot'?[.92,.4,.12]:p.crop==='strawberry'?[.75,.13,.23]:[.3,.68,.2];for(let k=0;k<3;k++)cube(x+(k-1)*.3,.08,z,.12,ripe?.65:.28,.12,color);}
}
build();
let yaw=.7,pitch=.75,dist=17,drag=false,lx=0,ly=0;
function mat(){let aspect=canvas.width/canvas.height,f=1/Math.tan(Math.PI/7),near=.1,far=100;let proj=[f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,(2*far*near)/(near-far),0];let cx=Math.sin(yaw)*Math.cos(pitch)*dist,cy=Math.sin(pitch)*dist,cz=Math.cos(yaw)*Math.cos(pitch)*dist;let fx=-cx,fy=-cy,fz=-cz,fl=Math.hypot(fx,fy,fz);fx/=fl;fy/=fl;fz/=fl;let rx=fz,ry=0,rz=-fx,rl=Math.hypot(rx,rz);rx/=rl;rz/=rl;let ux=ry*fz-rz*fy,uy=rz*fx-rx*fz,uz=rx*fy-ry*fx;let view=[rx,ux,-fx,0,ry,uy,-fy,0,rz,uz,-fz,0,0,0,-dist,1];let out=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){out[c*4+r]=0;for(let k=0;k<4;k++)out[c*4+r]+=proj[k*4+r]*view[c*4+k];}return out;}
function draw(){if(!shell.classList.contains('on'))return;const w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.floor(w*devicePixelRatio)||canvas.height!==Math.floor(h*devicePixelRatio)){canvas.width=Math.floor(w*devicePixelRatio);canvas.height=Math.floor(h*devicePixelRatio);}gl.viewport(0,0,canvas.width,canvas.height);gl.enable(gl.DEPTH_TEST);gl.clearColor(.42,.68,.83,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);let pb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);let cb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW);gl.enableVertexAttribArray(col);gl.vertexAttribPointer(col,3,gl.FLOAT,false,0,0);gl.uniformMatrix4fv(mvpLoc,false,mat());gl.drawArrays(gl.TRIANGLES,0,vertices.length/3);gl.deleteBuffer(pb);gl.deleteBuffer(cb);requestAnimationFrame(draw);}
open.onclick=()=>{shell.classList.add('on');build();draw();};document.getElementById('fn3d-close').onclick=()=>shell.classList.remove('on');
canvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!drag)return;yaw+=(e.clientX-lx)*.008;pitch=Math.max(.2,Math.min(1.35,pitch+(e.clientY-ly)*.006));lx=e.clientX;ly=e.clientY;});
canvas.addEventListener('pointerup',()=>drag=false);canvas.addEventListener('pointercancel',()=>drag=false);
canvas.addEventListener('wheel',e=>{dist=Math.max(9,Math.min(28,dist+e.deltaY*.018));e.preventDefault();},{passive:false});
window.addEventListener('storage',e=>{if(e.key==='fn-farm-v1')build();});
})();