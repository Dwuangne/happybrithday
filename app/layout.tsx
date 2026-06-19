import type { Metadata, Viewport } from "next";
import { birthdayConfig } from "@/lib/birthday-config";
import { fontMessage, fontVariables } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: birthdayConfig.meta.title,
  description: birthdayConfig.meta.description,
  openGraph: {
    title: birthdayConfig.meta.title,
    description: birthdayConfig.meta.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${fontVariables} ${fontMessage.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
