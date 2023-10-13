import { Button } from "@/components/ui/button";

export default function ComponentPage() {
  return (
    <main className="p-5">
      <div className="flex gap-5">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </div>
    </main>
  );
}
