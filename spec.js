const fs = require("fs");

const data = {
  version: 1,
  name: "Tushar",
  rank: 32456,
  hobbies: ["sports", "hiking", "programming"],
};

const arrBuff1 = new ArrayBuffer(120);
const dv1 = new DataView(arrBuff1);

let nextOffset = 0;
dv1.setUint8(nextOffset, data.version, false);
nextOffset = nextOffset + 1;
dv1.setUint8(nextOffset, data.name.length, false);
nextOffset = nextOffset + 1;

for (let i = 0; i < data.name.length; i++) {
  dv1.setUint16(nextOffset, data.name.charCodeAt(i), false);
  nextOffset = nextOffset + 2;
}

dv1.setUint32(nextOffset, data.rank, false);
nextOffset = nextOffset + 4;
dv1.setUint8(nextOffset, data.hobbies.length, false);
nextOffset = nextOffset + 1;

for (let i = 0; i < data.hobbies.length; i++) {
  dv1.setUint8(nextOffset, data.hobbies[i].length, false);
  nextOffset = nextOffset + 1;
  for (let j = 0; j < data.hobbies[i].length; j++) {
    dv1.setUint16(nextOffset, data.hobbies[i].charCodeAt(j), false);
    nextOffset = nextOffset + 2;
  }
}

fs.writeFileSync("spec.cus", new DataView(arrBuff1, 0, nextOffset), {
  encoding: null,
});
