export const trimParentheses = (str: string): string => {
  return str.replace(/ *\([^)]*\) */g, "");
};
