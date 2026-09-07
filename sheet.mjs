import sharp from "sharp"; import { readdirSync } from "node:fs"; import { join } from "node:path";
const dir=process.argv[2], out=process.argv[3], cols=Number(process.argv[4]??3), tw=440, pad=8;
const files=readdirSync(dir).filter(f=>f.endsWith(".jpg")).sort();
const hs=[]; for(const f of files){const m=await sharp(join(dir,f)).metadata(); hs.push(Math.round(tw*m.height/m.width));}
const rowH=[]; for(let r=0;r<Math.ceil(files.length/cols);r++) rowH.push(Math.max(...hs.slice(r*cols,(r+1)*cols)));
const tiles=[]; let top=pad;
for(let r=0;r<rowH.length;r++){for(let c=0;c<cols;c++){const i=r*cols+c; if(i>=files.length)break;
 tiles.push({input:await sharp(join(dir,files[i])).resize(tw).jpeg({quality:78}).toBuffer(),left:pad+c*(tw+pad),top});} top+=rowH[r]+pad;}
await sharp({create:{width:pad+cols*(tw+pad),height:top,channels:3,background:"#efeeec"}}).composite(tiles).jpeg({quality:82,mozjpeg:true}).toFile(out);
console.log(files.length,"→",out);
