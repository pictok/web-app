import React from "react";

import CameraComponent from "@/components/design/CameraComponent";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function page() {
  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-0">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Take Photo using Webcam</h1>
      </div>
      <CameraComponent />
    </main>
  );
}
