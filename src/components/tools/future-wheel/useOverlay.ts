// src/components/tools/future-wheel/useOverlay.ts
import { useCallback, useLayoutEffect, useState } from 'react';
import type { Wheel, Node } from '@/types/futures'; // ← добавлен Node
import { R, CX, CY } from './constants';
import { polar } from './geometry';

type OverlayRect = { x: number; y: number; w: number; h: number; angle: number; level: 0 | 1 | 2 | 3 };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const chord = (r: number, ang: number) => 2 * r * Math.sin(Math.max(0, ang) / 2);
const angFromWidth = (w: number, r: number) => 2 * Math.asin(clamp(w / (2 * r), 0, 0.99));

export function useOverlayRects(
  wheel: Wheel,
  l1Angles: { id: string; angle: number; span: number }[],
  childrenOf: (id: string, lvl: 2 | 3) => Node[] // ← заменено any[] → Node[]
) {
  const [rects, setRects] = useState<Record<string, OverlayRect>>({});

  const compute = useCallback(() => {
    const out: Record<string, OverlayRect> = {};

    // центр
    const center = wheel.nodes.find(n => n.id === wheel.centerId)!;
    out[center.id] = {
      x: CX - (R.center * 2 - 20) / 2,
      y: CY - 22,
      w: R.center * 2 - 20,
      h: 44,
      angle: 0,
      level: 0,
    };

    // -------- helpers for L2/L3
    function placeLevel(
      parentAngle: number,
      parentSpan: number,
      level: 2 | 3,
      children: Node[], // ← заменено any[] → Node[]
      radius: number,
      h: number,
      maxW: number,
      minW: number,
      padFactor = 0.85
    ) {
      const baseSpan = parentSpan * (level === 2 ? 0.32 : 0.24);
      const K = Math.max(1, children.length);
      const targetAngles = children.map((_, i) => {
        const off = ((i - (K - 1) / 2) / Math.max(1, K)) * (baseSpan * 0.9);
        return parentAngle + off;
      });

      const availablePerItem = (baseSpan * padFactor) / K;
      const chordAvail = chord(radius, availablePerItem);
      const wTarget = clamp(chordAvail, minW, maxW);
      const minSep = angFromWidth(wTarget, radius);

      const leftBound = parentAngle - baseSpan / 2 + minSep / 2;
      const rightBound = parentAngle + baseSpan / 2 - minSep / 2;

      const placed: number[] = [];
      targetAngles.forEach((a, idx) => {
        let ang = clamp(a, leftBound, rightBound);
        if (idx > 0) ang = Math.max(ang, placed[idx - 1] + minSep);
        ang = Math.min(ang, rightBound - (K - 1 - idx) * minSep);
        placed.push(ang);

        const [cx, cy] = polar(CX, CY, radius, ang);
        out[children[idx].id] = {
          x: cx - wTarget / 2,
          y: cy - h / 2,
          w: wTarget,
          h,
          angle: ang,
          level,
        };
      });
    }

    // -------- L1 + их дети
    l1Angles.forEach(({ id, angle, span }) => {
      const r1 = R.center * 0.45 + R.l1 * 0.55;
      const [cx1, cy1] = polar(CX, CY, r1, angle);
      const w1 = clamp(chord(r1, span * 0.42), 140, 240);
      out[id] = { x: cx1 - w1 / 2, y: cy1 - 30, w: w1, h: 60, angle, level: 1 };

      // L2
      const l2kids = childrenOf(id, 2);
      if (l2kids.length) {
        placeLevel(angle, span, 2, l2kids, R.l1 * 0.55 + R.l2 * 0.45, 56, 220, 120);

        // L3 для каждого L2
        l2kids.forEach(child => {
          // ← убрали j и arr, так как они не используются
          const l3kids = childrenOf(child.id, 3);
          if (!l3kids.length) return;

          const a2 = out[child.id].angle;
          const span3 = span * 0.22;

          placeLevel(a2, span3, 3, l3kids, R.l2 * 0.55 + R.l3 * 0.45, 50, 200, 110, 0.8);
        });
      }
    });

    setRects(out);
  }, [wheel, l1Angles, childrenOf]);

  useLayoutEffect(() => {
    compute();
  }, [compute, wheel]);

  return rects;
}