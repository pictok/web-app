import Image from "next/image";
import { Avatar } from "../ui/avatar";
import Logo from "./Logo";
import { ModeToggle } from "../ui/mode-toggle";
import { User } from "@/db/auth/auth";
import Link from "next/link";

export default async function HomeHeader({ user }: { user?: User }) {
  if (user) {
    return (
      <div className="flex flex-col">
        <Logo />
        <div className="item flex justify-between">
          <Link href="/profile">
            <div className="my-5 flex items-center gap-2">
              <Avatar className="h-16 w-16 border-4 border-secondary">
                <Image
                  className="object-cover"
                  src={user.avatar}
                  alt={user.name}
                  width={164}
                  height={164}
                />
              </Avatar>
              <span className="text-xl font-semibold sm:text-2xl">
                {user.name}
              </span>
            </div>
          </Link>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <Logo />
        <ModeToggle />
      </div>
    </>
  );
}
