import { createMask } from "imask";

const telephoneMask = (value: string) => {
  const phoneMaskFormat = createMask({ mask: "(00) 00000-0000" });
  return phoneMaskFormat.resolve(value);
};

export { telephoneMask };
