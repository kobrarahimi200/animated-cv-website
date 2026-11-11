/** Feature check kept separate from Three.js so it can run before the 3D bundle loads. */
export function isWebGLAvailable(): boolean {
  try {
    const probe = document.createElement('canvas');
    return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}
