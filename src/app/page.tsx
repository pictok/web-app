import Image from "next/image";
import Link from "next/link";

import SecondaryButton from "@/components/design/SecondaryButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import TakePhotoButton from "@/components/design/TakePhotoButton";
import Logo from "@/components/design/Logo";
import RegularButton from "@/components/design/RegularButton";
import Navbar from "@/components/design/Navbar";

export default function Home() {
  return (
    <main className="mx-auto h-screen max-w-sm flex-col items-center justify-center space-y-10 px-2 py-5">
      <div className="flex items-center justify-between px-2">
        <Logo />
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-5">
        <TakePhotoButton />
        <Link href="/inbox">
          <SecondaryButton className="relative flex h-[225.48px] w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10">
            <h2 className="text-xl font-semibold">Inbox</h2>
            <div
              aria-hidden
              className="relative z-10 ml-auto mt-auto h-[138.67px] w-[134.57px] overflow-hidden"
            >
              <Image
                aria-hidden
                src="/images/assets/inbox.png"
                fill
                alt="Inbox icon"
              />
            </div>
            <div
              aria-hidden
              className="weird-circle absolute bottom-0 right-0 h-[100px] w-[100px] overflow-hidden bg-secondary-variant"
            ></div>
          </SecondaryButton>
        </Link>
        <Link href="/tutorial">
          <RegularButton
            variant="left"
            className="relative flex h-[225.48px] w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10"
          >
            <h2 className="text-xl font-semibold">Tutorial</h2>
            <div
              aria-hidden
              className="absolute -bottom-2 -right-6  z-10 h-[140.63px] w-[144.12px] overflow-hidden"
            >
              <Image
                aria-hidden
                src="/images/assets/lightbulb.png"
                fill
                alt="Lightbulb icon"
                className="z-10"
              />
            </div>
            <div
              aria-hidden
              className="weird-circle absolute bottom-0 right-0 h-[100px] w-[100px] overflow-hidden rounded-br-3xl bg-primary-variant"
            ></div>
          </RegularButton>
        </Link>
        <Link href="/friends">
          <RegularButton
            variant="right"
            className="relative flex h-[225.48px] w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10"
          >
            <h2 className="text-xl font-semibold">Friends</h2>
            <div
              aria-hidden
              className="absolute -bottom-5 -right-6  z-10  h-[151.07px] w-[138.71px] overflow-hidden"
            >
              <Image
                src="/images/assets/headphone.png"
                fill
                alt="Headphone icon"
                className="z-10"
              />
            </div>
            <div
              aria-hidden
              className="weird-circle absolute bottom-0 right-0 h-[100px] w-[100px] overflow-hidden bg-secondary-variant"
            ></div>
          </RegularButton>
        </Link>
      </div>
      <Navbar />
    </main>
  );
}
