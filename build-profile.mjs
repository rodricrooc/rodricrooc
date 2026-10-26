import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Self-contained GitHub README artwork. Text is native Markdown; image variants
// handle narrow screens. No browser JS, remote fonts or custom README CSS.
const out=process.argv[2]||'.';
fs.mkdirSync(out,{recursive:true});
const C={bg:'#080f0c',panel:'#0b1511',border:'#1f4938',ink:'#e3eee7',muted:'#9ab4a4',green:'#65edb5',dim:'#38785d'};
const mono='ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace';
const wm={"units":1000,"glyphs":{"R":{"d":"M20,754L420,754Q474,754 520.5,742.5Q567,731 601.5,709Q636,687 655.5,655Q675,623 675,582Q675,505 617.5,459.5Q560,414 464,400L464,394Q498,386 531,367.5Q564,349 590,323Q616,297 632,264.5Q648,232 648,196L648,151Q648,82 663,57Q678,32 717,32L755,32L755,0L638,0Q600,0 568,11Q536,22 511.5,42Q487,62 472.5,90Q458,118 457,153L452,262Q449,329 413.5,360.5Q378,392 321,392L273,392L273,30L391,30L391,0L20,0L20,30L115,30L115,724L20,724ZM273,724L273,422L350,422Q386,422 411.5,428Q437,434 453.5,451Q470,468 477.5,498Q485,528 485,575Q485,622 477.5,651Q470,680 455.5,696.5Q441,713 419.5,718.5Q398,724 370,724Z","advance":740,"bbox":{"xMin":20,"yMin":0,"xMax":755,"yMax":754}},"O":{"d":"M411,-13Q333,-13 265,19.5Q197,52 147,106Q97,160 68.5,230.5Q40,301 40,378Q40,455 68.5,524.5Q97,594 147,647Q197,700 265,731.5Q333,763 411,763Q489,763 557,731.5Q625,700 675.5,647Q726,594 754.5,524.5Q783,455 783,378Q783,301 754.5,230.5Q726,160 675.5,106Q625,52 557,19.5Q489,-13 411,-13ZM410,22Q461,22 495.5,37Q530,52 552,92Q574,132 583.5,200.5Q593,269 593,376Q593,482 583.5,550.5Q574,619 552,658.5Q530,698 495.5,713Q461,728 410,728Q360,728 325.5,713Q291,698 270,659Q249,620 239.5,552Q230,484 230,378Q230,269 239.5,200Q249,131 270.5,91.5Q292,52 326,37Q360,22 410,22Z","advance":823,"bbox":{"xMin":40,"yMin":-13,"xMax":783,"yMax":763}},"D":{"d":"M421,754Q494,754 557,723.5Q620,693 667,641.5Q714,590 741,522Q768,454 768,380Q768,305 740.5,236Q713,167 664.5,114.5Q616,62 551,31Q486,0 411,0L20,0L20,30L115,30L115,724L20,724L20,754ZM273,724L273,30L381,30Q435,30 472.5,44.5Q510,59 533.5,98Q557,137 567.5,204.5Q578,272 578,379Q578,483 568,550Q558,617 535.5,655.5Q513,694 477,709Q441,724 390,724Z","advance":798,"bbox":{"xMin":20,"yMin":0,"xMax":768,"yMax":754}},"I":{"d":"M20,754L371,754L371,724L273,724L273,30L371,30L371,0L20,0L20,30L115,30L115,724L20,724Z","advance":386,"bbox":{"xMin":20,"yMin":0,"xMax":371,"yMax":754}},"C":{"d":"M412,-13Q333,-13 266.5,18.5Q200,50 152,103Q104,156 77,225.5Q50,295 50,372Q50,449 77,519.5Q104,590 152.5,644Q201,698 268,730.5Q335,763 416,763Q468,763 505.5,748.5Q543,734 583,704L627,754L652,754L652,523L622,523Q614,566 597.5,603.5Q581,641 555.5,669Q530,697 494.5,712.5Q459,728 412,728Q375,728 343.5,714.5Q312,701 289,661Q266,621 253,549.5Q240,478 240,361Q240,258 250.5,192Q261,126 283,88.5Q305,51 337,36.5Q369,22 413,22Q464,22 502,37.5Q540,53 567,80Q594,107 610.5,142.5Q627,178 636,217L666,217L666,0L636,0L592,46Q548,14 504,0.5Q460,-13 412,-13Z","advance":711,"bbox":{"xMin":50,"yMin":-13,"xMax":666,"yMax":763}}}};
const italicWm={"units":2000,"glyphs":{"F":{"d":"M80,0L428,1500L618,1500L270,0ZM-90,0L-90,39L471,39L471,0ZM732,536Q747,603 730.5,645Q714,687 664,707Q614,727 527,727L418,727L418,766L527,766Q613,766 676,783Q739,800 777.5,839Q816,878 828,945L867,945L771,536ZM1160,1090Q1185,1197 1173.5,1281Q1162,1365 1103.5,1413Q1045,1461 928,1461L248,1461L248,1500L1295,1500L1199,1090Z","advance":1124,"bbox":{"xMin":-90,"yMin":0,"xMax":1295,"yMax":1500}},"r":{"d":"M45,0L264,881L111,881L111,920L423,920L203,0ZM252,305Q270,386 298,474Q326,562 363,644.5Q400,727 445.5,793.5Q491,860 543.5,899.5Q596,939 654,939Q715,939 749.5,906Q784,873 784,823Q784,777 758,745Q732,713 686,713Q643,713 614.5,739Q586,765 586,807Q586,847 613,875Q640,903 687,903Q729,903 755.5,882Q782,861 782,823L743,823Q743,855 720.5,878Q698,901 656,901Q602,901 552.5,862.5Q503,824 460.5,759.5Q418,695 382.5,616.5Q347,538 319.5,457Q292,376 275,305Z","advance":832,"bbox":{"xMin":45,"yMin":0,"xMax":784,"yMax":939}},"a":{"d":"M318,-20Q188,-20 126.5,67.5Q65,155 65,305Q65,420 108.5,532.5Q152,645 223.5,737Q295,829 381,884.5Q467,940 552,940Q626,940 667.5,900Q709,860 726,794.5Q743,729 743,651Q743,582 728.5,505.5Q714,429 686.5,354Q659,279 621,211.5Q583,144 535.5,92Q488,40 433.5,10Q379,-20 318,-20ZM348,38Q404,38 457,75.5Q510,113 556,176Q602,239 637,318.5Q672,398 691.5,483Q711,568 711,648Q711,721 697,775Q683,829 653,858.5Q623,888 574,888Q522,888 470.5,845.5Q419,803 373.5,731.5Q328,660 292.5,573.5Q257,487 237,397.5Q217,308 217,230Q217,135 252,86.5Q287,38 348,38ZM753,-20Q683,-20 650,18Q617,56 617,116Q617,133 618,146.5Q619,160 621,170L650,331L701,486L730,668L791,920L960,920L743,104Q739,89 739,72Q739,55 748.5,42.5Q758,30 780,30Q824,30 862,60Q900,90 937,153.5Q974,217 1014,319L1052,306Q1009,191 965.5,119Q922,47 871,13.5Q820,-20 753,-20Z","advance":1097,"bbox":{"xMin":65,"yMin":-20,"xMax":1052,"yMax":940}},"m":{"d":"M1265,-20Q1186,-20 1152,15.5Q1118,51 1118,108Q1118,130 1122.5,149.5Q1127,169 1131,184L1257,616Q1295,747 1294,816.5Q1293,886 1231,886Q1173,886 1111,833Q1049,780 990.5,691Q932,602 885,491.5Q838,381 809,266L780,266Q809,380 856.5,498.5Q904,617 967,717Q1030,817 1105,878Q1180,939 1264,939Q1354,939 1396,897.5Q1438,856 1442.5,788Q1447,720 1423,639L1269,106Q1266,97 1264.5,87Q1263,77 1263,68Q1263,52 1273.5,41.5Q1284,31 1303,31Q1346,31 1384.5,60Q1423,89 1460.5,152.5Q1498,216 1538,319L1576,306Q1533,191 1489.5,119Q1446,47 1392.5,13.5Q1339,-20 1265,-20ZM55,0L265,881L135,881L135,920L435,920L215,0ZM585,0L735,616Q767,749 769,817.5Q771,886 709,886Q651,886 587.5,833Q524,780 464,691Q404,602 355.5,491.5Q307,381 278,266L249,266Q278,380 327.5,498.5Q377,617 442.5,717Q508,817 586,878Q664,939 749,939Q831,939 870.5,897.5Q910,856 915.5,788Q921,720 901,639L744,0Z","advance":1643,"bbox":{"xMin":55,"yMin":-20,"xMax":1576,"yMax":939}},"e":{"d":"M356,-20Q260,-20 194,20.5Q128,61 94,133Q60,205 60,300Q60,415 102,528.5Q144,642 220,735Q296,828 398.5,884Q501,940 621,940Q729,940 788.5,886.5Q848,833 848,754Q848,672 792,607.5Q736,543 642.5,498Q549,453 436.5,426.5Q324,400 210,392L210,426Q295,432 370,448.5Q445,465 505.5,493Q566,521 609.5,562Q653,603 676.5,657.5Q700,712 700,782Q700,829 678.5,864.5Q657,900 607,900Q550,900 498.5,868Q447,836 402.5,780.5Q358,725 322,655Q286,585 260.5,507.5Q235,430 221.5,353.5Q208,277 208,210Q208,110 254.5,70.5Q301,31 371,31Q451,31 517.5,63Q584,95 638,151Q692,207 733,279L768,258Q729,182 669.5,119Q610,56 531.5,18Q453,-20 356,-20Z","advance":923,"bbox":{"xMin":60,"yMin":-20,"xMax":848,"yMax":940}}}};
const artUri="data:image/png;base64,"+fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)),"assets","frame-posters.png")).toString("base64");
const icons={"html":{"label":"HTML","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#E44D26\" d=\"M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z\"/><path fill=\"#F16529\" d=\"M64 116.8l36.378-10.086 8.559-95.878H64z\"/><path fill=\"#EBEBEB\" d=\"M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z\"/><path fill=\"#fff\" d=\"M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z\"/></svg>"},"css":{"label":"CSS","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#1572B6\" d=\"M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z\"/><path fill=\"#33A9DC\" d=\"M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z\"/><path fill=\"#fff\" d=\"M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z\"/><path fill=\"#EBEBEB\" d=\"M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z\"/><path fill=\"#fff\" d=\"M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z\"/><path fill=\"#EBEBEB\" d=\"M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z\"/></svg>"},"javascript":{"label":"JavaScript","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#F0DB4F\" d=\"M1.408 1.408h125.184v125.185H1.408z\"/><path fill=\"#323330\" d=\"M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z\"/></svg>"},"typescript":{"label":"TypeScript","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#fff\" d=\"M22.67 47h99.67v73.67H22.67z\"/><path data-name=\"original\" fill=\"#007acc\" d=\"M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z\"/></svg>"},"react":{"label":"React","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><g fill=\"#61DAFB\"><circle cx=\"64\" cy=\"64\" r=\"11.4\"/><path d=\"M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z\"/></g></svg>"},"nextjs":{"label":"Next.js","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><circle cx=\"64\" cy=\"64\" r=\"64\"/><path fill=\"url(#a)\" d=\"M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z\"/><path fill=\"url(#b)\" d=\"M81.778 38.4h8.533v51.2h-8.533z\"/><defs><linearGradient id=\"a\" x1=\"109\" x2=\"144.5\" y1=\"116.5\" y2=\"160.5\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient><linearGradient id=\"b\" x1=\"121\" x2=\"120.799\" y1=\"54\" y2=\"106.875\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs></svg>\n"},"tailwind":{"label":"Tailwind CSS","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path d=\"M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0\" fill=\"#38bdf8\"/></svg>\n"},"nodejs":{"label":"Node.js","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"url(#a)\" d=\"M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z\"/><path fill=\"url(#b)\" d=\"M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z\"/><path fill=\"url(#c)\" d=\"M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z\"/><defs><linearGradient id=\"a\" x1=\"34.513\" x2=\"27.157\" y1=\"15.535\" y2=\"30.448\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#3F873F\"/><stop offset=\".33\" stop-color=\"#3F8B3D\"/><stop offset=\".637\" stop-color=\"#3E9638\"/><stop offset=\".934\" stop-color=\"#3DA92E\"/><stop offset=\"1\" stop-color=\"#3DAE2B\"/></linearGradient><linearGradient id=\"b\" x1=\"30.009\" x2=\"50.533\" y1=\"23.359\" y2=\"8.288\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".138\" stop-color=\"#3F873F\"/><stop offset=\".402\" stop-color=\"#52A044\"/><stop offset=\".713\" stop-color=\"#64B749\"/><stop offset=\".908\" stop-color=\"#6ABF4B\"/></linearGradient><linearGradient id=\"c\" x1=\"21.917\" x2=\"40.555\" y1=\"22.261\" y2=\"22.261\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".092\" stop-color=\"#6ABF4B\"/><stop offset=\".287\" stop-color=\"#64B749\"/><stop offset=\".598\" stop-color=\"#52A044\"/><stop offset=\".862\" stop-color=\"#3F873F\"/></linearGradient></defs></svg>\n"},"vite":{"label":"Vite","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><defs><linearGradient id=\"a\" x1=\"6\" x2=\"235\" y1=\"33\" y2=\"344\" gradientTransform=\"translate(0 .937) scale(.3122)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#41d1ff\"/><stop offset=\"1\" stop-color=\"#bd34fe\"/></linearGradient><linearGradient id=\"b\" x1=\"194.651\" x2=\"236.076\" y1=\"8.818\" y2=\"292.989\" gradientTransform=\"translate(0 .937) scale(.3122)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#ffea83\"/><stop offset=\".083\" stop-color=\"#ffdd35\"/><stop offset=\"1\" stop-color=\"#ffa800\"/></linearGradient></defs><path fill=\"url(#a)\" d=\"M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0\"/><path fill=\"url(#b)\" d=\"M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0\"/></svg>\n"},"cloudflare":{"label":"Cloudflare","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#FFF\" d=\"m115.679 69.288-15.591-8.94-2.689-1.163-63.781.436v32.381h82.061z\"/><path fill=\"#F38020\" d=\"M87.295 89.022c.763-2.617.472-5.015-.8-6.796-1.163-1.635-3.125-2.58-5.488-2.689l-44.737-.581c-.291 0-.545-.145-.691-.363s-.182-.509-.109-.8c.145-.436.581-.763 1.054-.8l45.137-.581c5.342-.254 11.157-4.579 13.192-9.885l2.58-6.723c.109-.291.145-.581.073-.872-2.906-13.158-14.644-22.97-28.672-22.97-12.938 0-23.913 8.359-27.838 19.952a13.35 13.35 0 0 0-9.267-2.58c-6.215.618-11.193 5.597-11.811 11.811-.145 1.599-.036 3.162.327 4.615C10.104 70.051 2 78.337 2 88.549c0 .909.073 1.817.182 2.726a.895.895 0 0 0 .872.763h82.57c.472 0 .909-.327 1.054-.8l.617-2.216z\"/><path fill=\"#FAAE40\" d=\"M101.542 60.275c-.4 0-.836 0-1.236.036-.291 0-.545.218-.654.509l-1.744 6.069c-.763 2.617-.472 5.015.8 6.796 1.163 1.635 3.125 2.58 5.488 2.689l9.522.581c.291 0 .545.145.691.363.145.218.182.545.109.8-.145.436-.581.763-1.054.8l-9.924.582c-5.379.254-11.157 4.579-13.192 9.885l-.727 1.853c-.145.363.109.727.509.727h34.089c.4 0 .763-.254.872-.654.581-2.108.909-4.325.909-6.614 0-13.447-10.975-24.422-24.458-24.422\"/></svg>"},"git":{"label":"Git","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><path fill=\"#F34F29\" d=\"M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z\"/></svg>"},"github":{"label":"GitHub","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 128 128\"><g fill=\"#181616\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z\"/><path d=\"M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0\"/></g></svg>"}};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const txt=(s,x,y,size=22,fill=C.ink,attr='')=>'<text x="'+x+'" y="'+y+'" fill="'+fill+'" font-family="'+mono+'" font-size="'+size+'" '+attr+'>'+esc(s)+'</text>';
function svg(w,h,title,description,art,defs=''){
 return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" role="img" aria-labelledby="title desc"><title id="title">'+esc(title)+'</title><desc id="desc">'+esc(description)+'</desc><defs>'+defs+'</defs>'+art+'</svg>';
}
function save(name,s){fs.writeFileSync(path.join(out,name+'.svg'),s);}
function pair(name,render){for(const mobile of [false,true])save(name+(mobile?'-mobile':''),render(mobile));}
function picture(name,alt){
 return '<picture>\n  <source media="(max-width: 767px)" srcset="./'+name+'-mobile.svg" />\n  <img src="./'+name+'.svg" width="100%" alt="'+esc(alt)+'" />\n</picture>';
}
const linked=(url,name,alt)=>'<a href="'+url+'">\n'+picture(name,alt)+'\n</a>';

// Libre Bodoni Bold (name) and Bodoni Moda Italic (Frame), SIL OFL 1.1. Vectors ensure every device
// shows the selected serif letterforms without remote font loading.
function lettering(font,label,x,baseline,maxWidth,maxHeight,fill,center=false,gap=0){
 let dx=0,xMin=Infinity,xMax=-Infinity,yMin=Infinity,yMax=-Infinity,paths='';
 for(const ch of label){
  const g=font.glyphs[ch];if(!g)throw Error('Missing letter '+ch);
  xMin=Math.min(xMin,dx+g.bbox.xMin);xMax=Math.max(xMax,dx+g.bbox.xMax);
  yMin=Math.min(yMin,g.bbox.yMin);yMax=Math.max(yMax,g.bbox.yMax);
  paths+='<path d="'+g.d+'" transform="translate('+dx+' 0)"/>';dx+=g.advance+gap;
 }
 const scale=Math.min(maxWidth/(xMax-xMin),maxHeight/(yMax-yMin));
 const extra=center?(maxWidth-(xMax-xMin)*scale)/2:0;
 return '<g aria-hidden="true" transform="translate('+(x+extra-xMin*scale)+' '+baseline+') scale('+scale+' '+(-scale)+')" fill="'+fill+'">'+paths+'</g>';
}
function banner(mobile){
 const w=mobile?480:1200,h=mobile?286:352,p=mobile?28:44;
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
 art+=lettering(wm,'RODRICROOC',p,mobile?99:169,w-2*p,mobile?72:124,'#f3efe4',false,-8);
 if(mobile){
  art+=txt('Ingeniero Civil',p,145,26,C.ink);
  art+=txt('Informático',p,178,26,C.ink);
 }else art+=txt('Ingeniero Civil Informático',p,226,29,C.ink,'letter-spacing="1"');
 art+='<path d="M'+p+' '+(mobile?211:263)+'h40" stroke="#dce5d3" stroke-width="2"/>';
 art+=txt('Follow the white rabbit.',p,mobile?254:309,mobile?24:27,C.ink);
 return svg(w,h,'RODRICROOC · Ingeniero Civil Informático','Follow the white rabbit. Tipografía serif Libre Bodoni Bold y Bodoni Moda; lluvia Matrix animada con movimiento reducido.',art,'<clipPath id="clip"><rect x="2" y="2" width="'+(w-4)+'" height="'+(h-4)+'" rx="12"/></clipPath><linearGradient id="shade"><stop stop-color="#080f0c" stop-opacity=".97"/><stop offset=".48" stop-color="#080f0c" stop-opacity=".88"/><stop offset="1" stop-color="#080f0c" stop-opacity=".1"/></linearGradient>');
}
pair('banner',banner);

function frameProject(mobile){
 const w=mobile?480:1200,h=mobile?568:380,green='#062b1b',p=mobile?24:44;
 let art='<rect x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'" rx="12" fill="url(#ivory)" stroke="#d0c6ae"/>';
 art+='<g clip-path="url(#card)">';
 art+='<rect width="'+w+'" height="'+h+'" filter="url(#paper)" opacity=".045"/>';
 if(mobile){
  art+=lettering(italicWm,'Frame',p,140,w-2*p,108,green,true);
  art+='<text x="240" y="183" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="27" fill="'+green+'">Tu cine. Tus historias.</text>';
  art+='<image xlink:href="'+artUri+'" x="6" y="203" width="468" height="254" preserveAspectRatio="xMidYMid meet"/>';
  art+='<rect x="'+p+'" y="486" width="'+(w-2*p)+'" height="56" rx="5" fill="'+green+'"/>';
  art+='<text x="222" y="522" text-anchor="middle" font-family="Georgia, Times New Roman, serif" font-size="27" fill="#f4f0e6">Explorar Frame</text>';
  art+='<path d="M363 522v-16h-16m16 0-20 20" fill="none" stroke="#f4f0e6" stroke-width="1.8"/>';
 }else{
  art+=lettering(italicWm,'Frame',p,192,494,139,green);
  art+='<text x="'+p+'" y="244" font-family="Georgia, Times New Roman, serif" font-size="32" fill="'+green+'">Tu cine. Tus historias.</text>';
  art+='<rect x="'+p+'" y="286" width="326" height="60" rx="5" fill="'+green+'"/>';
  art+='<text x="'+(p+30)+'" y="325" font-family="Georgia, Times New Roman, serif" font-size="28" fill="#f4f0e6">Explorar Frame</text>';
  art+='<path d="M'+(p+285)+' 324v-17h-17m17 0-21 21" fill="none" stroke="#f4f0e6" stroke-width="1.8"/>';
  art+='<image xlink:href="'+artUri+'" x="572" y="12" width="652" height="356" preserveAspectRatio="xMidYMid meet"/>';
 }
 art+='</g>';
 return svg(w,h,'Frame · Tu cine. Tus historias.','Explorar Frame. Portadas originales de una costa nocturna, un pasaje de arquitectura verde y un paisaje ocre.',art,'<clipPath id="card"><rect x="2" y="2" width="'+(w-4)+'" height="'+(h-4)+'" rx="11"/></clipPath><linearGradient id="ivory" x2="1" y2="1"><stop stop-color="#f7f1e2"/><stop offset="1" stop-color="#e9e1cf"/></linearGradient><filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" stitchTiles="stitch" seed="31"/><feColorMatrix type="saturate" values="0"/></filter>');
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
 '<!-- Green Editorial · Generado por build-profile.mjs. Editar esta fuente. -->',
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
 linked('https://frame.sotos.workers.dev/','frame-project','Frame · Tu cine. Tus historias. Explorar mi proyecto de cine social.'),
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
 'Diseño Green Editorial con portadas originales creadas para este perfil. Variantes para escritorio y móvil; la cabecera respeta la preferencia de movimiento reducido.',
 '',
 'Nombre: [Libre Bodoni Bold](https://github.com/impallari/Libre-Bodoni), bajo SIL Open Font License 1.1. Frame: [Bodoni Moda](https://github.com/google/fonts/tree/main/ofl/bodonimoda), versiones romana e itálica, bajo [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/bodonimoda/OFL.txt). Los títulos se dibujan con vectores para conservar su aspecto en todos los dispositivos.',
 '',
 'Iconos: [Devicon](https://github.com/devicons/devicon). Calendario: [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib). Animación de contribuciones: [snk](https://github.com/Platane/snk).',
 '',
 '[Ver el código del perfil](https://github.com/rodricrooc/rodricrooc)',
 '',
 '</details>',
 ''
].join('\n');
fs.writeFileSync(path.join(out,'README.md'),md);
console.log('Green Editorial generado: serif vectorial, Frame simplificado y variantes móviles.');

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


fs.writeFileSync(path.join(out,'THIRD_PARTY_NOTICES.md'),"# Third-party notices\n\n## Bodoni Moda\n\nCopyright 2020 The Bodoni Moda Project Authors (https://github.com/indestructible-type/Bodoni)\n\nThis Font Software is licensed under the SIL Open Font License, Version 1.1.\nThis license is copied below, and is also available with a FAQ at:\nhttps://openfontlicense.org/\n\n\n-----------------------------------------------------------\nSIL OPEN FONT LICENSE Version 1.1 - 26 February 2007\n-----------------------------------------------------------\n\nPREAMBLE\nThe goals of the Open Font License (OFL) are to stimulate worldwide\ndevelopment of collaborative font projects, to support the font creation\nefforts of academic and linguistic communities, and to provide a free and\nopen framework in which fonts may be shared and improved in partnership\nwith others.\n\nThe OFL allows the licensed fonts to be used, studied, modified and\nredistributed freely as long as they are not sold by themselves. The\nfonts, including any derivative works, can be bundled, embedded, \nredistributed and/or sold with any software provided that any reserved\nnames are not used by derivative works. The fonts and derivatives,\nhowever, cannot be released under any other type of license. The\nrequirement for fonts to remain under this license does not apply\nto any document created using the fonts or their derivatives.\n\nDEFINITIONS\n\"Font Software\" refers to the set of files released by the Copyright\nHolder(s) under this license and clearly marked as such. This may\ninclude source files, build scripts and documentation.\n\n\"Reserved Font Name\" refers to any names specified as such after the\ncopyright statement(s).\n\n\"Original Version\" refers to the collection of Font Software components as\ndistributed by the Copyright Holder(s).\n\n\"Modified Version\" refers to any derivative made by adding to, deleting,\nor substituting -- in part or in whole -- any of the components of the\nOriginal Version, by changing formats or by porting the Font Software to a\nnew environment.\n\n\"Author\" refers to any designer, engineer, programmer, technical\nwriter or other person who contributed to the Font Software.\n\nPERMISSION & CONDITIONS\nPermission is hereby granted, free of charge, to any person obtaining\na copy of the Font Software, to use, study, copy, merge, embed, modify,\nredistribute, and sell modified and unmodified copies of the Font\nSoftware, subject to the following conditions:\n\n1) Neither the Font Software nor any of its individual components,\nin Original or Modified Versions, may be sold by itself.\n\n2) Original or Modified Versions of the Font Software may be bundled,\nredistributed and/or sold with any software, provided that each copy\ncontains the above copyright notice and this license. These can be\nincluded either as stand-alone text files, human-readable headers or\nin the appropriate machine-readable metadata fields within text or\nbinary files as long as those fields can be easily viewed by the user.\n\n3) No Modified Version of the Font Software may use the Reserved Font\nName(s) unless explicit written permission is granted by the corresponding\nCopyright Holder. This restriction only applies to the primary font name as\npresented to the users.\n\n4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font\nSoftware shall not be used to promote, endorse or advertise any\nModified Version, except to acknowledge the contribution(s) of the\nCopyright Holder(s) and the Author(s) or with their explicit written\npermission.\n\n5) The Font Software, modified or unmodified, in part or in whole,\nmust be distributed entirely under this license, and must not be\ndistributed under any other license. The requirement for fonts to\nremain under this license does not apply to any document created\nusing the Font Software.\n\nTERMINATION\nThis license becomes null and void if any of the above conditions are\nnot met.\n\nDISCLAIMER\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT\nOF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE\nCOPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\nINCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL\nDAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\nFROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM\nOTHER DEALINGS IN THE FONT SOFTWARE.\n\r\n\n\n## Devicon\n\nThe MIT License (MIT)\n\nCopyright (c) 2015 konpa\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n");


fs.appendFileSync(path.join(out,'THIRD_PARTY_NOTICES.md'),"\n\n## Libre Bodoni\n\nCopyright (c) 2012, Impallari Type (www.impallari.com)\n\nThis Font Software is licensed under the SIL Open Font License, Version 1.1.\nThis license is copied below, and is also available with a FAQ at:\nhttp://scripts.sil.org/OFL\n\n\n-----------------------------------------------------------\nSIL OPEN FONT LICENSE Version 1.1 - 26 February 2007\n-----------------------------------------------------------\n\nPREAMBLE\nThe goals of the Open Font License (OFL) are to stimulate worldwide\ndevelopment of collaborative font projects, to support the font creation\nefforts of academic and linguistic communities, and to provide a free and\nopen framework in which fonts may be shared and improved in partnership\nwith others.\n\nThe OFL allows the licensed fonts to be used, studied, modified and\nredistributed freely as long as they are not sold by themselves. The\nfonts, including any derivative works, can be bundled, embedded, \nredistributed and/or sold with any software provided that any reserved\nnames are not used by derivative works. The fonts and derivatives,\nhowever, cannot be released under any other type of license. The\nrequirement for fonts to remain under this license does not apply\nto any document created using the fonts or their derivatives.\n\nDEFINITIONS\n\"Font Software\" refers to the set of files released by the Copyright\nHolder(s) under this license and clearly marked as such. This may\ninclude source files, build scripts and documentation.\n\n\"Reserved Font Name\" refers to any names specified as such after the\ncopyright statement(s).\n\n\"Original Version\" refers to the collection of Font Software components as\ndistributed by the Copyright Holder(s).\n\n\"Modified Version\" refers to any derivative made by adding to, deleting,\nor substituting -- in part or in whole -- any of the components of the\nOriginal Version, by changing formats or by porting the Font Software to a\nnew environment.\n\n\"Author\" refers to any designer, engineer, programmer, technical\nwriter or other person who contributed to the Font Software.\n\nPERMISSION & CONDITIONS\nPermission is hereby granted, free of charge, to any person obtaining\na copy of the Font Software, to use, study, copy, merge, embed, modify,\nredistribute, and sell modified and unmodified copies of the Font\nSoftware, subject to the following conditions:\n\n1) Neither the Font Software nor any of its individual components,\nin Original or Modified Versions, may be sold by itself.\n\n2) Original or Modified Versions of the Font Software may be bundled,\nredistributed and/or sold with any software, provided that each copy\ncontains the above copyright notice and this license. These can be\nincluded either as stand-alone text files, human-readable headers or\nin the appropriate machine-readable metadata fields within text or\nbinary files as long as those fields can be easily viewed by the user.\n\n3) No Modified Version of the Font Software may use the Reserved Font\nName(s) unless explicit written permission is granted by the corresponding\nCopyright Holder. This restriction only applies to the primary font name as\npresented to the users.\n\n4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font\nSoftware shall not be used to promote, endorse or advertise any\nModified Version, except to acknowledge the contribution(s) of the\nCopyright Holder(s) and the Author(s) or with their explicit written\npermission.\n\n5) The Font Software, modified or unmodified, in part or in whole,\nmust be distributed entirely under this license, and must not be\ndistributed under any other license. The requirement for fonts to\nremain under this license does not apply to any document created\nusing the Font Software.\n\nTERMINATION\nThis license becomes null and void if any of the above conditions are\nnot met.\n\nDISCLAIMER\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT\nOF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE\nCOPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\nINCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL\nDAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\nFROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM\nOTHER DEALINGS IN THE FONT SOFTWARE.\n");
