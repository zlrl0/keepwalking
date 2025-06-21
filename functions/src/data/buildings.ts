// src/data/buildings.ts
export type Building = {
  name: string;
  lat: number;
  lng: number;
};
export const buildings = [
  { name: '다빈치관(중심)',     lat: 37.504111, lng: 126.95694 },
  { name: '원형관',            lat: 37.0057086, lng: 127.2306377 },
  { name: '국악관',            lat: 37.50425,  lng: 126.95700 },
  { name: '학식당',            lat: 37.50390,  lng: 126.95680 },
  { name: '공학관',            lat: 37.00771,  lng: 127.2293 },
  { name: '도서관(중앙도서관)', lat: 37.00316, lng: 127.2312 },
  { name: '체육관',            lat: 37.00205,  lng: 127.2308 },
];
