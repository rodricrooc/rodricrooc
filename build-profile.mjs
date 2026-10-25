import fs from 'node:fs';
import path from 'node:path';

// Self-contained GitHub README artwork. Text is native Markdown; image variants
// handle narrow screens. No browser JS, remote fonts or custom README CSS.
const out=process.argv[2]||'.';
fs.mkdirSync(out,{recursive:true});
const C={bg:'#080f0c',panel:'#0b1511',border:'#1f4938',ink:'#e3eee7',muted:'#9ab4a4',green:'#65edb5',dim:'#38785d'};
const mono='ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace';
const wm={"units":1000,"glyphs":{"R":{"d":"M95,0L95,690L416,690Q560,690 560,546L560,438Q560,305 438,295L580,14L573,0L534,0L385,294L143,294L143,0ZM143,338L422,338Q512,338 512,429L512,556Q512,646 422,646L143,646Z","advance":635},"O":{"d":"M85,144L85,546Q85,690 229,690L466,690Q610,690 610,546L610,144Q610,0 466,0L229,0Q85,0 85,144ZM133,134Q133,44 224,44L472,44Q562,44 562,134L562,556Q562,646 472,646L224,646Q133,646 133,556Z","advance":695},"D":{"d":"M95,0L95,690L370,690Q600,690 600,459L600,231Q600,0 370,0ZM143,44L373,44Q552,44 552,223L552,467Q552,646 373,646L143,646Z","advance":675},"I":{"d":"M95,0L95,690L143,690L143,0Z","advance":238},"C":{"d":"M85,144L85,546Q85,690 229,690L520,690L552,665L552,646L224,646Q133,646 133,556L133,134Q133,44 224,44L552,44L552,25L520,0L229,0Q85,0 85,144Z","advance":602},"F":{"d":"M95,0L95,690L532,690L532,646L143,646L143,358L502,358L502,314L143,314L143,0Z","advance":562},"A":{"d":"M21,13L260,690L349,690L587,13L579,0L540,0L474,194L134,194L68,0L30,0ZM151,238L458,238L319,646L290,646Z","advance":608},"M":{"d":"M95,0L95,690L169,690L422,154L674,690L748,690L748,0L700,0L700,641L449,106L394,106L143,641L143,0Z","advance":843},"E":{"d":"M95,0L95,690L532,690L532,646L143,646L143,388L502,388L502,344L143,344L143,44L532,44L532,0Z","advance":582}}};
const icons={"html":{"label":"HTML","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#E44D26\" d=\"M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z\"/><path fill=\"#F16529\" d=\"M64 116.8l36.378-10.086 8.559-95.878H64z\"/><path fill=\"#EBEBEB\" d=\"M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z\"/><path fill=\"#fff\" d=\"M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z\"/></svg>"},"css":{"label":"CSS","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#1572B6\" d=\"M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z\"/><path fill=\"#33A9DC\" d=\"M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z\"/><path fill=\"#fff\" d=\"M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z\"/><path fill=\"#EBEBEB\" d=\"M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z\"/><path fill=\"#fff\" d=\"M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z\"/><path fill=\"#EBEBEB\" d=\"M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z\"/></svg>"},"javascript":{"label":"JavaScript","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#F0DB4F\" d=\"M1.408 1.408h125.184v125.185H1.408z\"/><path fill=\"#323330\" d=\"M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z\"/></svg>"},"typescript":{"label":"TypeScript","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#fff\" d=\"M22.67 47h99.67v73.67H22.67z\"/><path data-name=\"original\" fill=\"#007acc\" d=\"M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z\"/></svg>"},"react":{"label":"React","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><g fill=\"#61DAFB\"><circle cx=\"64\" cy=\"64\" r=\"11.4\"/><path d=\"M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z\"/></g></svg>"},"nextjs":{"label":"Next.js","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><circle cx=\"64\" cy=\"64\" r=\"64\"/><path fill=\"url(#a)\" d=\"M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z\"/><path fill=\"url(#b)\" d=\"M81.778 38.4h8.533v51.2h-8.533z\"/><defs><linearGradient id=\"a\" x1=\"109\" x2=\"144.5\" y1=\"116.5\" y2=\"160.5\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient><linearGradient id=\"b\" x1=\"121\" x2=\"120.799\" y1=\"54\" y2=\"106.875\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs></svg>\n"},"tailwind":{"label":"Tailwind CSS","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path d=\"M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0\" fill=\"#38bdf8\"/></svg>\n"},"nodejs":{"label":"Node.js","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"url(#a)\" d=\"M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z\"/><path fill=\"url(#b)\" d=\"M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z\"/><path fill=\"url(#c)\" d=\"M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z\"/><defs><linearGradient id=\"a\" x1=\"34.513\" x2=\"27.157\" y1=\"15.535\" y2=\"30.448\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#3F873F\"/><stop offset=\".33\" stop-color=\"#3F8B3D\"/><stop offset=\".637\" stop-color=\"#3E9638\"/><stop offset=\".934\" stop-color=\"#3DA92E\"/><stop offset=\"1\" stop-color=\"#3DAE2B\"/></linearGradient><linearGradient id=\"b\" x1=\"30.009\" x2=\"50.533\" y1=\"23.359\" y2=\"8.288\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".138\" stop-color=\"#3F873F\"/><stop offset=\".402\" stop-color=\"#52A044\"/><stop offset=\".713\" stop-color=\"#64B749\"/><stop offset=\".908\" stop-color=\"#6ABF4B\"/></linearGradient><linearGradient id=\"c\" x1=\"21.917\" x2=\"40.555\" y1=\"22.261\" y2=\"22.261\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".092\" stop-color=\"#6ABF4B\"/><stop offset=\".287\" stop-color=\"#64B749\"/><stop offset=\".598\" stop-color=\"#52A044\"/><stop offset=\".862\" stop-color=\"#3F873F\"/></linearGradient></defs></svg>\n"},"vite":{"label":"Vite","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><defs><linearGradient id=\"a\" x1=\"6\" x2=\"235\" y1=\"33\" y2=\"344\" gradientTransform=\"translate(0 .937) scale(.3122)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#41d1ff\"/><stop offset=\"1\" stop-color=\"#bd34fe\"/></linearGradient><linearGradient id=\"b\" x1=\"194.651\" x2=\"236.076\" y1=\"8.818\" y2=\"292.989\" gradientTransform=\"translate(0 .937) scale(.3122)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#ffea83\"/><stop offset=\".083\" stop-color=\"#ffdd35\"/><stop offset=\"1\" stop-color=\"#ffa800\"/></linearGradient></defs><path fill=\"url(#a)\" d=\"M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0\"/><path fill=\"url(#b)\" d=\"M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0\"/></svg>\n"},"cloudflare":{"label":"Cloudflare","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#FFF\" d=\"m115.679 69.288-15.591-8.94-2.689-1.163-63.781.436v32.381h82.061z\"/><path fill=\"#F38020\" d=\"M87.295 89.022c.763-2.617.472-5.015-.8-6.796-1.163-1.635-3.125-2.58-5.488-2.689l-44.737-.581c-.291 0-.545-.145-.691-.363s-.182-.509-.109-.8c.145-.436.581-.763 1.054-.8l45.137-.581c5.342-.254 11.157-4.579 13.192-9.885l2.58-6.723c.109-.291.145-.581.073-.872-2.906-13.158-14.644-22.97-28.672-22.97-12.938 0-23.913 8.359-27.838 19.952a13.35 13.35 0 0 0-9.267-2.58c-6.215.618-11.193 5.597-11.811 11.811-.145 1.599-.036 3.162.327 4.615C10.104 70.051 2 78.337 2 88.549c0 .909.073 1.817.182 2.726a.895.895 0 0 0 .872.763h82.57c.472 0 .909-.327 1.054-.8l.617-2.216z\"/><path fill=\"#FAAE40\" d=\"M101.542 60.275c-.4 0-.836 0-1.236.036-.291 0-.545.218-.654.509l-1.744 6.069c-.763 2.617-.472 5.015.8 6.796 1.163 1.635 3.125 2.58 5.488 2.689l9.522.581c.291 0 .545.145.691.363.145.218.182.545.109.8-.145.436-.581.763-1.054.8l-9.924.582c-5.379.254-11.157 4.579-13.192 9.885l-.727 1.853c-.145.363.109.727.509.727h34.089c.4 0 .763-.254.872-.654.581-2.108.909-4.325.909-6.614 0-13.447-10.975-24.422-24.458-24.422\"/></svg>"},"git":{"label":"Git","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#F34F29\" d=\"M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z\"/></svg>"},"github":{"label":"GitHub","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><g fill=\"#181616\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z\"/><path d=\"M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0\"/></g></svg>"}};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const txt=(s,x,y,size=22,fill=C.ink,attr='')=>'<text x="'+x+'" y="'+y+'" fill="'+fill+'" font-family="'+mono+'" font-size="'+size+'" '+attr+'>'+esc(s)+'</text>';
function svg(w,h,title,description,art,defs=''){
 return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-labelledby="title desc"><title id="title">'+esc(title)+'</title><desc id="desc">'+esc(description)+'</desc><defs>'+defs+'</defs>'+art+'</svg>';
}
function save(name,s){fs.writeFileSync(path.join(out,name+'.svg'),s);}
function pair(name,render){for(const mobile of [false,true])save(name+(mobile?'-mobile':''),render(mobile));}
function picture(name,alt){
 return '<picture>\n  <source media="(max-width: 767px)" srcset="./'+name+'-mobile.svg" />\n  <img src="./'+name+'.svg" width="100%" alt="'+esc(alt)+'" />\n</picture>';
}
const linked=(url,name,alt)=>'<a href="'+url+'">\n'+picture(name,alt)+'\n</a>';

// Oxanium outlines: same wordmark on every device, without external font loading.
// Copyright 2019 The Oxanium Project Authors; SIL Open Font License 1.1.
// Source: https://github.com/google/fonts/tree/main/ofl/oxanium
function wordmark(label,x,baseline,maxWidth,maxHeight,fill=C.ink){
 const gap=55,total=[...label].reduce((n,c)=>n+wm.glyphs[c].advance+gap,0)-gap;
 const scale=Math.min(maxWidth/total,maxHeight/720);let dx=0,paths='';
 for(const ch of label){const g=wm.glyphs[ch];paths+='<path d="'+g.d+'" transform="translate('+dx+' 0)"/>';dx+=g.advance+gap;}
 return '<g aria-hidden="true" transform="translate('+x+' '+baseline+') scale('+scale+' '+(-scale)+')" fill="'+fill+'" stroke="'+fill+'" stroke-width="45" stroke-linejoin="round">'+paths+'</g>';
}
function banner(mobile){
 const w=mobile?480:1200,h=mobile?330:374,p=mobile?28:44;
 let seed=mobile?492:917;
 const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const chars=[...'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
 const cols=mobile?19:45,gap=w/cols,line=22;
 let rain='<g class="rain" aria-hidden="true" text-anchor="middle">';
 for(let c=0;c<cols;c++){
  const n=12+Math.floor(rnd()*11),tail=n*line,dur=7+rnd()*6;
  rain+='<g><animateTransform attributeName="transform" type="translate" values="0 '+(-tail)+';0 '+(h+line)+'" dur="'+dur.toFixed(2)+'s" begin="-'+(rnd()*dur).toFixed(2)+'s" repeatCount="indefinite"/>';
  for(let k=0;k<n;k++)rain+=txt(chars[Math.floor(rnd()*chars.length)],((c+.5)*gap).toFixed(1),k*line,17,k===n-1?'#bdf8d7':'#26b37a','opacity="'+(.1+.46*(k+1)/n).toFixed(2)+'"');
  rain+='</g>';
 }
 rain+='</g>';
 let art='<style>@media(prefers-reduced-motion:reduce){.rain{display:none}}</style>';
 art+='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="12" fill="'+C.bg+'" stroke="'+C.border+'"/>';
 art+='<g clip-path="url(#clip)">'+rain+'<rect width="'+w+'" height="'+h+'" fill="url(#shade)"/></g>';
 art+=txt('> RODRICROOC.EXE',p,mobile?43:42,mobile?18:17,C.green,'letter-spacing="1"');
 art+=wordmark('RODRICROOC',p,mobile?129:177,w-2*p,mobile?68:112,'#dcffe9');
 if(mobile){
  art+=txt('Ingeniero Civil',p,181,26,C.ink);
  art+=txt('Informático',p,215,26,C.ink);
 }else art+=txt('Ingeniero Civil Informático',p,231,30,C.ink,'letter-spacing="1.2"');
 art+='<path d="M'+p+' '+(mobile?243:266)+'h40" stroke="'+C.green+'" stroke-width="2"/>';
 art+=txt('Follow the white rabbit.',p,mobile?285:313,mobile?24:27,C.ink);
 return svg(w,h,'RODRICROOC · Ingeniero Civil Informático','Follow the white rabbit. Cabecera Matrix Signal con tipografía Oxanium y lluvia de caracteres. La animación respeta el movimiento reducido.',art,'<clipPath id="clip"><rect x="2" y="2" width="'+(w-4)+'" height="'+(h-4)+'" rx="12"/></clipPath><linearGradient id="shade"><stop stop-color="#080f0c" stop-opacity=".97"/><stop offset=".48" stop-color="#080f0c" stop-opacity=".88"/><stop offset="1" stop-color="#080f0c" stop-opacity=".1"/></linearGradient>');
}
pair('banner',banner);

// Original vector cinema scene: no stock imagery, no external image request.
function cinema(x,y,w,h,prefix){
 let art='<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" viewBox="0 0 620 360" preserveAspectRatio="xMidYMid slice">';
 art+='<defs><linearGradient id="'+prefix+'room" x2="0" y2="1"><stop stop-color="#07150e"/><stop offset="1" stop-color="#020906"/></linearGradient><radialGradient id="'+prefix+'screen"><stop stop-color="#c5f4ca"/><stop offset=".4" stop-color="#5eb083"/><stop offset="1" stop-color="#0c3c2c"/></radialGradient><linearGradient id="'+prefix+'seat" x2="0" y2="1"><stop stop-color="#194c35"/><stop offset=".2" stop-color="#0b3021"/><stop offset="1" stop-color="#020a06"/></linearGradient><linearGradient id="'+prefix+'beam" x2="0" y2="1"><stop stop-color="#83e1ac" stop-opacity=".16"/><stop offset="1" stop-color="#82d7a6" stop-opacity="0"/></linearGradient></defs>';
 art+='<rect width="620" height="360" fill="url(#'+prefix+'room)"/><path d="M145 46 482 32v170l-337 13z" fill="#286b49" opacity=".32"/><path d="M153 53 475 41v153l-322 13z" fill="url(#'+prefix+'screen)"/>';
 art+='<g fill="none" stroke="#e2ffeb" stroke-opacity=".12"><path d="m155 142 70-73 58 56 62-53 130 74"/><path d="M155 173 276 94l68 86 131-73"/></g>';
 art+='<path d="M153 206 42 359h558L475 194z" fill="url(#'+prefix+'beam)"/>';
 for(let side=0;side<2;side++)for(let r=0;r<11;r++)art+='<rect x="'+(side?492:125)+'" y="'+(48+r*15)+'" width="9" height="7" fill="#6cc59a" opacity="'+(.18+(r%3)*.12)+'"/>';
 for(let row=0;row<5;row++){
  const by=225+row*29,seatW=42+row*9,start=-18-row*25;
  for(let col=0;col<13;col++){
   const sx=start+col*(seatW+7);
   art+='<path d="M'+sx+' '+(by+28)+'v-15q0-13 13-13h'+(seatW-26)+'q13 0 13 13v15z" fill="url(#'+prefix+'seat)" stroke="#256141" stroke-width="1.2"/>';
  }
 }
 art+='<path d="M240 360v-35q4-43 42-49l7-20q-17-15-15-36 1-25 29-27 29-1 31 27 2 23-13 36l7 20q38 7 43 49v35z" fill="#030d08"/><path d="M284 205q13-17 31-5" stroke="#2d6347" stroke-width="2" fill="none"/>';
 art+='</svg>';return art;
}
function frameProject(mobile){
 const w=mobile?480:1200,h=mobile?648:366,p=mobile?24:36;
 let art='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="12" fill="'+C.panel+'" stroke="'+C.border+'"/>';
 if(mobile){
  art+=cinema(2,2,w-4,252,'film');
  art+=wordmark('FRAME',p,318,266,45,C.ink);
  art+=txt('Tu cine. Tus historias.',p,355,24);
  art+=txt('Tu comunidad.',p,386,24);
  art+=txt('Descubre películas.',p,429,27,C.muted);
  art+=txt('Organiza tu biblioteca.',p,462,27,C.muted);
  art+=txt('Comparte historias.',p,495,27,C.muted);
  art+=txt('React · TypeScript',p,536,22,C.green);
  art+=txt('Next.js · Cloudflare',p,565,22,C.green);
  art+='<rect x="'+p+'" y="592" width="'+(w-2*p)+'" height="40" rx="5" fill="none" stroke="'+C.green+'"/>';
  art+=txt('VISITAR FRAME',w/2,619,21,C.green,'text-anchor="middle"');
 }else{
  art+=cinema(2,2,562,h-4,'film');
  art+='<path d="M564 2v362" stroke="'+C.border+'"/>';
  const tx=602;
  art+=wordmark('FRAME',tx,81,266,48,C.ink);
  art+=txt('Tu cine. Tus historias. Tu comunidad.',tx,124,22);
  art+=txt('Descubre películas, organiza tu biblioteca',tx,175,21,C.muted);
  art+=txt('y comparte lo que te deja cada historia.',tx,205,21,C.muted);
  art+=txt('React · TypeScript · Next.js · Cloudflare',tx,250,20,C.green);
  art+='<rect x="'+tx+'" y="283" width="248" height="48" rx="6" fill="none" stroke="'+C.green+'"/>';
  art+=txt('Visitar Frame',tx+20,315,23,C.green);
  art+='<path d="M'+(tx+211)+' 312v-14h-14m14 0-17 17" fill="none" stroke="'+C.green+'" stroke-width="2"/>';
 }
 return svg(w,h,'Frame · Tu cine. Tus historias. Tu comunidad.','Visitar Frame, mi proyecto de cine social. Ilustración original de una sala de cine en verdes Matrix.',art);
}
pair('frame-project',frameProject);

function prepareIcon(key){
 let source=icons[key].svg.trim();
 const match=source.match(/viewBox=["']([^"']+)["']/),view=match?match[1]:'0 0 128 128';
 let body=source.replace(/^[\s\S]*?<svg\b[^>]*>/,'').replace(/<\/svg>\s*$/,'');
 body=body.replace(/\bid=["']([^"']+)["']/g,(_,id)=>'id="'+key+'-'+id+'"').replace(/url\(#([^)]+)\)/g,(_,id)=>'url(#'+key+'-'+id+')').replace(/href=["']#([^"']+)["']/g,(_,id)=>'href="#'+key+'-'+id+'"');
 if(key==='github')body=body.replace(/#181616|#000000|#000\b/g,C.ink);
 return {view,body};
}
function stack(mobile){
 const w=mobile?480:1200,h=mobile?448:204,p=mobile?6:2,gap=mobile?8:10,cols=mobile?3:6,rows=12/cols;
 const cw=(w-p*2-gap*(cols-1))/cols,ch=(h-p*2-gap*(rows-1))/rows;
 let art='';
 Object.keys(icons).forEach((key,i)=>{
  const x=p+(i%cols)*(cw+gap),y=p+Math.floor(i/cols)*(ch+gap),icon=prepareIcon(key),size=mobile?40:43;
  art+='<rect x="'+x+'" y="'+y+'" width="'+cw+'" height="'+ch+'" rx="7" fill="'+C.panel+'" stroke="'+C.border+'"/>';
  if(mobile){
   art+='<svg x="'+(x+(cw-size)/2)+'" y="'+(y+12)+'" width="'+size+'" height="'+size+'" viewBox="'+icon.view+'">'+icon.body+'</svg>';
   art+=txt(icons[key].label,x+cw/2,y+83,key==='tailwind'?19:21,C.ink,'text-anchor="middle"');
  }else{
   art+='<svg x="'+(x+14)+'" y="'+(y+(ch-size)/2)+'" width="'+size+'" height="'+size+'" viewBox="'+icon.view+'">'+icon.body+'</svg>';
   art+=txt(icons[key].label,x+70,y+ch/2+7,key==='typescript'||key==='tailwind'?18:20);
  }
 });
 return svg(w,h,'Tecnologías y herramientas','HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Vite, Cloudflare, Git y GitHub. No se indican niveles de dominio.',art);
}
pair('stack',stack);

const contacts=[
 {no:'01',key:'email',title:'Gmail',url:'mailto:rodri.crooc@gmail.com',display:'rodri.crooc@gmail.com'},
 {no:'02',key:'frame',title:'Frame',url:'https://frame.sotos.workers.dev/',display:'frame.sotos.workers.dev'},
 {no:'03',key:'github',title:'GitHub',url:'https://github.com/rodricrooc?tab=repositories',display:'github.com/rodricrooc'}
];
function contactIcon(key,x,y,size){
 if(key==='github'){const icon=prepareIcon('github');return '<svg x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="'+icon.view+'">'+icon.body+'</svg>';}
 const g=key==='email'?'<rect x="3" y="6" width="26" height="20" rx="2"/><path d="m4 7 12 10L28 7"/>':'<rect x="4" y="3" width="24" height="26" rx="2"/><path d="M10 3v26m12-26v26M4 10h6m-6 7h6m-6 7h6m12-14h6m-6 7h6m-6 7h6"/><path d="m14 11 6 5-6 5z" fill="'+C.green+'" stroke="none"/>';
 return '<svg x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="0 0 32 32"><g fill="none" stroke="'+(key==='email'?C.ink:C.green)+'" stroke-width="1.6" stroke-linejoin="round">'+g+'</g></svg>';
}
function contact(channel,mobile){
 const w=mobile?480:1200,h=mobile?140:88,p=mobile?22:24;
 let art='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="8" fill="'+C.panel+'" stroke="'+C.border+'"/>';
 art+=txt(channel.no,p,mobile?49:53,mobile?24:23,C.green);
 art+=contactIcon(channel.key,mobile?68:100,mobile?27:23,mobile?33:36);
 art+=txt(channel.title,mobile?119:170,mobile?50:53,mobile?28:25);
 art+=txt(channel.display,mobile?p:350,mobile?104:53,mobile?25:22,C.muted);
 const ax=w-(mobile?40:45),ay=mobile?45:45;
 art+='<path d="M'+ax+' '+(ay+9)+'v-17h-17m17 0-20 20" fill="none" stroke="'+C.green+'" stroke-width="2"/>';
 return svg(w,h,channel.title+' · '+channel.display,'Abrir '+channel.title+': '+channel.display,art);
}
for(const channel of contacts)pair('social-'+channel.key,mobile=>contact(channel,mobile));

const headings=[['01','SOBRE MÍ','about-heading'],['02','PROYECTO DESTACADO','projects'],['03','TECNOLOGÍAS','stack-heading'],['04','CONECTEMOS','connect'],['05','ACTIVIDAD','activity'],['06','BIBLIOTECA','library']];
for(const [no,label,file] of headings)pair(file,mobile=>{
 const w=mobile?480:1200,h=mobile?60:66;
 const art=txt(no+' / '+label,0,mobile?34:37,mobile?24:25,C.green)+'<path d="M0 '+(h-7)+'H'+w+'" stroke="'+C.border+'"/>';
 return svg(w,h,no+' / '+label,'Encabezado de sección',art);
});
for(const item of [{name:'git',label:'Pro Git',desc:'Control de versiones',icon:'git'},{name:'typescript',label:'TypeScript Handbook',desc:'Tipos y herramientas',icon:'typescript'},{name:'react',label:'Learn React',desc:'Componentes e interfaces',icon:'react'}]){
 pair('book-'+item.name,mobile=>{
  const w=mobile?480:1200,h=mobile?100:84,icon=prepareIcon(item.icon);
  let art='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="7" fill="'+C.panel+'" stroke="'+C.border+'"/>';
  art+='<svg x="20" y="'+(mobile?28:22)+'" width="40" height="40" viewBox="'+icon.view+'">'+icon.body+'</svg>';
  art+=txt(item.label,80,mobile?57:51,mobile?25:25);
  if(!mobile)art+=txt(item.desc,520,51,21,C.muted);
  art+='<path d="M'+(w-47)+' '+(h/2+8)+'v-16h-16m16 0-20 20" stroke="'+C.green+'" stroke-width="2" fill="none"/>';
  return svg(w,h,item.label,item.desc,art);
 });
}
pair('footer',mobile=>{
 const w=mobile?480:1200,h=mobile?70:72;
 let art='<path d="M0 1H'+w+'" stroke="'+C.border+'"/>';
 if(mobile){
  art+=txt('Seguir aprendiendo.',0,30,23,C.muted);
  art+=txt('Seguir construyendo.',0,60,23,C.muted);
 }else art+=txt('Seguir aprendiendo. Seguir construyendo.',0,44,21,C.muted);
 return svg(w,h,'Seguir aprendiendo. Seguir construyendo.','',art);
});

const heading=(file,alt)=>picture(file,alt);
const md=[
 '<!-- Matrix Signal · Generado por build-profile.mjs. Editar esta fuente. -->',
 picture('banner','RODRICROOC · Ingeniero Civil Informático. Follow the white rabbit.'),
 '',
 heading('about-heading','01 / Sobre mí'),
 '',
 'Soy **@rodricrooc**, ingeniero civil informático. Desarrollo experiencias web donde el código, el diseño y la experiencia de uso trabajan juntos.',
 '',
 'Me gusta convertir ideas en productos con identidad. **Frame** une dos de mis intereses: tecnología y cine.',
 '',
 heading('projects','02 / Proyecto destacado'),
 '',
 linked('https://frame.sotos.workers.dev/','frame-project','Frame · Tu cine. Tus historias. Tu comunidad. Visitar mi proyecto publicado de cine social.'),
 '',
 heading('stack-heading','03 / Tecnologías'),
 '',
 picture('stack','HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Vite, Cloudflare, Git y GitHub.'),
 '',
 heading('connect','04 / Conectemos'),
 '',
 ...contacts.flatMap(channel=>[linked(channel.url,'social-'+channel.key,channel.title+' · '+channel.display),'']),
 heading('activity','05 / Actividad'),
 '',
 '<p><samp>Contribuciones reales · actualización diaria</samp></p>',
 '',
 '<img src="./profile-3d-contrib/profile-night-green.svg" width="100%" alt="Calendario 3D de mis contribuciones reales de GitHub" />',
 '',
 '<details>',
 '<summary>Abrir el calendario en tamaño completo</summary>',
 '',
 '[Ver calendario 3D](./profile-3d-contrib/profile-night-green.svg)',
 '',
 '</details>',
 '',
 '<p><samp>Snake mode</samp></p>',
 '',
 '<picture>',
 '  <source media="(prefers-color-scheme: dark)" srcset="./dist/github-snake-dark.svg" />',
 '  <img src="./dist/github-snake.svg" width="100%" alt="Serpiente animada que recorre mis contribuciones reales" />',
 '</picture>',
 '',
 heading('library','06 / Biblioteca'),
 '',
 linked('https://git-scm.com/book/es/v2','book-git','Pro Git · Control de versiones, en español'),
 '',
 linked('https://www.typescriptlang.org/docs/handbook/intro.html','book-typescript','TypeScript Handbook · Documentación oficial'),
 '',
 linked('https://react.dev/learn','book-react','Learn React · Documentación oficial'),
 '',
 picture('footer','Seguir aprendiendo. Seguir construyendo.'),
 '',
 '<details>',
 '<summary>Créditos y recursos</summary>',
 '',
 'Diseño Matrix Signal e ilustración de cine en SVG. Variantes para escritorio y móvil; la cabecera respeta la preferencia de movimiento reducido.',
 '',
 'Tipografía del nombre: [Oxanium](https://github.com/google/fonts/tree/main/ofl/oxanium), © 2019 The Oxanium Project Authors, [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/oxanium/OFL.txt). El nombre se dibuja con vectores para conservar su aspecto en todos los dispositivos.',
 '',
 'Iconos: [Devicon](https://github.com/devicons/devicon). Calendario: [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib). Animación de contribuciones: [snk](https://github.com/Platane/snk).',
 '',
 '[Ver el código del perfil](https://github.com/rodricrooc/rodricrooc)',
 '',
 '</details>',
 ''
].join('\n');
fs.writeFileSync(path.join(out,'README.md'),md);
console.log('Matrix Signal generado: Oxanium vectorial, cine, recursos y variantes móviles.');

// Match the real contribution graphics to the profile without changing data,
// dates, geometry, contribution levels or animation timing.
const graphPath=path.join(out,'profile-3d-contrib','profile-night-green.svg');
if(fs.existsSync(graphPath)){
 let graph=fs.readFileSync(graphPath,'utf8').replace(/^\uFEFF/,'');
 const rule=(name,body)=>{const re=new RegExp('\\.'+name+'\\s*\\{[^}]*\\}','g');graph=graph.replace(re,'.'+name+' { '+body+' }');};
 rule('fill-fg','fill: '+C.ink+';');rule('stroke-fg','stroke: '+C.ink+';');
 rule('fill-bg','fill: '+C.bg+';');rule('stroke-bg','stroke: '+C.bg+';');
 rule('fill-strong','fill: '+C.green+';');rule('fill-weak','fill: '+C.muted+';');rule('stroke-weak','stroke: '+C.dim+';');
 rule('radar','stroke-width: 4px; stroke: '+C.green+'; fill: '+C.green+'; fill-opacity: .35;');
 const levels=[['#183126','#12271e','#0d2118'],['#225c40','#1b4c35','#153b29'],['#2a9563','#227d53','#1b6542'],['#3dc88a','#31a873','#278c5e'],['#65edb5','#50c694','#3eab7c']];
 for(let level=0;level<5;level++)['top','left','right'].forEach((side,i)=>rule('cont-'+side+'-'+level,'fill: '+levels[level][i]+';'));
 graph=graph.replaceAll('#f1e05a',C.green);
 fs.writeFileSync(graphPath,graph);
}
for(const name of ['github-snake.svg','github-snake-dark.svg']){
 const snakePath=path.join(out,'dist',name);if(!fs.existsSync(snakePath))continue;
 let s=fs.readFileSync(snakePath,'utf8').replace(/^\uFEFF/,'');
 const vars=Object.fromEntries([...s.matchAll(/--([a-z0-9]+):([^;}]+)/g)].map(m=>[m[1],m[2]]));
 if(name.includes('-dark'))Object.assign(vars,{cb:'#244332',cs:C.green,ce:'#12271e',c0:'#12271e',c1:'#225c40',c2:'#2a9563',c3:'#3dc88a',c4:C.green});
 s=s.replace(/--([a-z0-9]+):([^;}]+)/g,(_,key,old)=>'--'+key+':'+(vars[key]||old));
 s=s.replace(/var\(--([a-z0-9]+)\)/g,(whole,key)=>vars[key]||whole);
 fs.writeFileSync(snakePath,s);
}


fs.writeFileSync(path.join(out,'THIRD_PARTY_NOTICES.md'),"# Third-party notices\n\n## Oxanium\n\nCopyright 2019 The Oxanium Project Authors (https://github.com/sevmeyer/oxanium)\n\nThis Font Software is licensed under the SIL Open Font License, Version 1.1.\nThis license is copied below, and is also available with a FAQ at:\nhttps://scripts.sil.org/OFL\n\n\n-----------------------------------------------------------\nSIL OPEN FONT LICENSE Version 1.1 - 26 February 2007\n-----------------------------------------------------------\n\nPREAMBLE\nThe goals of the Open Font License (OFL) are to stimulate worldwide\ndevelopment of collaborative font projects, to support the font creation\nefforts of academic and linguistic communities, and to provide a free and\nopen framework in which fonts may be shared and improved in partnership\nwith others.\n\nThe OFL allows the licensed fonts to be used, studied, modified and\nredistributed freely as long as they are not sold by themselves. The\nfonts, including any derivative works, can be bundled, embedded,\nredistributed and/or sold with any software provided that any reserved\nnames are not used by derivative works. The fonts and derivatives,\nhowever, cannot be released under any other type of license. The\nrequirement for fonts to remain under this license does not apply\nto any document created using the fonts or their derivatives.\n\nDEFINITIONS\n\"Font Software\" refers to the set of files released by the Copyright\nHolder(s) under this license and clearly marked as such. This may\ninclude source files, build scripts and documentation.\n\n\"Reserved Font Name\" refers to any names specified as such after the\ncopyright statement(s).\n\n\"Original Version\" refers to the collection of Font Software components as\ndistributed by the Copyright Holder(s).\n\n\"Modified Version\" refers to any derivative made by adding to, deleting,\nor substituting -- in part or in whole -- any of the components of the\nOriginal Version, by changing formats or by porting the Font Software to a\nnew environment.\n\n\"Author\" refers to any designer, engineer, programmer, technical\nwriter or other person who contributed to the Font Software.\n\nPERMISSION & CONDITIONS\nPermission is hereby granted, free of charge, to any person obtaining\na copy of the Font Software, to use, study, copy, merge, embed, modify,\nredistribute, and sell modified and unmodified copies of the Font\nSoftware, subject to the following conditions:\n\n1) Neither the Font Software nor any of its individual components,\nin Original or Modified Versions, may be sold by itself.\n\n2) Original or Modified Versions of the Font Software may be bundled,\nredistributed and/or sold with any software, provided that each copy\ncontains the above copyright notice and this license. These can be\nincluded either as stand-alone text files, human-readable headers or\nin the appropriate machine-readable metadata fields within text or\nbinary files as long as those fields can be easily viewed by the user.\n\n3) No Modified Version of the Font Software may use the Reserved Font\nName(s) unless explicit written permission is granted by the corresponding\nCopyright Holder. This restriction only applies to the primary font name as\npresented to the users.\n\n4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font\nSoftware shall not be used to promote, endorse or advertise any\nModified Version, except to acknowledge the contribution(s) of the\nCopyright Holder(s) and the Author(s) or with their explicit written\npermission.\n\n5) The Font Software, modified or unmodified, in part or in whole,\nmust be distributed entirely under this license, and must not be\ndistributed under any other license. The requirement for fonts to\nremain under this license does not apply to any document created\nusing the Font Software.\n\nTERMINATION\nThis license becomes null and void if any of the above conditions are\nnot met.\n\nDISCLAIMER\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT\nOF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE\nCOPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\nINCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL\nDAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\nFROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM\nOTHER DEALINGS IN THE FONT SOFTWARE.\n\n\n## Devicon\n\nThe MIT License (MIT)\n\nCopyright (c) 2015 konpa\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n");

