/** Kawaii developer illustration with the background removed (transparent PNG, square). */
export const MASCOT_IMAGE_SRC = `${import.meta.env.BASE_URL}mascot/kobra-mascot.png`;

/** Same illustration with the irises painted out, so the pupils can move independently. */
export const MASCOT_BASE_SRC = `${import.meta.env.BASE_URL}mascot/kobra-mascot-base.png`;

/** Transparent iris-and-pupil sprites cut from the illustration, one per eye. */
export const MASCOT_IRIS_SRC = {
  left: `${import.meta.env.BASE_URL}mascot/kobra-iris-left.png`,
  right: `${import.meta.env.BASE_URL}mascot/kobra-iris-right.png`,
} as const;

/** The character is pre-cropped to a 768×768 square, so the texture maps 1:1 onto the plane. */
export const MASCOT_IMAGE = {
  width: 768,
  height: 768,
} as const;
