const fs = require("fs");
const os = require("os");

const stat = fs.statSync("./img.png");

// const isLittleEndian = os.endianness() === "LE";
const isLittleEndian = false;

function isKthBitSet(number, pos) {
  // 1 that is 0000010, is shifted (pos) bits to the left so it is at pos position
  // 00100000
  return (number & (1 << pos)) !== 0;
}

/**
 *
 * @param {String} type
 * @param {DataView} data
 * @param {DataView} chunkTypeBuffer
 * @returns
 */
function interpretData(type, data, chunkTypeBuffer) {
  switch (type) {
    case "IHDR": {
      const width = data.getUint32(0, isLittleEndian);
      const height = data.getUint32(4, isLittleEndian);
      const bitDepth = data.getUint8(8, isLittleEndian);
      const colorType = data.getUint8(9, isLittleEndian);
      const compressionMethod = data.getUint8(10, isLittleEndian);
      const filterMethod = data.getUint8(11, isLittleEndian);
      const interlaceMethod = data.getUint8(12, isLittleEndian);
      console.log({
        width,
        height,
        bitDepth,
        colorType,
        compressionMethod,
        filterMethod,
        interlaceMethod,
      });
    }
    case "PLTE": {
    }
    case "IDAT": {
    }
    case "IEND": {
    }
    default: {
      console.log("chunk type - ", type);

      const criticalOrAncillary = chunkTypeBuffer.getUint8(0, isLittleEndian);
      const publicPrivate = chunkTypeBuffer.getUint8(1, isLittleEndian);
      const safeToCopy = chunkTypeBuffer.getUint8(3, isLittleEndian);

      const corA = isKthBitSet(criticalOrAncillary, 5)
        ? "ancillary"
        : "critical";
      const porp = isKthBitSet(publicPrivate, 5) ? "private" : "public";
      const sfc = isKthBitSet(safeToCopy, 5)
        ? "safe to copy"
        : "unsafe to copy";

      console.log({
        criticalOrAncillary,
        corA,
        publicPrivate,
        porp,
        safeToCopy,
        sfc,
      });
    }
  }
}

fs.readFile("./img.png", null, (err, data) => {
  const buff = data.buffer;

  const dataView = new DataView(buff);

  let chunk = 0;
  let index = 0;
  // while (true){

  while (index < 8) {
    // file signature
    const sign = dataView.getUint8(index, isLittleEndian);
    index++;
    console.log("sign of file ", sign);
  }

  while (index <= buff.byteLength) {
    let length = 0;
    try {
      length = dataView.getUint32(index, isLittleEndian);
      console.log("------");
    } catch (e) {
      return;
    }

    index = index + 4;
    console.log("chunk length", length);

    const typeTill = index + 4;

    let i = 0;
    let Ctype = "";
    const typeStart = index;
    while (index < typeTill) {
      const type = dataView.getUint8(index, isLittleEndian);
      index++;
      Ctype = Ctype + String.fromCharCode(type);
    }

    const bytesLength = index + length;
    let dStart = index;
    while (index < bytesLength) {
      const data = dataView.getUint8(index, isLittleEndian);
      index++;
      // console.log('chunk data', data);
    }

    interpretData(
      Ctype,
      new DataView(buff, dStart, length),
      new DataView(buff, typeStart, 4)
    );

    const till = index + 4;

    while (index < till) {
      const sign = dataView.getUint8(index, isLittleEndian);
      index++;
    }
  }
});
