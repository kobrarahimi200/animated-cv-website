/**
 * Spring-based dot field used as the page background. No DOM imports, so it can be unit tested.
 *
 * Each dot rests on a grid point. The pointer pushes nearby dots outward, and a spring pulls
 * them back, so the field ripples away from the cursor and settles when the pointer is still.
 */

export interface Dot {
  x: number;
  y: number;
  /** Resting position. */
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

export interface PixelPointer {
  x: number;
  y: number;
}

export interface PixelPhysics {
  /** Influence radius of the pointer in px. */
  radius: number;
  /** Push strength near the pointer, in px/s² at the centre. */
  push: number;
  /** Spring stiffness pulling dots back to rest. */
  spring: number;
  /** Velocity retained per 1/60 s frame. */
  friction: number;
}

export const DEFAULT_PIXEL_PHYSICS: PixelPhysics = {
  radius: 140,
  push: 4500,
  spring: 80,
  friction: 0.86,
};

const SETTLED_DISTANCE = 0.05;
const SETTLED_SPEED = 0.5;

export function createDotGrid(width: number, height: number, spacing: number): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacing + spacing / 2;
      const y = row * spacing + spacing / 2;
      dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }
  }
  return dots;
}

/** Advances every dot by `dt` seconds. Returns true while any dot is still moving. */
export function stepDots(
  dots: Dot[],
  pointer: PixelPointer | null,
  dt: number,
  physics: PixelPhysics = DEFAULT_PIXEL_PHYSICS,
): boolean {
  const damping = Math.pow(physics.friction, dt * 60);
  let moving = false;

  for (const dot of dots) {
    if (pointer) {
      const dx = dot.x - pointer.x;
      const dy = dot.y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.0001 && dist < physics.radius) {
        const falloff = 1 - dist / physics.radius;
        const impulse = falloff * falloff * physics.push * dt;
        dot.vx += (dx / dist) * impulse;
        dot.vy += (dy / dist) * impulse;
      }
    }

    dot.vx += (dot.ox - dot.x) * physics.spring * dt;
    dot.vy += (dot.oy - dot.y) * physics.spring * dt;
    dot.vx *= damping;
    dot.vy *= damping;
    dot.x += dot.vx * dt;
    dot.y += dot.vy * dt;

    if (
      Math.abs(dot.x - dot.ox) > SETTLED_DISTANCE ||
      Math.abs(dot.y - dot.oy) > SETTLED_DISTANCE ||
      Math.abs(dot.vx) > SETTLED_SPEED ||
      Math.abs(dot.vy) > SETTLED_SPEED
    ) {
      moving = true;
    }
  }

  return moving;
}
