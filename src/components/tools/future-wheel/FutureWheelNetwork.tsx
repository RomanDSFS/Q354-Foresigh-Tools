'use client';
import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, Node as RFNode, Edge as RFEdge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import type { Wheel } from '@/types/futures';

type Props = { wheel: Wheel };

export default function FutureWheelNetwork({ wheel }: Props) {
  // центр + кольца как стартовые координаты (радиально)
  const rf = useMemo(() => {
    const nodes: RFNode[] = [];
    const edges: RFEdge[] = [];
    const center = wheel.nodes.find(n => n.id === wheel.centerId)!;

    // центр
    nodes.push({
      id: center.id,
      position: { x: 0, y: 0 },
      data: { label: center.title },
      style: { borderRadius: 10, padding: 8, fontSize: 12, background: '#e6f0ff', border: '1px solid #2563eb' }
    });

    // L1/L2/L3 радиальное размещение (как старт)
    const byLevel = (lvl: 1|2|3) => wheel.nodes.filter(n => n.level === lvl);
    //const radius = {1: 240, 2: 420, 3: 600} as const;
    const radius = {1:140,2:260,3:380} as const;
    
    ( [1,2,3] as const ).forEach(lvl => {
      const arr = byLevel(lvl);
      const K = Math.max(1, arr.length);
      arr.forEach((n, i) => {
        const a = -Math.PI/2 + (i * 2*Math.PI)/K;
        const x = radius[lvl] * Math.cos(a);
        const y = radius[lvl] * Math.sin(a);
        nodes.push({
          id: n.id,
          position: { x, y },
          data: { label: n.title },
          style: { borderRadius: 8, padding: 8, fontSize: 12, background: '#fff', border: '1px solid #cbd5e1' }
        });
        if (n.parentId) {
          edges.push({
            id: `e-${n.parentId}-${n.id}`,
            source: n.parentId,
            target: n.id,
            markerEnd: { type: MarkerType.ArrowClosed },
            type: 'smoothstep',
            style: { stroke: '#94a3b8' }
          });
        }
      });
    });

    // центрируем все узлы
    const pad = 50;
    const transform = (v:number) => v + radius[3]/2 + pad;
    nodes.forEach(n => { n.position.x = transform(n.position.x); n.position.y = transform(n.position.y); });

    return { nodes, edges };
  }, [wheel]);

  return (
    <div className="h-[720px] w-[100%] border rounded-md">
      <ReactFlow nodes={rf.nodes} edges={rf.edges} fitView nodesDraggable nodesConnectable={false}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
