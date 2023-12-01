import BackButton from "@/components/design/BackButton";
import Navbar from "@/components/design/Navbar";
import PrimaryButton from "@/components/design/PrimaryButton";
import SecondaryButton from "@/components/design/SecondaryButton";
import { Avatar } from "@/components/ui/avatar";
import { LockKeyholeIcon, MailIcon } from "lucide-react";
import Image from "next/image";

export default function Login() {
  return (
    <main className="mx-auto flex max-h-screen min-h-screen max-w-lg flex-col justify-between overflow-hidden px-2 pb-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form className="mt-20 flex flex-col gap-10 py-5">
          <p className="text-center">
            Please enter your email address and password to log in.
          </p>
          <div className="relative">
            <MailIcon
              className="absolute left-5 top-6 z-10 stroke-foreground"
              aria-hidden
            />
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border bg-card px-16 py-5 text-lg text-foreground drop-shadow-lg placeholder:text-foreground focus:outline-none"
            />
          </div>
          <div className="relative">
            <LockKeyholeIcon
              className="absolute left-5 top-6 z-10 stroke-foreground"
              aria-hidden
            />
            <input
              type="password"
              placeholder="Your password"
              className="w-full rounded-full border bg-card px-16 py-5 text-lg text-foreground drop-shadow-lg placeholder:text-foreground focus:outline-none"
            />
          </div>
          <div>
            <PrimaryButton className="w-full py-8 text-xl dark:bg-secondary">
              Login
            </PrimaryButton>
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted-foreground" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <PrimaryButton className="w-full space-x-2 py-8 text-xl">
          <span>Demo as Amy</span>
          <Avatar className="h-12 w-12 border-4 border-secondary">
            <Image
              className="object-cover"
              src="/images/avatars/user1.png"
              alt="Amy Smith"
              width={164}
              height={164}
            />
          </Avatar>
        </PrimaryButton>

        <SecondaryButton className="w-full space-x-2 py-8 text-xl">
          <span>Demo as Isabella</span>
          <Avatar className="h-12 w-12 border-4 border-primary">
            <Image
              className="object-cover"
              src="/images/avatars/user2.jpg"
              alt="Isabella Bennett"
              width={164}
              height={164}
            />
          </Avatar>
        </SecondaryButton>
      </div>
      <div>
        <Navbar />
      </div>
    </main>
  );
}
