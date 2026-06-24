export const birthdayConfig = {
  recipientName: "Thu Hoài",

  /** Số bóng bay trang trí thêm khi thả (không có chữ) */
  extraFloatingBalloons: 29,

  balloonColors: [
    "#F2B300",
    "#0719D4",
    "#D14D39",
    "#8FAD00",
    "#8377E4",
    "#99C96A",
    "#20CFB4",
    "#FF6B9D",
  ],

  meta: {
    title: "Chúc Mừng Sinh Nhật",
    description: "Gửi đến bạn một lời chúc sinh nhật thật đặc biệt",
  },

  buttons: {
    lights: "Bật đèn",
    music: "Phát nhạc",
    decorate: "Trang trí thôi!",
    balloons: "Thả bóng bay",
    cake: "Bánh ngon nhất đời",
    candle: "Thắp nến",
    wish: "Chúc mừng sinh nhật",
    story: "Một lời nhắn dành cho bạn",
  },

  decoratePhotos: [
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.jpg",
    "/bg7.jpg",
    "/bg8.jpg",
    "/bg9.jpg",
    "/bg10.jpg",
  ],

  photoMontage: {
    crossfadeMs: 400,
    ambientSlideMs: 3500,
    ambientBlurPx: 8,
    ambientScale: 1.06,
    ambientOpacity: 0.68,
    ambientOpacityStory: 0.45,
  },

  messageLines: [
    "Hôm nay là...",
    "một ngày thật sự đặc biệt",
    "đặc biệt vì là ngày của em",
    "và anh nhận ra rằng",
    "thêm một năm nữa đã trôi qua",
    "chỉ trong nháy mắt",
    "cảm ơn vì đã ở đó",
    "cảm ơn vì mọi thứ",
    "anh chúc em mọi điều tốt đẹp nhất",
    "mong cuộc sống của em luôn nhẹ nhàng",
    "mong mọi ước mơ đều thành hiện thực",
    "hãy nhớ",
    "câu chuyện của em",
    "còn rất nhiều chương đẹp phía trước",
    "và dù có lúc mệt mỏi",
    "anh vẫn luôn ở bên em",
    "Chúc mừng sinh nhật em!",
  ],
} as const;

export type BirthdayConfig = typeof birthdayConfig;

export function getBalloonLetters(name: string): string[] {
  return Array.from(name.trim());
}

export function getBalloonLettersFromConfig(): string[] {
  return getBalloonLetters(birthdayConfig.recipientName);
}

export function getExtraBalloonCount(): number {
  return birthdayConfig.extraFloatingBalloons;
}

export function getDecoratePhotosFromConfig(): string[] {
  return [...birthdayConfig.decoratePhotos];
}

export function formatMessageLine(line: string, name: string): string {
  return line.replace(/\{name\}/g, name);
}
