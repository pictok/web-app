import PrimaryButton from "@/components/design/PrimaryButton";
import RegularButton from "@/components/design/RegularButton";
import SecondaryButton from "@/components/design/SecondaryButton";

export default function ComponentPage() {
  return (
    <main className="p-5">
      <div className="flex gap-5">
        <PrimaryButton>Button</PrimaryButton>
        <SecondaryButton>Button</SecondaryButton>
        <RegularButton>Button</RegularButton>
        <RegularButton variant="right">Button</RegularButton>
      </div>
    </main>
  );
}
