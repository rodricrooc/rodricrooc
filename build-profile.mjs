import fs from 'node:fs';
import path from 'node:path';

const out=process.argv[2]||'.';
fs.mkdirSync(out,{recursive:true});
const colors=['#355e3b','#477e43','#65964c','#93b568','#c5d78b','#d1d0c6','#a9bfd3'];
let seed=2917;
function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function escape(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
const glyphs={
A:['01110','10001','10001','11111','10001','10001','10001'],
B:['11110','10001','10001','11110','10001','10001','11110'],
C:['01111','10000','10000','10000','10000','10000','01111'],
D:['11110','10001','10001','10001','10001','10001','11110'],
E:['11111','10000','10000','11110','10000','10000','11111'],
F:['11111','10000','10000','11110','10000','10000','10000'],
G:['01111','10000','10000','10111','10001','10001','01110'],
H:['10001','10001','10001','11111','10001','10001','10001'],
I:['11111','00100','00100','00100','00100','00100','11111'],
J:['00111','00010','00010','00010','10010','10010','01100'],
K:['10001','10010','10100','11000','10100','10010','10001'],
L:['10000','10000','10000','10000','10000','10000','11111'],
M:['10001','11011','10101','10101','10001','10001','10001'],
N:['10001','11001','11001','10101','10011','10011','10001'],
O:['01110','10001','10001','10001','10001','10001','01110'],
P:['11110','10001','10001','11110','10000','10000','10000'],
Q:['01110','10001','10001','10001','10101','10010','01101'],
R:['11110','10001','10001','11110','10100','10010','10001'],
S:['01111','10000','10000','01110','00001','00001','11110'],
T:['11111','00100','00100','00100','00100','00100','00100'],
U:['10001','10001','10001','10001','10001','10001','01110'],
V:['10001','10001','10001','10001','10001','01010','00100'],
W:['10001','10001','10001','10101','10101','10101','01010'],
X:['10001','10001','01010','00100','01010','10001','10001'],
Y:['10001','10001','01010','00100','00100','00100','00100'],
Z:['11111','00001','00010','00100','01000','10000','11111'],
' ':['00000','00000','00000','00000','00000','00000','00000'],
'/':['00001','00001','00010','00100','01000','10000','10000'],
'_':['00000','00000','00000','00000','00000','00000','11111']
};
function pixel(text,x,y,size=4,fill='#ecebe3'){
 let d='';
 for(const [index,ch]of [...text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase()].entries()){
  const matrix=glyphs[ch]||glyphs[' '];
  matrix.forEach((row,iy)=>[...row].forEach((v,ix)=>{if(v==='1')d+='<rect x="'+(x+index*6*size+ix*size)+'" y="'+(y+iy*size)+'" width="'+size+'" height="'+size+'"/>';}));
 }
 return '<g fill="'+fill+'" shape-rendering="crispEdges">'+d+'</g>';
}
function display(text,x,y,size=4,fill='#ecebe3'){return '<g transform="translate('+x+' '+y+') scale(.84 1.24) translate('+(-x)+' '+(-y)+')">'+pixel(text,x,y,size,fill)+'</g>';}
function start(w,h,title,desc){return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-labelledby="title desc"><title id="title">'+escape(title)+'</title><desc id="desc">'+escape(desc)+'</desc><rect width="'+w+'" height="'+h+'" fill="#252725"/>';}
function mosaic(x,y,cols,rows,cell,density=.62){
 let v='<g shape-rendering="crispEdges">';
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)if(rand()<density){
  const col=colors[Math.floor(rand()*colors.length)];
  v+='<rect x="'+(x+c*cell)+'" y="'+(y+r*cell)+'" width="'+cell+'" height="'+cell+'" fill="'+col+'" opacity="'+(rand()>.8?.5:1)+'"/>';
 }
 return v+'</g>';
}
let hero=start(1200,360,'rodricrooc · Ingeniero Civil Informático','Banner original de estética retro con letras de píxeles y mosaico verde.');
hero+=display('RODRICROOC',42,37,9);
hero+='<text x="1158" y="63" fill="#a6b698" text-anchor="end" font-family="monospace" font-size="17" letter-spacing="2">ENGINEERING / WEB / CINEMA</text>';
hero+=mosaic(0,136,50,6,24,.68);
hero+='<rect x="824" y="122" width="278" height="174" fill="#252725"/><g fill="none" stroke="#d6d7ca" stroke-width="9" shape-rendering="crispEdges"><path d="M847 144h232v120H847zM915 289h97M963 265v24"/><path d="m880 185 18 17-18 17m76-34-18 34" stroke="#b5d786"/></g><rect x="976" y="214" width="28" height="7" fill="#b5d786"><animate attributeName="opacity" values="1;1;0;0;1" dur="2s" repeatCount="indefinite"/></rect>';
hero+=pixel('INGENIERO CIVIL INFORMATICO',42,312,3);
hero+='<text x="1158" y="334" text-anchor="end" fill="#a6b698" font-size="16" font-family="monospace">DE LA IDEA A LA PANTALLA</text></svg>';
fs.writeFileSync(path.join(out,'banner.svg'),hero);
let mobileHero=start(600,360,'rodricrooc · Ingeniero Civil Informático','Banner retro adaptado para celular.');
mobileHero+=display('RODRICROOC',30,30,8);
mobileHero+=mosaic(0,120,25,6,24,.65);
mobileHero+='<rect x="30" y="272" width="540" height="65" fill="#252725"/><text x="30" y="302" font-family="monospace" font-size="26" fill="#ecebe3">INGENIERO CIVIL INFORMÁTICO</text><text x="30" y="333" font-family="monospace" font-size="20" fill="#c5d78b">CÓDIGO / DISEÑO / CINE</text></svg>';
fs.writeFileSync(path.join(out,'banner-mobile.svg'),mobileHero);

const sections=[
 ['QUIEN SOY','Soy @rodricrooc, ingeniero civil informático. Me gusta construir productos donde la lógica, el diseño y una buena idea se encuentran.'],
 ['LO QUE HAGO','Desarrollo experiencias web de principio a fin: interfaces que se sienten bien, código con intención y soluciones que salen del prototipo.'],
 ['MI VISION','Crear cosas que den ganas de usar. Seguir aprendiendo, cuidar los detalles y transformar cada idea en una experiencia con identidad.'],
 ['FUERA DEL EDITOR','El cine también es parte de lo que construyo. Así nace Frame: de las ganas de descubrir historias y compartir una buena película.']
];
function wrap(s,limit){const result=[];let line='';for(const word of s.split(' ')){if((line+' '+word).trim().length>limit){result.push(line);line=word;}else line=(line+' '+word).trim();}if(line)result.push(line);return result;}
function about(mobile){
 const width=mobile?600:1200,pad=mobile?30:40,sz=mobile?23:25,lh=mobile?35:37;
 let items=[],y=mobile?37:42;
 for(let i=0;i<sections.length;i++){
  const [title,body]=sections[i],heading=display(title,pad,y,mobile?3:4);
  const lineY=y+(mobile?60:70),lines=wrap(body,mobile?38:72);
  let item='<text x="'+pad+'" y="'+(y-13)+'" fill="#9bae88" font-size="13" font-family="monospace" letter-spacing="2">0'+(i+1)+' /</text>'+heading;
  item+=mosaic(mobile?440:840,y+4,mobile?5:13,1,mobile?20:24,.65);
  for(let n=0;n<lines.length;n++)item+='<text x="'+pad+'" y="'+(lineY+n*lh)+'" font-family="ui-monospace, SFMono-Regular, Consolas, monospace" font-size="'+sz+'" fill="#e0e0d5">'+escape(lines[n])+'</text>';
  y=lineY+(lines.length-1)*lh+(mobile?62:65);items.push(item);
 }
 return start(width,y-15,'Sobre rodricrooc',sections.map(([t,b])=>t+': '+b).join(' '))+items.join('')+'</svg>';
}
fs.writeFileSync(path.join(out,'about.svg'),about(false));
fs.writeFileSync(path.join(out,'about-mobile.svg'),about(true));
let stack=start(1200,100,'Tecnologías en mis proyectos','Herramientas utilizadas en mis proyectos, sin indicar un nivel de dominio.');
stack+=pixel('TECNOLOGIAS',40,35,4)+mosaic(648,37,23,1,24,.7)+'</svg>';
fs.writeFileSync(path.join(out,'stack.svg'),stack);
let footer=start(1200,96,'Seguir aprendiendo. Seguir construyendo.','Cierre decorativo del perfil.');
footer+=mosaic(0,0,16,4,24,.55)+pixel('SEGUIR CONSTRUYENDO',440,36,3,'#c5d78b')+'</svg>';
fs.writeFileSync(path.join(out,'footer.svg'),footer);


function header(title,file){
 for(const mobile of [false,true]){
  const w=mobile?600:1200,h=mobile?86:100,x=mobile?28:40,s=mobile?3:4;
  const svg=start(w,h,title,'Encabezado decorativo de la sección '+title)+display(title,x,mobile?31:35,s)+mosaic(mobile?390:790,mobile?32:37,mobile?8:15,1,mobile?22:24,.7)+'</svg>';
  fs.writeFileSync(path.join(out,file+(mobile?'-mobile':'')+'.svg'),svg);
 }
}
header('ACTIVIDAD','activity');
header('TECNOLOGIAS','stack');
header('BIBLIOTECA','library');
header('PROYECTOS','projects');
header('CONECTEMOS','connect');
header('SNAKE MODE','snake-heading');

let footerMobile=start(600,96,'Seguir construyendo','Píxeles verdes y un mensaje de cierre.');
footerMobile+=mosaic(0,0,7,4,24,.5)+pixel('SEGUIR CONSTRUYENDO',216,37,3,'#c5d78b')+'</svg>';
fs.writeFileSync(path.join(out,'footer-mobile.svg'),footerMobile);

for(const item of [
 {file:'book-git.svg',text:'GIT',label:'PRO GIT',sub:'CONTROL DE VERSIONES',accent:'#93b568'},
 {file:'book-typescript.svg',text:'TS',label:'TYPESCRIPT',sub:'THE HANDBOOK',accent:'#a9bfd3'},
 {file:'book-react.svg',text:'REACT',label:'LEARN REACT',sub:'COMPONENTES E INTERFACES',accent:'#c5d78b'}
]){
 let svg=start(360,390,item.label,item.sub);
 svg+='<rect x="20" y="16" width="320" height="354" fill="#303630" stroke="#52624a" stroke-width="2"/><rect x="20" y="16" width="14" height="354" fill="'+item.accent+'"/>';
 svg+=mosaic(34,50,12,3,24,.6);
 let cell=item.text==='REACT'?7:12;
 let x=180-(item.text.length*6-1)*cell/2;
 svg+=pixel(item.text,x,180,cell,item.accent);
 svg+='<text x="53" y="324" font-family="monospace" font-size="20" fill="#ecebe3">'+item.label+'</text><text x="53" y="349" font-family="monospace" font-size="13" fill="#adb5a3">LECTURA ABIERTA / ONLINE</text></svg>';
 fs.writeFileSync(path.join(out,item.file),svg);
}

for(const mobile of [false,true]){
 const w=mobile?600:1200,h=mobile?260:220;
 let svg=start(w,h,'Ideas que se convierten en proyectos','Ilustración original de una planta de píxeles y un terminal.');
 svg+='<g shape-rendering="crispEdges"><path d="M58 134h112v14H58zm14 14h84v63H72z" fill="#d1d0c6"/><path d="M107 68h14v66h-14zM79 68h28v14H79zM65 54h28v14H65zM121 40h28v14h-28zM135 26h28v14h-28zM121 54h14v14h-14z" fill="#93b568"/><path d="M107 40h14v28h-14zM93 26h14v28H93z" fill="#c5d78b"/></g>';
 if(mobile){svg+=pixel('IDEAS',240,65,5)+pixel('EN CODIGO',240,115,4);svg+='<text x="240" y="182" font-size="22" font-family="monospace" fill="#e0e0d5">APRENDER. CREAR.</text>';}
 else{svg+=pixel('IDEAS QUE SE CONVIERTEN',260,64,4)+pixel('EN PROYECTOS',260,117,4);svg+='<text x="260" y="181" font-size="23" font-family="monospace" fill="#adb5a3">APRENDER. CREAR. COMPARTIR.</text>';svg+=mosaic(1020,0,8,9,24,.45);}
 svg+='</svg>';
 fs.writeFileSync(path.join(out,'connect-art'+(mobile?'-mobile':'')+'.svg'),svg);
}

function picture(file,alt){return '<picture>\n  <source media="(max-width: 600px)" srcset="./'+file+'-mobile.svg" />\n  <img src="./'+file+'.svg" width="100%" alt="'+alt+'" />\n</picture>';}
function badge(text,target,logo='github'){return '<a href="'+target+'"><img src="https://img.shields.io/badge/'+text+'-252725?style=for-the-badge&amp;logo='+logo+'&amp;logoColor=c5d78b" alt="'+text.replaceAll('_',' ')+'" /></a>';}
const complete=[
'<!-- @rodricrooc · Diseño original de píxeles verdes. Las estadísticas se generan a partir de contribuciones reales. -->',
picture('banner','rodricrooc · Ingeniero Civil Informático. Ideas, código y soluciones.'),
'',
picture('about','Quién soy: ingeniero civil informático. Qué construyo: aplicaciones web y experiencias digitales. Mi visión: tecnología que aporte valor a las personas. Más allá del código: aprender, construir, probar y mejorar.'),
'',
'<p align="center">',
badge('GITHUB','https://github.com/rodricrooc'),
badge('REPOSITORIOS','https://github.com/rodricrooc?tab=repositories'),
badge('INSPIRACION','https://github.com/rodricrooc?tab=stars'),
badge('CONVERSEMOS','https://github.com/rodricrooc/rodricrooc/issues/new'),
'</p>',
'',
picture('activity','Actividad · Calendario de contribuciones en 3D'),
'',
'<p align="center"><samp>Cada contribución cuenta.</samp></p>',
'',
'<p align="center"><img src="./profile-3d-contrib/profile-night-green.svg" width="100%" alt="Calendario 3D de las contribuciones reales de rodricrooc en GitHub" /></p>',
'',
picture('stack','Tecnologías y herramientas presentes en mis proyectos'),
'',
'<p align="center"><samp>Interfaces · Aplicaciones web · Herramientas de desarrollo</samp></p>',
'',
'<p align="center"><img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs&amp;theme=dark&amp;perline=6" alt="HTML, CSS, JavaScript, TypeScript, React y Next.js" /></p>',
'<p align="center"><samp>HTML · CSS · JavaScript · TypeScript · React · Next.js</samp></p>',
'<p align="center"><img src="https://skillicons.dev/icons?i=tailwind,nodejs,vite,cloudflare,git,github&amp;theme=dark&amp;perline=6" alt="Tailwind CSS, Node.js, Vite, Cloudflare, Git y GitHub" /></p>',
'<p align="center"><samp>Tailwind CSS · Node.js · Vite · Cloudflare · Git · GitHub</samp></p>',
'',
picture('projects','Proyectos · Lo que construyo'),
'',
'### [Este perfil, por dentro](https://github.com/rodricrooc/rodricrooc)',
'',
'<samp>Identidad visual retro, ilustraciones originales en SVG, variantes para celular y gráficos de contribuciones que se actualizan automáticamente.</samp>',
'',
'[Explorar el código](https://github.com/rodricrooc/rodricrooc) · [Ver todos mis repositorios públicos](https://github.com/rodricrooc?tab=repositories)',
'',
picture('library','Biblioteca · Lecturas y recursos para seguir aprendiendo'),
'',
'<p align="center"><samp>Recursos abiertos para seguir construyendo.</samp></p>',
'',
'<p align="center">',
'  <a href="https://git-scm.com/book/es/v2"><img src="./book-git.svg" width="30%" alt="Leer Pro Git, de Scott Chacon y Ben Straub, gratis en español" /></a>',
'  <a href="https://www.typescriptlang.org/docs/handbook/intro.html"><img src="./book-typescript.svg" width="30%" alt="Abrir The TypeScript Handbook" /></a>',
'  <a href="https://react.dev/learn"><img src="./book-react.svg" width="30%" alt="Abrir Learn React, la documentación oficial" /></a>',
'</p>',
'',
'[Pro Git](https://git-scm.com/book/es/v2) · [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) · [Learn React](https://react.dev/learn)',
'',
picture('snake-heading','Snake mode · Mis contribuciones en movimiento'),
'',
'<picture>',
'  <source media="(prefers-color-scheme: dark)" srcset="./dist/github-snake-dark.svg" />',
'  <source media="(prefers-color-scheme: light)" srcset="./dist/github-snake.svg" />',
'  <img src="./dist/github-snake.svg" width="100%" alt="Serpiente animada que recorre las contribuciones reales de rodricrooc" />',
'</picture>',
'',
picture('connect','Conectemos'),
'',
picture('connect-art','Ideas que se convierten en proyectos. Aprender, crear y compartir.'),
'',
'<p align="center"><samp>¿Una idea, una pregunta o algo que construir?</samp></p>',
'<p align="center">'+badge('ABRIR_CONVERSACION','https://github.com/rodricrooc/rodricrooc/issues/new')+'</p>',
'',
picture('footer','Seguir aprendiendo. Seguir construyendo.'),
'',
'<details>',
'<summary>Créditos y recursos</summary>',
'',
'Ilustraciones y diseño de este perfil creados para @rodricrooc. Iconos: [Skill Icons](https://skillicons.dev). Insignias: [Shields.io](https://shields.io). Calendario 3D: [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib). Animación: [snk](https://github.com/Platane/snk).',
'',
'</details>',
''
].join('\n');
fs.writeFileSync(path.join(out,'README.md'),complete);
console.log('Perfil completo generado en '+path.resolve(out));


header('LOGROS','achievements');

for(const [name,draw]of [
 ['email','<rect x="18" y="29" width="60" height="40" rx="2"/><path d="m20 32 28 23 28-23M19 67l20-19m38 19L57 48"/>'],
 ['frame','<rect x="18" y="21" width="60" height="56" rx="2"/><path d="M30 21v56m36-56v56M18 35h12m-12 14h12m-12 14h12m36-28h12M66 49h12M66 63h12"/><path d="m42 37 16 12-16 12z" fill="#c5d78b" stroke="none"/>'],
 ['github','<path d="M48 23v49M25 29v15c0 8 23 7 23 17m23-32v15c0 8-23 7-23 17"/><circle cx="25" cy="23" r="7" fill="#252725"/><circle cx="71" cy="23" r="7" fill="#252725"/><circle cx="48" cy="76" r="7" fill="#252725"/>']
]){
 const svg=start(96,96,'Conectar por '+name,'Icono original de '+name)+'<rect x="5" y="5" width="86" height="86" rx="16" fill="#303630" stroke="#52624a"/><g fill="none" stroke="#c5d78b" stroke-width="4" stroke-linejoin="round">'+draw+'</g></svg>';
 fs.writeFileSync(path.join(out,'social-'+name+'.svg'),svg);
}
for(const mobile of [false,true]){
 const w=mobile?600:1200,h=mobile?440:340;
 let svg=start(w,h,'Frame · Cine social','Un proyecto de @rodricrooc. Descubrir películas, organizar una biblioteca y compartir historias.');
 svg+='<rect x="0" y="0" width="'+w+'" height="12" fill="#c5d78b"/>';
 svg+=display('FRAME',mobile?32:45,mobile?57:49,mobile?11:13,'#c5d78b');
 svg+='<text x="'+(mobile?32:45)+'" y="'+(mobile?199:203)+'" fill="#ecebe3" font-family="monospace" font-size="'+(mobile?24:28)+'">CINE SOCIAL. A TU MANERA.</text>';
 svg+='<text x="'+(mobile?32:45)+'" y="'+(mobile?242:250)+'" fill="#aebba3" font-family="monospace" font-size="'+(mobile?20:22)+'">Un proyecto de @rodricrooc.</text>';
 const sx=mobile?32:755,sy=mobile?289:52,ww=mobile?535:400;
 svg+='<rect x="'+sx+'" y="'+sy+'" width="'+ww+'" height="'+(mobile?113:216)+'" fill="#303630" stroke="#52624a" stroke-width="2"/>';
 for(let k=0;k<3;k++){
  const cx=sx+18+k*(mobile?173:125),cy=sy+20,bw=mobile?145:105,bh=mobile?55:145;
  svg+='<rect x="'+cx+'" y="'+cy+'" width="'+bw+'" height="'+bh+'" fill="'+['#477e43','#a9bfd3','#c5d78b'][k]+'"/><rect x="'+cx+'" y="'+(cy+bh+12)+'" width="'+bw*.7+'" height="4" fill="#aebba3"/>';
 }
 if(!mobile)svg+=mosaic(0,292,50,2,24,.25);
 svg+='</svg>';
 fs.writeFileSync(path.join(out,'frame-project'+(mobile?'-mobile':'')+'.svg'),svg);
}

let polished=fs.readFileSync(path.join(out,'README.md'),'utf8');
const aboutAlt=sections.map(([t,b])=>t+': '+b).join(' ');
polished=polished.replace(/alt="Quién soy:[^"]*"/,'alt="'+aboutAlt+'"');
polished=polished.replace(picture('banner','rodricrooc · Ingeniero Civil Informático. Ideas, código y soluciones.'),picture('banner','rodricrooc · Ingeniero Civil Informático. Código, diseño y cine.')+'\n\n<p align="center"><samp><b>El código es el medio. Crear algo que importe es la idea.</b></samp></p>');
const socials=[
'<table align="center">',
'<tr>',
'<td align="center" width="180"><a href="mailto:rodri.crooc@gmail.com"><img src="./social-email.svg" width="64" alt="Enviar un correo a rodri.crooc@gmail.com" /><br /><samp>GMAIL</samp></a></td>',
'<td align="center" width="180"><a href="https://frame.sotos.workers.dev/"><img src="./social-frame.svg" width="64" alt="Visitar Frame, mi página publicada de cine" /><br /><samp>FRAME / CINE</samp></a></td>',
'<td align="center" width="180"><a href="https://github.com/rodricrooc"><img src="./social-github.svg" width="64" alt="Mi perfil de GitHub" /><br /><samp>GITHUB</samp></a></td>',
'</tr>',
'</table>',
'<p align="center"><samp><a href="mailto:rodri.crooc@gmail.com">rodri.crooc@gmail.com</a> · <a href="https://frame.sotos.workers.dev/">Visitar Frame</a></samp></p>',
'',
picture('achievements','Logros · Mis insignias oficiales de GitHub'),
'',
'<p align="center"><a href="https://github.com/rodricrooc?achievement=pull-shark&amp;tab=achievements"><img src="https://github.githubassets.com/assets/pull-shark-bronze-a37accb528d1.png" width="116" alt="Logro oficial Pull Shark, nivel x2" /></a> <a href="https://github.com/rodricrooc?achievement=yolo&amp;tab=achievements"><img src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" width="116" alt="Logro oficial YOLO" /></a></p>',
'<p align="center"><samp><b>Pull Shark ×2</b> · <b>YOLO</b></samp></p>',
'<p align="center"><samp>Pequeños hitos. Proyectos reales. Un paso más en cada commit.</samp></p>',
'<p align="center"><a href="https://github.com/rodricrooc?tab=achievements">Ver mis logros en GitHub</a></p>',
''
].join('\n');
const socialBlock=/<p align="center">\n<a href="https:\/\/github.com\/rodricrooc">[\s\S]*?<\/p>/;
if(!socialBlock.test(polished))throw new Error('Could not find old social block');
polished=polished.replace(socialBlock,socials);
const oldProject=/### \[Este perfil, por dentro\][\s\S]*?(?=<picture>\n  <source media="\(max-width: 600px\)" srcset="\.\/library-mobile.svg")/;
if(!oldProject.test(polished))throw new Error('Could not find old project section');
polished=polished.replace(oldProject,[
'<a href="https://frame.sotos.workers.dev/">',
picture('frame-project','Frame · Mi proyecto publicado de cine social. Visitar la web.'),
'</a>',
'',
'### [Frame — Tu cine. Tus historias. Tu comunidad.](https://frame.sotos.workers.dev/)',
'',
'<samp>Mi proyecto de cine social: un lugar para descubrir películas, organizar tu biblioteca y compartir lo que te deja cada historia. Del diseño de la interfaz al código que le da vida.</samp>',
'',
'<p><samp><b>React · TypeScript · Next.js · Cloudflare</b></samp></p>',
'<p>'+badge('VISITAR_FRAME','https://frame.sotos.workers.dev/','themoviedatabase')+'</p>',
'',
'<details>',
'<summary>También construí la identidad visual de este perfil</summary>',
'',
'Ilustraciones originales en SVG, tipografía de píxeles, versiones para celular y gráficos de contribuciones que se actualizan cada día.',
'',
'[Ver el código del perfil](https://github.com/rodricrooc/rodricrooc)',
'',
'</details>',
'',
].join('\n'));
polished=polished.replace('¿Una idea, una pregunta o algo que construir?','¿La próxima buena idea? Puede empezar con un correo.');
polished=polished.replace(/<p align="center"><a href="https:\/\/github.com\/rodricrooc\/rodricrooc\/issues\/new"><img[^>]+alt="ABRIR CONVERSACION" \/><\/a><\/p>/,'<p align="center">'+badge('ESCRIBEME','mailto:rodri.crooc@gmail.com','gmail')+' '+badge('VISITA_FRAME','https://frame.sotos.workers.dev/','themoviedatabase')+'</p>');
fs.writeFileSync(path.join(out,'README.md'),polished);
console.log('Redes, Frame, logros y textos actualizados.');

