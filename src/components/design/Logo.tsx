import Link from "next/link";
import LogoIcon from "../icons/LogoIcon";

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <LogoIcon />
    </Link>
  );
}
