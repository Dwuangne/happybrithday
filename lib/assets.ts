export const BULB_ASSETS = [
  { id: "yellow", on: "/bulb_yellow.png" },
  { id: "red", on: "/bulb_red.png" },
  { id: "blue", on: "/bulb_blue.png" },
  { id: "green", on: "/bulb_green.png" },
  { id: "pink", on: "/bulb_pink.png" },
  { id: "orange", on: "/bulb_orange.png" },
] as const;

export const BULB_OFF = "/bulb.png";

export const BALLOON_IMAGES = [
  "/b1.png",
  "/b2.png",
  "/b3.png",
  "/b4.png",
  "/b5.png",
  "/b6.png",
  "/b7.png",
] as const;

export const ASSETS = {
  banner: "/banner.png",
  balloonBorder: "/Balloon-Border.png",
  cake: "/bd1.jpg",
  soundClick: "/sound_click.mp3",
  soundPhao: "/sound_phao.mp3",
} as const;

export function getBalloonImage(index: number): string {
  return BALLOON_IMAGES[index % BALLOON_IMAGES.length];
}
