import Image from "next/image";
import Link from "next/link";

import SecondaryButton from "@/components/design/SecondaryButton";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TakePhotoButton from "@/components/design/TakePhotoButton";

export default function Home() {
  return (
    <main className="mx-auto max-w-sm space-y-10 px-2 py-5">
      <div className="flex items-center justify-between px-5">
        <Avatar className="h-[123px] w-[123px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="/images/avatars/user.png"
            alt="Jane Doe"
          />
          <AvatarFallback>Jane Doe</AvatarFallback>
        </Avatar>
        <div className="space-y-5">
          <p className="text-xl font-semibold">Jane Doe</p>
          <ModeToggle />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TakePhotoButton />
        <Link href="/inbox">
          <SecondaryButton className="relative flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10">
            <h2 className="text-lg">Inbox</h2>
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
      </div>
      {/* <div className="space-y-5">
        <RegularButton className="relative flex h-auto w-full justify-start pb-0 pl-5 pr-3 pt-5 text-left">
          <div className="pb-5">
            <h3 className="text-lg">Explore</h3>
            <p className="font-normal">Explore photos with sounds</p>
          </div>
          <div className="absolute right-0 top-2 h-[90px] w-[90px]  overflow-hidden">
            <Image
              src="/images/assets/headphone.png"
              fill={true}
              alt="Headphone icon"
              className="z-10"
            />
          </div>
          <div className="weird-circle2 absolute bottom-[-2px] right-[-2px] h-[92px] w-[100px] overflow-hidden rounded-tr-3xl bg-primary-variant"></div>
        </RegularButton>
        <RegularButton
          variant="right"
          className="relative flex h-auto w-full justify-start pb-0 pl-5 pr-3 pt-5 text-left"
        >
          <div className="pb-5">
            <h3 className="text-lg">Tutorial</h3>
            <p className="font-normal">Learn how to use the app</p>
          </div>
          <div className="absolute right-[-10px] top-[5px] h-[85px] w-[95px] overflow-hidden">
            <Image
              src="/images/assets/lightbulb.png"
              fill={true}
              alt="Lightbulb icon"
              className="z-10"
            />
          </div>
          <div className="weird-circle2 absolute bottom-[-2px] right-[-2px] h-[92px] w-[100px] overflow-hidden rounded-tr-3xl bg-secondary-variant"></div>
        </RegularButton>
      </div> */}

      {/* <Navbar /> */}
    </main>
  );
}
