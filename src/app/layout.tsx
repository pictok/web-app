import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { RealtimeProvider } from "@/providers/RealtimeProvider";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const jost = Jost({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={jost.className}>
        <RealtimeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </RealtimeProvider>
      </body>
    </html>
  );
}
