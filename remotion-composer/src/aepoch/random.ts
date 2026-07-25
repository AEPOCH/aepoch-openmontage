const toUint32 = (value: number): number => value >>> 0;

export const createSeededRandom = (seed: number): (() => number) => {
  let state = toUint32(seed || 1);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

export const seededRange = (seed: number, min: number, max: number): number =>
  min + createSeededRandom(seed)() * (max - min);

