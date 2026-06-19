import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";

/** Lời chúc / nội dung dài — dễ đọc */
export const fontMessage = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-message",
  display: "swap",
});

/** Tên người nhận — thanh lịch, nổi bật */
export const fontName = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-name",
  display: "swap",
});

export const fontVariables = `${fontMessage.variable} ${fontName.variable}`;
