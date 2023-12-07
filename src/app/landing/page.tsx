"use client";

import PrimaryButton from "@/components/design/PrimaryButton";
import SecondaryButton from "@/components/design/SecondaryButton";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landing() {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState("");
  const systemDark =
    theme === "system" &&
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = theme == "dark" || systemDark;

  useEffect(() => {
    if (isDark) {
      setImageUrl("/images/assets/logo-light.png");
    } else {
      setImageUrl("/images/assets/landing-logo.png");
    }
  }, [isDark]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-2 py-5">
      <div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="PicTok Logo"
            width={191.45}
            height={262.02}
            className="mx-auto"
          />
        )}
        <div className="mt-20 flex flex-col gap-5 px-5">
          <Link href="/login" className="w-full">
            <PrimaryButton className="w-full p-10 text-3xl">
              Explore
            </PrimaryButton>
          </Link>
          <Link href="/login" className="w-full">
            <SecondaryButton className="w-full p-10 text-3xl">
              Login
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
