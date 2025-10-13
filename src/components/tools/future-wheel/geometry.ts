import * as d3 from 'd3-shape';

export function polar(cx: number, cy: number, r: number, a: number) {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

const arcGen = d3.arc();
export const ringSector = (r0:number, r1:number, a0:number, a1:number) =>
  arcGen({ innerRadius: r0, outerRadius: r1, startAngle: a0, endAngle: a1 }) || '';
