export const generateColorsBetween = ({ startColor, endColor, count }: {
  startColor: string,
  endColor: string,
  count: number
}): string[] => {

  // Преобразуем hex-строки в RGB-значения
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);

  // Генерируем массив цветов между начальным и конечным цветами
  const colors = [];
  for (let i = 0; i < count; i++) {
    const r = startRGB.r + ((endRGB.r - startRGB.r) * i) / (count - 1);
    const g = startRGB.g + ((endRGB.g - startRGB.g) * i) / (count - 1);
    const b = startRGB.b + ((endRGB.b - startRGB.b) * i) / (count - 1);
    const color = rgbToHex(Math.round(r), Math.round(g), Math.round(b));
    colors.push(color);
  }

  return colors;
}
/** Преобразование hex-строки в RGB-значения */
export const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
/** Преобразование RGB-значений в hex-строку */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}

/**
 * @description Формула относительной яркости.
 * @description Y = 0.2126R + 0.7152G + 0.0722B.
 * {@link https://en.wikipedia.org/wiki/Relative_luminance }
 * */

export const getContrastTextColor = (bgColor: string) => {
  // Преобразуем hex-строку в RGB-значения
  const { r, g, b } = hexToRGB(bgColor);

  // Вычисляем яркость цвета по формуле Y = 0.2126 R + 0.7152 G + 0.0722 B
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  /**
   * Значение 128 соответствует середине диапазона яркости от 0 до 255, где 0 - это абсолютный черный цвет,
   * а 255 - абсолютный белый цвет. Таким образом, если яркость заданного цвета больше 128, то он более светлый,
   * и для контраста с ним следует использовать черный цвет текста.
   * */
  const BRIGHTNESS_BREAKPOINT = 170

  return brightness > BRIGHTNESS_BREAKPOINT ? '#000000' : '#FFFFFF';
}
