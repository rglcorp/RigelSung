import fs from 'node:fs';
import subsetFont from 'subset-font';

const fontPath = "../dist/RigelSung.ttf";
const originalFont = fs.readFileSync(fontPath);

const subsetSource = ["ascii.txt", "cjk.txt", "hangul.txt"];

let txts = "";
for(let src of subsetSource) {
    txts += fs.readFileSync(src).toString();
}

console.log("Stripping to TTF");
const subsetSfnt = await subsetFont(originalFont, txts, {
    targetFormat: 'sfnt',
});
fs.writeFileSync(`${fontPath.split(".ttf")[0]}_Lite.ttf`, subsetSfnt);

console.log("Stripping to WOFF2");
const subsetWoff2 = await subsetFont(originalFont, txts, {
    targetFormat: 'woff2',
});
fs.writeFileSync(`${fontPath.split(".ttf")[0]}_Lite.woff2`, subsetWoff2);