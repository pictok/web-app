"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const systemDark =
    theme === "system" &&
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = theme === "dark" || systemDark;

  return (
    <div aria-hidden>
      <input
        type="checkbox"
        id="darkmode-toggle"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        aria-hidden
      />
      <label htmlFor="darkmode-toggle" id="darkmode-toggle-label" aria-hidden>
        {isDark ? (
          <span className="sr-only">Light Mode</span>
        ) : (
          <span className="sr-only">Dark Mode</span>
        )}
        <SunIcon className="sun" aria-hidden />
        <MoonIcon className="moon" aria-hidden />
      </label>
    </div>
  );
}
