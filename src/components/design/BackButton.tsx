"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <div
      onClick={back}
      className="absolute left-2 cursor-pointer py-5 pl-3 pr-5"
    >
      <ChevronLeft aria-label="Go back" />
    </div>
  );
}
