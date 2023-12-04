import Image from "next/image";
import { Avatar } from "../ui/avatar";
import Logo from "./Logo";
import { ModeToggle } from "../ui/mode-toggle";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/db/auth/auth";

export default async function HomeHeader() {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);

  if (user) {
    return (
      <div className="flex flex-col">
        <Logo />
        <div className="item flex justify-between">
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
