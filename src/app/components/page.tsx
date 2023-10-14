import CancelIconButton from "@/components/design/CancelIconButton";
import PrimaryButton from "@/components/design/PrimaryButton";
import PrimaryIconButton from "@/components/design/PrimaryIconButton";
import RecordIconButton from "@/components/design/RecordIconButton";
import RegularButton from "@/components/design/RegularButton";
import SecondaryButton from "@/components/design/SecondaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ComponentPage() {
  return (
    <main className="p-5">
      <div className="flex gap-5">
        <PrimaryButton>Button</PrimaryButton>
        <SecondaryButton>Button</SecondaryButton>
        <RegularButton>Button</RegularButton>
        <RegularButton variant="right">Button</RegularButton>
        <PrimaryIconButton>Add</PrimaryIconButton>
        <Avatar className="h-[123px] w-[123px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <AvatarFallback>John Doe</AvatarFallback>
        </Avatar>
        <RecordIconButton />
        <CancelIconButton />
      </div>
    </main>
  );
}
