// src/components/tools/future-wheel/FutureWheelSVG.tsx
import React from 'react';
import type { Wheel, Node } from '@/types/futures'; // ← импортируем Node
import { R, SIZE, CX, CY } from './constants';
import { ringSector } from './geometry';
import { colorByImpact, alphaByP } from './color';

type Props = {
  wheel: Wheel;
  l1Angles: { id: string; angle: number; span: number }[];
  childrenOf: (id: string, lvl: 2 | 3) => Node[]; // ← используем Node[]
};

export default function FutureWheelSVG({ wheel, l1Angles, childrenOf }: Props) {
  const SHOW_SECTORS = false; // ← выключаем цветные сегменты
  return (
    <svg
      width={SIZE}
      height={SIZE}
      style={{ width: SIZE, height: SIZE, display: 'block' }}
      className="bg-gray-200 rounded-full border border-gray-600 shadow-sm"
    >
      <circle cx={CX} cy={CY} r={R.center} fill="#dbeafe" stroke="#2563eb" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={R.l1} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={R.l2} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={R.l3 - 5} fill="none" stroke="#94a3b8" strokeWidth={3} />

      {SHOW_SECTORS &&
        l1Angles.map(({ id, angle, span }) => {
          const n = wheel.nodes.find(x => x.id === id)!;
          const p1 = ringSector(R.center, R.l1, angle - span / 2, angle + span / 2);
          return (
            <g key={id}>
              <path
                d={p1}
                fill={colorByImpact(n.i)}
                fillOpacity={alphaByP(n.p)}
                stroke="#475569"
                strokeWidth={0.8}
              />
              {childrenOf(id, 2).map((c: Node, j: number, arr: Node[]) => {
                const off = ((j - (arr.length - 1) / 2) / Math.max(1, arr.length)) * (Math.PI / 6);
                const p2 = ringSector(R.l1, R.l2, angle + off - span / 10, angle + off + span / 10);
                return (
                  <g key={c.id}>
                    <path
                      d={p2}
                      fill={colorByImpact(c.i)}
                      fillOpacity={alphaByP(c.p)}
                      stroke="#64748b"
                      strokeWidth={0.7}
                    />
                    {childrenOf(c.id, 3).map((g: Node, jj: number, arr3: Node[]) => {
                      const off3 =
                        ((jj - (arr3.length - 1) / 2) / Math.max(1, arr3.length)) * (Math.PI / 10);
                      const p3 = ringSector(
                        R.l2,
                        R.l3,
                        angle + off + off3 - span / 26,
                        angle + off + off3 + span / 26
                      );
                      return (
                        <path
                          key={g.id}
                          d={p3}
                          fill={colorByImpact(g.i)}
                          fillOpacity={alphaByP(g.p)}
                          stroke="#94a3b8"
                          strokeWidth={0.6}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </g>
          );
        })}
    </svg>
  );
}