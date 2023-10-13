import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pictok",
  description:
    "Pictok is a platform for the visually impaired to share photos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
