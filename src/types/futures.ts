// src/types/futures.ts
export type Domain = "S" | "T" | "E" | "Ecology" | "P" | "V";

export type Node = {
  id: string;
  title: string;
  level: 0 | 1 | 2 | 3;
  parentId?: string;
  p?: number; // вероятность (0..1)
  i?: number; // влияние (-3..3)
  domain?: Domain;
};

export type Wheel = {
  centerId: string;
  nodes: Node[];
};
