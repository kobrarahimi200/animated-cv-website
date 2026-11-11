/**
 * Code-rain column model used by the hero canvas. No DOM imports, so it can be unit tested.
 */

export interface RainColumn {
  x: number;
  /** Y position of the leading glyph in px. Glyphs trail upward from it. */
  head: number;
  /** Fall speed in px/s before any boost. */
  speed: number;
  /** Number of glyphs in the trail. */
  length: number;
  glyphs: string[];
}

export const RAIN_GLYPHS = ['0', '1', '<', '/', '>', '{', '}', '(', ')', ';', '=', '+'];

type Random = () => number;

function pickGlyph(random: Random): string {
  return RAIN_GLYPHS[Math.floor(random() * RAIN_GLYPHS.length)] ?? '0';
}

/** Gives a column a fresh trail and starts it above the top edge. */
function resetColumn(column: RainColumn, height: number, random: Random): void {
  column.length = 6 + Math.floor(random() * 10);
  column.glyphs = Array.from({ length: column.length }, () => pickGlyph(random));
  column.speed = 40 + random() * 80;
  column.head = -random() * height * 0.5;
}

export function createRainColumns(
  width: number,
  height: number,
  spacing: number,
  random: Random = Math.random,
): RainColumn[] {
  const count = Math.ceil(width / spacing);
  return Array.from({ length: count }, (_, i) => {
    const column: RainColumn = { x: i * spacing + spacing / 2, head: 0, speed: 0, length: 0, glyphs: [] };
    resetColumn(column, height, random);
    column.head = random() * height;
    return column;
  });
}

/**
 * Advances every column. `boost` multiplies the fall speed (used for scroll reaction).
 * A column that has fully left the bottom edge is respawned above the top.
 */
export function stepRain(
  columns: RainColumn[],
  dt: number,
  boost: number,
  height: number,
  lineHeight: number,
  random: Random = Math.random,
): void {
  for (const column of columns) {
    column.head += column.speed * boost * dt;
    if (column.head - column.length * lineHeight > height) {
      resetColumn(column, height, random);
    }
  }
}
