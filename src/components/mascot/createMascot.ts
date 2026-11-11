import {
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import type { PointerState } from '@/composables/usePointer';
import { MASCOT_BASE_SRC, MASCOT_IMAGE, MASCOT_IRIS_SRC } from './mascotImage';

export interface MascotOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  /** Called when the illustration fails to load, so the host can show the fallback. */
  onError?: () => void;
}

export interface MascotHandle {
  setVisible(visible: boolean): void;
  wave(): void;
  dispose(): void;
}

/** Plane edge length in scene units; leaves room for the figure to drift toward the cursor. */
const PLANE_SIZE = 2.3;
const CAMERA_Z = 5.4;
const WAVE_DURATION = 2.2;
const BLINK_DURATION = 0.2;
const LOW_POWER_QUERY = '(pointer: coarse), (max-width: 900px)';

/** How far the figure leans and drifts toward the cursor, in scene units and radians. */
const FOLLOW = { yaw: 0.3, pitch: 0.22, shiftX: 0.2, shiftY: 0.14 } as const;

/** Eye apertures in pixels of the 768×768 cut-out, used for the blink overlay. */
const EYES = [
  { cx: 306, top: 365, height: 65, width: 86 },
  { cx: 467, top: 355, height: 70, width: 84 },
] as const;
const LID_COLOR = '#f4c7ae';
const LASH_COLOR = '#4a2c20';

/** Iris centres and sprite sizes in pixels; each sprite is cut from the illustration. */
const IRISES = [
  { key: 'left', cx: 315, cy: 397, width: 65, height: 67 },
  { key: 'right', cx: 457, cy: 392, width: 65, height: 67 },
] as const;
/** How far each pupil may travel inside its eye, in pixels of the 768×768 cut-out. */
const PUPIL_TRAVEL = { x: 6, y: 3 } as const;
const GAZE_GAIN = 1.4;

/** Frame-rate independent exponential smoothing. */
function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Image pixel → coordinates on the cropped plane. */
const toPlaneX = (px: number) => (px / MASCOT_IMAGE.width - 0.5) * PLANE_SIZE;
const toPlaneY = (py: number) => (0.5 - py / MASCOT_IMAGE.height) * PLANE_SIZE;
const toPlaneLength = (px: number) => (px / MASCOT_IMAGE.width) * PLANE_SIZE;

/** Skin-coloured eyelid that scales down from the top edge of an eye to close it. */
function buildLid(eye: (typeof EYES)[number]): Group {
  const width = toPlaneLength(eye.width + 8);
  const height = toPlaneLength(eye.height);
  const group = new Group();
  group.position.set(toPlaneX(eye.cx), toPlaneY(eye.top), 0.01);

  const patch = new Mesh(
    new PlaneGeometry(width, height).translate(0, -height / 2, 0),
    new MeshBasicMaterial({ color: LID_COLOR }),
  );
  const lash = new Mesh(new PlaneGeometry(width * 0.92, height * 0.05), new MeshBasicMaterial({ color: LASH_COLOR }));
  lash.position.set(0, -height, 0.001);

  group.add(patch, lash);
  group.scale.y = 0;
  return group;
}

/** Pupil sprite placed over its eye; hidden until its texture loads so no blank square shows. */
function buildIris(eye: (typeof IRISES)[number]): Mesh {
  const material = new MeshBasicMaterial({ transparent: true, alphaTest: 0.04, depthWrite: false });
  const mesh = new Mesh(new PlaneGeometry(toPlaneLength(eye.width), toPlaneLength(eye.height)), material);
  mesh.position.set(toPlaneX(eye.cx), toPlaneY(eye.cy), 0.005);
  mesh.renderOrder = 1;
  mesh.visible = false;
  return mesh;
}

/**
 * Renders the kawaii illustration as a textured 3D plane.
 * The plane tilts toward the cursor, floats, breathes, sways when waving and blinks.
 * Throws when WebGL is unavailable so the host can switch to the fallback image.
 */
export function createMascot(options: MascotOptions, pointer: PointerState): MascotHandle {
  const { canvas, reducedMotion, onError } = options;
  const lowPower = window.matchMedia(LOW_POWER_QUERY).matches;

  const renderer = new WebGLRenderer({ canvas, antialias: !lowPower, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, CAMERA_Z);

  const pivot = new Group();
  const material = new MeshBasicMaterial({ transparent: true, alphaTest: 0.04, depthWrite: false });
  const body = new Mesh(new PlaneGeometry(PLANE_SIZE, PLANE_SIZE), material);
  const irises = IRISES.map((eye) => buildIris(eye));
  const lids = EYES.map((eye) => buildLid(eye));
  pivot.add(body, ...irises, ...lids);
  lids.forEach((lid) => lid.traverse((child) => (child.renderOrder = 2)));
  scene.add(pivot);

  const textures: Texture[] = [];
  let disposed = false;
  let visible = true;
  let rafId = 0;
  let lastTime = performance.now();
  let elapsed = 0;
  let followX = 0;
  let followY = 0;
  let gazeX = 0;
  let gazeY = 0;
  let waveStart: number | null = null;
  let blinkStart: number | null = null;
  let nextBlink = 2 + Math.random() * 2;

  function pose(dt: number, t: number) {
    if (reducedMotion) return;

    pivot.rotation.y = damp(pivot.rotation.y, -pointer.x * FOLLOW.yaw, 4, dt);
    pivot.rotation.x = damp(pivot.rotation.x, -pointer.y * FOLLOW.pitch, 4, dt);
    followX = damp(followX, pointer.x * FOLLOW.shiftX, 3, dt);
    followY = damp(followY, -pointer.y * FOLLOW.shiftY, 3, dt);
    pivot.position.x = followX;

    const waveTime = waveStart === null ? -1 : t - waveStart;
    const waving = waveTime >= 0 && waveTime < WAVE_DURATION;
    const waveEnvelope = waving ? Math.exp(-waveTime * 1.1) : 0;
    pivot.rotation.z = Math.sin(t * 0.8) * 0.012 + Math.sin(waveTime * 9) * 0.05 * waveEnvelope;

    pivot.position.y = followY + Math.sin(t * 1.3) * 0.04;
    pivot.scale.setScalar(1 + Math.sin(t * 1.8) * 0.006);

    if (t >= nextBlink) {
      blinkStart = t;
      nextBlink = t + 2.8 + Math.random() * 2.4;
    }
    const blinkTime = blinkStart === null ? -1 : t - blinkStart;
    const closed = blinkTime >= 0 && blinkTime < BLINK_DURATION ? Math.sin((Math.PI * blinkTime) / BLINK_DURATION) : 0;
    for (const lid of lids) lid.scale.y = closed;

    gazeX = damp(gazeX, clamp(pointer.x * GAZE_GAIN, -1, 1), 7, dt);
    gazeY = damp(gazeY, clamp(pointer.y * GAZE_GAIN, -1, 1), 7, dt);
    IRISES.forEach((eye, index) => {
      const iris = irises[index];
      if (!iris) return;
      iris.position.x = toPlaneX(eye.cx) + toPlaneLength(gazeX * PUPIL_TRAVEL.x);
      // Pointer y grows downward while the plane's y grows upward.
      iris.position.y = toPlaneY(eye.cy) - toPlaneLength(gazeY * PUPIL_TRAVEL.y);
    });
  }

  function renderFrame() {
    renderer.render(scene, camera);
  }

  function frame(now: number) {
    rafId = 0;
    const dt = clamp((now - lastTime) / 1000, 0, 0.1);
    lastTime = now;
    elapsed += dt;
    pose(dt, elapsed);
    renderFrame();
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (reducedMotion || rafId || disposed || !visible || document.hidden) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function resize() {
    const width = canvas.clientWidth || 240;
    const height = canvas.clientHeight || width;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (reducedMotion) renderFrame();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  function loadTexture(src: string, onLoad: (texture: Texture) => void, onFail?: () => void) {
    new TextureLoader().load(
      src,
      (loaded) => {
        if (disposed) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = SRGBColorSpace;
        loaded.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        textures.push(loaded);
        onLoad(loaded);
        if (reducedMotion) renderFrame();
      },
      undefined,
      () => onFail?.(),
    );
  }

  loadTexture(
    MASCOT_BASE_SRC,
    (loaded) => {
      material.map = loaded;
      material.needsUpdate = true;
    },
    () => onError?.(),
  );

  IRISES.forEach((eye, index) => {
    const iris = irises[index];
    if (!iris) return;
    loadTexture(MASCOT_IRIS_SRC[eye.key], (loaded) => {
      const irisMaterial = iris.material as MeshBasicMaterial;
      irisMaterial.map = loaded;
      irisMaterial.needsUpdate = true;
      iris.visible = true;
    });
  });

  start();

  return {
    setVisible(next: boolean) {
      visible = next;
      if (next) start();
      else stop();
    },
    wave() {
      if (!reducedMotion) waveStart = elapsed;
    },
    dispose() {
      disposed = true;
      stop();
      observer.disconnect();
      pivot.traverse((node: Object3D) => {
        if (node instanceof Mesh) {
          node.geometry.dispose();
          (node.material as Material).dispose();
        }
      });
      for (const texture of textures) texture.dispose();
      renderer.dispose();
    },
  };
}
