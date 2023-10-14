import Image from "next/image";

import { ChevronLeft } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Inbox() {
  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-0">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Inbox</h1>
      </div>

      <div className="h-[90vh] snap-y snap-mandatory overflow-y-scroll">
        <div className="relative h-[90vh] w-full snap-center overflow-hidden bg-muted">
          <Image
            src="/images/photos/photo-1.jpg"
            alt="Palm trees on a beach"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[90vh] w-full snap-center overflow-hidden bg-muted">
          <Image
            src="/images/photos/photo-2.png"
            alt="Palm trees on a beach"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
