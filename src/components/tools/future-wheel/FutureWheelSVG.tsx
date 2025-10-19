// src/components/tools/future-wheel/FutureWheelSVG.tsx
import React, { useMemo } from 'react';
import type { Wheel, Node as WheelNode } from '@/types/futures';
import { R, SIZE, CX, CY } from './constants';
import { ringSector } from './geometry';
import { colorByImpact, alphaByP } from './color';

type L1Angle = { id: string; angle: number; span: number };

type Props = {
  wheel: Wheel;
  l1Angles: L1Angle[];
  childrenOf: (id: string, lvl: 2 | 3) => WheelNode[];
  showSectors?: boolean;
  className?: string;
  title?: string;
  description?: string;
};

const STROKES = { ring: 1.5, outer: 3, center: 2, s1: 0.8, s2: 0.7, s3: 0.6 };

function FutureWheelSVG({
  wheel,
  l1Angles,
  childrenOf,
  showSectors = false,
  className,
  title = 'Колесо будущего',
  description = 'Центральное событие и три концентрических кольца с последствиями первого, второго и третьего уровня',
}: Props) {
  const sectorLayers = useMemo(() => {
    if (!showSectors) return null;
    return l1Angles.map(({ id, angle, span }) => {
      const n = wheel.nodes.find((x) => x.id === id);
      if (!n) return null;
      const p1 = ringSector(R.center, R.l1, angle - span / 2, angle + span / 2);
      const lvl2 = childrenOf(id, 2);
      const lvl2Groups = lvl2.map((c, j, arr) => {
        const off = ((j - (arr.length - 1) / 2) / Math.max(1, arr.length)) * (Math.PI / 6);
        const p2 = ringSector(R.l1, R.l2, angle + off - span / 10, angle + off + span / 10);
        const lvl3 = childrenOf(c.id, 3);
        const lvl3Paths = lvl3.map((g, jj, arr3) => {
          const off3 =
            ((jj - (arr3.length - 1) / 2) / Math.max(1, arr3.length)) * (Math.PI / 10);
          const p3 = ringSector(
            R.l2,
            R.l3,
            angle + off + off3 - span / 26,
            angle + off + off3 + span / 26,
          );
          return { id: g.id, d: p3, impact: g.i, prob: g.p };
        });
        return { id: c.id, d: p2, impact: c.i, prob: c.p, lvl3Paths };
      });
      return { id, d: p1, impact: n.i, prob: n.p, lvl2Groups };
    });
  }, [showSectors, l1Angles, wheel.nodes, childrenOf]);

  const svgStyle: React.CSSProperties = {
    width: SIZE,
    height: SIZE,
    display: 'block',
    background: 'var(--fw-bg, #e5e7eb)',           // fallback: gray-200
    borderColor: 'var(--fw-ring-stroke, #475569)',  // fallback: slate-600
  };

  return (
    <svg
      width={SIZE}
      height={SIZE}
      role="img"
      aria-label={title}
      className={['rounded-full border shadow-sm', className].filter(Boolean).join(' ')}
      style={svgStyle} // ← единый style
    >
      <title>{title}</title>
      <desc>{description}</desc>

      <circle
        cx={CX}
        cy={CY}
        r={R.center}
        fill="var(--fw-center-fill, #dbeafe)"
        stroke="var(--fw-center-stroke, #2563eb)"
        strokeWidth={STROKES.center}
      />
      <circle cx={CX} cy={CY} r={R.l1} fill="none" stroke="var(--fw-ring-stroke, #94a3b8)" strokeWidth={STROKES.ring} />
      <circle cx={CX} cy={CY} r={R.l2} fill="none" stroke="var(--fw-ring-stroke, #94a3b8)" strokeWidth={STROKES.ring} />
      <circle cx={CX} cy={CY} r={R.l3 - 5} fill="none" stroke="var(--fw-outer-ring-stroke, #94a3b8)" strokeWidth={STROKES.outer} />

      {sectorLayers &&
        sectorLayers.map((lvl1) => {
          if (!lvl1) return null;
          return (
            <g key={lvl1.id} pointerEvents="none">
              <path
                d={lvl1.d}
                fill={colorByImpact(lvl1.impact)}
                fillOpacity={alphaByP(lvl1.prob)}
                stroke="var(--fw-ring-stroke, #475569)"
                strokeWidth={STROKES.s1}
              />
              {lvl1.lvl2Groups.map((c) => (
                <g key={c.id}>
                  <path
                    d={c.d}
                    fill={colorByImpact(c.impact)}
                    fillOpacity={alphaByP(c.prob)}
                    stroke="var(--fw-ring-stroke, #64748b)"
                    strokeWidth={STROKES.s2}
                  />
                  {c.lvl3Paths.map((g) => (
                    <path
                      key={g.id}
                      d={g.d}
                      fill={colorByImpact(g.impact)}
                      fillOpacity={alphaByP(g.prob)}
                      stroke="var(--fw-ring-stroke, #94a3b8)"
                      strokeWidth={STROKES.s3}
                    />
                  ))}
                </g>
              ))}
            </g>
          );
        })}
    </svg>
  );
}

export default React.memo(FutureWheelSVG);
