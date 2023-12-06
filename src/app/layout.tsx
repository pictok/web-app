import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { RealtimeProvider } from "@/providers/RealtimeProvider";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here
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
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
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
