"use client";

import { Search } from "lucide-react";

export default function Searchbar({
  searchFn,
}: {
  searchFn: (query: string) => void;
}) {
  return (
    <div className="relative px-5">
      <Search
        className="absolute left-1 top-6 z-10 ml-10 stroke-foreground"
        arial-hidden
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
