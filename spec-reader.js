const fs = require("fs");

const file = fs.readFileSync("spec.cus", {
  encoding: null,
});

const uint8 = new Uint8Array(file.byteLength);

file.copy(uint8, 0, 0, file.byteLength);

let nextOffset = 0;

const dv1 = new DataView(uint8.buffer);

const version = dv1.getUint8(nextOffset, false);
nextOffset = nextOffset + 1;
const nameLength = dv1.getUint8(nextOffset, false);
nextOffset = nextOffset + 1;

let name = "";
for (let i = 0; i < nameLength; i++) {
  name = name + String.fromCharCode(dv1.getUint16(nextOffset, false));
  nextOffset = nextOffset + 2;
}

const rank = dv1.getUint32(nextOffset, false);
nextOffset = nextOffset + 4;
const hobbiesLength = dv1.getUint8(nextOffset, false);
nextOffset = nextOffset + 1;

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
