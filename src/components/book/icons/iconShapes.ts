import type { IconName } from '@/types/portfolio';

export interface IconShape {
  tag: 'path' | 'circle' | 'rect' | 'line';
  attrs: Record<string, string | number>;
}

/** Stroke-based 24×24 icon geometry, drawn in the book's ink colour. */
export const ICON_SHAPES: Record<IconName, IconShape[]> = {
  code: [
    { tag: 'path', attrs: { d: 'M8 7 3 12l5 5' } },
    { tag: 'path', attrs: { d: 'M16 7l5 5-5 5' } },
    { tag: 'line', attrs: { x1: 14, y1: 4, x2: 10, y2: 20 } },
  ],
  server: [
    { tag: 'rect', attrs: { x: 3, y: 4, width: 18, height: 6, rx: 2 } },
    { tag: 'rect', attrs: { x: 3, y: 14, width: 18, height: 6, rx: 2 } },
    { tag: 'circle', attrs: { cx: 7, cy: 7, r: 0.8 } },
    { tag: 'circle', attrs: { cx: 7, cy: 17, r: 0.8 } },
  ],
  layers: [
    { tag: 'path', attrs: { d: 'M12 3 3 8l9 5 9-5-9-5Z' } },
    { tag: 'path', attrs: { d: 'm3 13 9 5 9-5' } },
    { tag: 'path', attrs: { d: 'm3 17 9 5 9-5' } },
  ],
  cloud: [
    { tag: 'path', attrs: { d: 'M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10a4 4 0 0 1 .5 7.97H7Z' } },
  ],
  users: [
    { tag: 'circle', attrs: { cx: 9, cy: 8, r: 3.2 } },
    { tag: 'path', attrs: { d: 'M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5' } },
    { tag: 'path', attrs: { d: 'M16 5.2a3.2 3.2 0 0 1 0 6.1' } },
    { tag: 'path', attrs: { d: 'M18 15c1.6.6 2.7 2.2 3 5' } },
  ],
  mail: [
    { tag: 'rect', attrs: { x: 3, y: 5, width: 18, height: 14, rx: 2 } },
    { tag: 'path', attrs: { d: 'm4 7 8 6 8-6' } },
  ],
  linkedin: [
    { tag: 'rect', attrs: { x: 3, y: 3, width: 18, height: 18, rx: 3 } },
    { tag: 'line', attrs: { x1: 8, y1: 10, x2: 8, y2: 16 } },
    { tag: 'circle', attrs: { cx: 8, cy: 7.2, r: 0.9 } },
    { tag: 'path', attrs: { d: 'M12 16v-6m0 2.5c0-1.4 1-2.5 2.3-2.5S16.5 11.1 16.5 12.5V16' } },
  ],
  github: [
    { tag: 'path', attrs: { d: 'M9 19c-4 1.3-4-2-5.5-2.5M14.5 21.5v-3.2c0-1 .1-1.4-.6-2 2.8-.3 5.6-1.4 5.6-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.8 4.1 5.8 4.4 5.8 4.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 10.8c0 4.6 2.8 5.7 5.6 6-.5.5-.6 1-.7 1.9' } },
  ],
  globe: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 9 } },
    { tag: 'path', attrs: { d: 'M3 12h18' } },
    { tag: 'path', attrs: { d: 'M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z' } },
  ],
  database: [
    { tag: 'path', attrs: { d: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z' } },
    { tag: 'path', attrs: { d: 'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6' } },
    { tag: 'path', attrs: { d: 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3' } },
  ],
  graduation: [
    { tag: 'path', attrs: { d: 'M12 4 2 9l10 5 10-5-10-5Z' } },
    { tag: 'path', attrs: { d: 'M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5' } },
    { tag: 'line', attrs: { x1: 22, y1: 9, x2: 22, y2: 15 } },
  ],
  briefcase: [
    { tag: 'rect', attrs: { x: 3, y: 7, width: 18, height: 13, rx: 2 } },
    { tag: 'path', attrs: { d: 'M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' } },
    { tag: 'line', attrs: { x1: 3, y1: 13, x2: 21, y2: 13 } },
  ],
  tool: [
    { tag: 'path', attrs: { d: 'M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 .7-3.3a4 4 0 0 0-5-5L3 7l3-3 3 .7-.6 3 3 .6' } },
  ],
};
