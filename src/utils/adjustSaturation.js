import * as THREE from 'three';

export const adjustSaturation = (hex, saturationPercent = 70) => {
  const hsl = new THREE.Color(hex).getHSL({}); // convert to HSL
  return new THREE.Color().setHSL(hsl.h, hsl.s * (saturationPercent / 100), hsl.l).getStyle();
};