import { ChevronLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function complete() {
  return (
    <main className="mx-auto max-w-sm  px-2 py-5">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-0">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Amy Smith</h1>
      </div>
      <div className="mt-28 flex items-center justify-center px-5">
        <div className="relative h-[210px] w-[210px] overflow-hidden rounded-md">
          <Image
            className="object-cover"
            src="/images/assets/confirmationCheck.png"
            alt="Confirmation check icon"
            priority={true}
            fill={true}
          />
        </div>
      </div>
      <div className="mb-28 mt-5 flex flex-col">
        <h2 className="text-center text-[32px] font-bold">Congratulation!</h2>
        <p className="text-center text-2xl font-normal tracking-wide">
          Amy will receive your photo shortly!
        </p>
      </div>

      {/* <Navbar /> */}
    </main>
  );
}
