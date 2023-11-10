import LoadSpinnerSVG from "@/components/icons/LoadSpinnerSVG";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function LoadSpinner() {
  return (
    <>
      <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
        <div className="relative flex items-center justify-center py-5">
          <Link href="/" className="absolute left-2">
            <ChevronLeft aria-label="Go back" />
          </Link>
          <h1 className="text-2xl font-bold">Photo</h1>
        </div>

        <div className="relative h-[90vh] snap-y snap-mandatory">
          <div className="relative h-[90vh] w-full snap-center ">
            <Image
              src="/images/photos/photo-2.png"
              alt="Palm trees on a beach"
              fill
              className="object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadSpinnerSVG />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl">Processing</h1>
          </div>
        </div>
      </main>
    </>
  );
}
