const fs = require("fs");

const file = fs.readFileSync("spec.cus", {
  encoding: null,
});

let nextOffset = 0;

// When casting the Node.js Buffer to a DataView or TypedArray use the byteOffset
// to refer only to the part of `nodeBuffer.buffer` that contains the memory
// for `nodeBuffer`.
// This happens sometimes when allocating a Buffer smaller
// than Buffer.poolSize, the buffer does not start from a zero offset on the underlying ArrayBuffer.
const dv1 = new DataView(file.buffer, file.byteOffset, file.byteLength);

const version = dv1.getUint8(nextOffset, false);
nextOffset++;
const nameLength = dv1.getUint8(nextOffset, false);
nextOffset++;

let name = "";
for (let i = 0; i < nameLength; i++) {
  name = name + String.fromCharCode(dv1.getUint16(nextOffset, false));
  nextOffset = nextOffset + 2;
}

const rank = dv1.getUint32(nextOffset, false);
nextOffset = nextOffset + 4;
const hobbiesLength = dv1.getUint8(nextOffset, false);
nextOffset++;

const hobbies = [];

for (let i = 0; i < hobbiesLength; i++) {
  const hobbyLength = dv1.getUint8(nextOffset, false);
  nextOffset++;
  let hobby = "";
  for (let j = 0; j < hobbyLength; j++) {
    hobby = hobby + String.fromCharCode(dv1.getUint16(nextOffset, false));
    nextOffset = nextOffset + 2;
  }
  hobbies.push(hobby);
}

console.log({
  version,
  name,
  rank,
  hobbies,
});
