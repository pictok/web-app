"use client";

import { Search } from "lucide-react";

export default function Searchbar({
  searchFn,
}: {
  searchFn: (query: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-5 top-6 z-10 stroke-foreground"
        aria-hidden
      />
      <input
        type="text"
        onChange={(e) => searchFn(e.target.value)}
        placeholder="Search"
        className="w-full rounded-full border bg-card px-16 py-5 text-lg text-foreground drop-shadow-lg placeholder:text-foreground focus:outline-none"
      />
    </div>
  );
}
