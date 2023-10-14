import PrimaryButton from "@/components/design/PrimaryButton";
import PrimaryIconButton from "@/components/design/PrimaryIconButton";
import RegularButton from "@/components/design/RegularButton";
import SecondaryButton from "@/components/design/SecondaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
          <AvatarImage src="" />
          <AvatarFallback>Jane Doe</AvatarFallback>
        </Avatar>
      </div>
    </main>
  );
}
