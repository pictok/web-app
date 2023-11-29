"use client";
import Link from "next/link";
import CameraIcon from "../icons/CameraIcon";
import FriendsIcon from "../icons/FriendsIcon";
import HomeIcon from "../icons/HomeIcon";
import IconButton from "./PrimaryIconButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isFriends =
    pathname.includes("/friends") || pathname.includes("/send-photo");
  return (
    <nav className="navbar-gradient flex w-full items-center justify-around rounded-full px-1 py-2">
      <IconButton className="flex h-20 w-20 items-center justify-center bg-transparent dark:bg-transparent">
        <CameraIcon />
      </IconButton>

      <Link href="/">
        <IconButton
          className={cn("flex h-20 w-20 items-center justify-center", {
            "bg-transparent": !isHome,
            "dark:bg-transparent": !isHome,
          })}
        >
          <HomeIcon />
        </IconButton>
      </Link>

      <Link href="/friends">
        <IconButton
          className={cn("flex h-20 w-20 items-center justify-center", {
            "bg-transparent": !isFriends,
            "dark:bg-transparent": !isFriends,
          })}
        >
          <FriendsIcon />
        </IconButton>
      </Link>
    </nav>
  );
}
