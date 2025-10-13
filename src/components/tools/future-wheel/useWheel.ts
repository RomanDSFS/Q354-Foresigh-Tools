import { useMemo, useCallback, useState } from 'react';
import type { Wheel, Node } from '@/types/futures';

export function useWheelState(initial: Wheel) {
  const [wheel, setWheel] = useState<Wheel>(initial);

  const center = wheel.nodes.find(n => n.id === wheel.centerId)!;
  const l1 = useMemo(
    () => wheel.nodes.filter(n => n.level === 1 && n.parentId === center.id),
    [wheel, center.id]
  );

  const childrenOf = useCallback(
    (id: string, lvl: 2|3) => wheel.nodes.filter(n => n.parentId === id && n.level === lvl),
    [wheel.nodes]
  );

  const l1Angles = useMemo(() => {
    const K = Math.max(1, l1.length);
    return l1.map((n, i) => ({ id: n.id, angle: -Math.PI/2 + (i * 2*Math.PI)/K, span: 2*Math.PI/K }));
  }, [l1]);

  const updateTitle = (id: string, title: string) =>
    setWheel(w => ({...w, nodes: w.nodes.map(n => n.id===id ? {...n, title} : n)}));

  const addChild = (parent: Node) =>
    setWheel(w => {
      const lvl = (parent.level + 1) as 1|2|3;
      const newNode: Node = { id: crypto.randomUUID(), title: `EDIT NEW EFFECT R${lvl}`, level: lvl, parentId: parent.id, p: 0.6, i: 1 };
      return { ...w, nodes: [...w.nodes, newNode] };
    });

  const removeNode = (id: string) =>
    setWheel(w => {
      const kill = new Set<string>(); const stack=[id];
      while (stack.length) {
        const cur = stack.pop()!; kill.add(cur);
        w.nodes.forEach(n => { if (n.parentId === cur) stack.push(n.id); });
      }
      return { ...w, nodes: w.nodes.filter(n => !kill.has(n.id)) };
    });

  return { wheel, setWheel, center, l1Angles, childrenOf, updateTitle, addChild, removeNode };
}
