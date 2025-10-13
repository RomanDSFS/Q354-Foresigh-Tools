export const colorByImpact = (i?: number) => {
  if (i === undefined) return '#60a5fa';
  const t = Math.max(-3, Math.min(3, i));
  return t >= 0 ? `hsl(145 65% ${50 - t*5}%)` : `hsl(0 70% ${55 - Math.abs(t)*5}%)`;
};

export const alphaByP = (p?: number) =>
  p === undefined ? 0.95 : 0.75 + 0.25 * Math.max(0, Math.min(1, p));
