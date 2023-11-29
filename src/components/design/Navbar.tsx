import Link from "next/link";
import CameraIcon from "../icons/CameraIcon";
import FriendsIcon from "../icons/FriendsIcon";
import HomeIcon from "../icons/HomeIcon";
import IconButton from "./PrimaryIconButton";

export default function Navbar() {
  return (
    <nav className="navbar-gradient flex w-full items-center justify-around rounded-full px-1 py-2">
      <Link href="/">
        <CameraIcon />
      </Link>
      <Link href="/">
        <IconButton className="flex h-20 w-20 items-center justify-center">
          <HomeIcon />
        </IconButton>
      </Link>
      <Link href="/friends">
        <FriendsIcon />
      </Link>
    </nav>
  );
}
