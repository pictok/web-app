import Image from "next/image";
import Link from "next/link";

import SecondaryButton from "@/components/design/SecondaryButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import TakePhotoButton from "@/components/design/TakePhotoButton";
import Logo from "@/components/design/Logo";
import PrimaryButton from "@/components/design/PrimaryButton";
import RegularButton from "@/components/design/RegularButton";

export default function Home() {
  return (
    <main className="mx-auto max-w-sm space-y-10 px-2 py-5">
      <div className="flex items-center justify-between px-2">
        <Logo />
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-5">
        <TakePhotoButton />
        <Link href="/inbox">
          <SecondaryButton className="relative flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10">
            <h2 className="text-lg font-bold">Inbox</h2>
            <div
              aria-hidden
              className="relative z-10 ml-auto mt-auto h-16 w-16 overflow-hidden"
            >
              <Image
                aria-hidden
                src="/images/assets/inbox.png"
                fill={true}
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
            className="relative flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10"
          >
            <h2 className="text-lg font-bold">Tutorial</h2>
            <div
              aria-hidden
              className="relative z-10 ml-auto mt-auto h-16 w-16 overflow-hidden"
            >
              <Image
                aria-hidden
                src="/images/assets/lightbulb.png"
                fill={true}
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
            className="relative flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10"
          >
            <h2 className="text-lg font-bold">Friends</h2>
            <div
              aria-hidden
              className="relative z-10 ml-auto mt-auto h-16 w-16 overflow-hidden"
            >
              <Image
                src="/images/assets/headphone.png"
                fill={true}
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
      {/* <Navbar /> */}
    </main>
  );
}
