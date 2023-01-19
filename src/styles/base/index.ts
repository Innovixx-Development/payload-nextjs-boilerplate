export const htmlFontSize = 16;

export const baselinePX = 20;

export const base = (multiplier = 1): string => `${(baselinePX / htmlFontSize) * multiplier}rem`;
