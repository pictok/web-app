import { ChevronLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/design/Navbar";
import RegularButton from "@/components/design/RegularButton";

export default function SendPhoto() {
  return (
    <main className="mx-auto max-w-sm space-y-10 px-2 py-5">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-0">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Amy Smith</h1>
      </div>
      <div className="flex items-center justify-between px-5">
        <Avatar className="mx-auto h-[163.7px] w-[163.7px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="/images/avatars/user2.png"
          />
          <AvatarFallback>Jane Doe</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <RegularButton
          variant="right"
          className="navbar-gradient flex h-auto max-h-72 w-full max-w-sm flex-col items-start justify-start gap-5 space-y-10 border-none pb-0 pr-3 pt-10"
        >
          <h2 className="mx-auto text-2xl font-normal">
            Send <span className="font-bold">Amy</span> a photo.
          </h2>
          <div className="relative bottom-0 left-1/2 z-10 mt-auto h-16 w-16 -translate-x-1/2 overflow-hidden">
            <Image
              src="/images/assets/leftArrow3d.png"
              fill={true}
              alt="Left arrow icon"
            />
          </div>
          <div className="weird-circle3 absolute bottom-0 left-1/2 h-[80px] w-[110px] -translate-x-[47%] transform overflow-hidden bg-secondary"></div>
        </RegularButton>
      </div>

      <Navbar />
    </main>
  );
}
