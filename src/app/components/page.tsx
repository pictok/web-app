import CancelIconButton from "@/components/design/CancelIconButton";
import PrimaryButton from "@/components/design/PrimaryButton";
import IconButton from "@/components/design/PrimaryIconButton";
import PrimaryIconButton from "@/components/design/PrimaryIconButton";
import RecordIconButton from "@/components/design/RecordIconButton";
import RegularButton from "@/components/design/RegularButton";
import SecondaryButton from "@/components/design/SecondaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function ComponentPage() {
  return (
    <main className="mx-auto max-w-sm space-y-5 bg-background p-5">
      <div className="flex flex-wrap gap-5">
        <PrimaryButton>Button</PrimaryButton>
        <SecondaryButton>Button</SecondaryButton>
        <RegularButton>Button</RegularButton>
        <RegularButton variant="right">Button</RegularButton>
        <IconButton>Add</IconButton>
        <ModeToggle />
        <Avatar className="h-[123px] w-[123px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="/images/avatars/user.png"
          />
          <AvatarFallback>Jane Doe</AvatarFallback>
        </Avatar>
        <RecordIconButton />
        <CancelIconButton />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <PrimaryButton className="flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10">
          <h2 className="text-lg">Take Photo</h2>
          <div className="relative ml-auto mt-auto h-16 w-16 overflow-hidden">
            <Image
              src="/images/assets/camera.png"
              fill={true}
              alt="Camera icon"
            />
          </div>
        </PrimaryButton>
        <SecondaryButton className="flex h-auto w-full max-w-sm flex-col items-start justify-start gap-5 pb-3 pr-3 pt-10">
          <h2 className="text-lg">Inbox</h2>
          <div className="relative ml-auto mt-auto h-16 w-16 overflow-hidden">
            <Image
              src="/images/assets/inbox.png"
              fill={true}
              alt="Camera icon"
            />
          </div>
        </SecondaryButton>
      </div>
      <div className="space-y-5">
        <RegularButton className="flex h-auto w-full gap-10 pb-0 pl-5 pr-3 pt-10 text-left">
          <h3 className="pb-10 text-lg">Experience your images with sound</h3>
          <div className="relative ml-auto mt-auto h-16 w-16  overflow-hidden">
            <Image
              src="/images/assets/sound.png"
              fill={true}
              alt="Camera icon"
            />
          </div>
        </RegularButton>
        <RegularButton
          variant="right"
          className="flex h-auto w-full gap-10 pb-0 pl-5 pr-3 pt-10 text-left"
        >
          <div className="pb-10">
            <h3 className="text-lg">Tutorial</h3>
            <p>Learn how to use the app</p>
          </div>
          <div className="relative ml-auto mt-auto h-16 w-16 overflow-hidden">
            <Image
              src="/images/assets/computer.png"
              fill={true}
              alt="Camera icon"
            />
          </div>
        </RegularButton>
      </div>
    </main>
  );
}
