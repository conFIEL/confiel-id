export const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export const bufferToHex = (buffer: ArrayBuffer) => {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export const hexToBuffer = (hexString: string): Uint8Array => {
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }

  const result = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    if (isNaN(byte)) {
      throw new Error("Invalid hex string");
    }
    result[i / 2] = byte;
  }

  return result;
}
