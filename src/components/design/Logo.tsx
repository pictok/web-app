import Image from "next/image";
import { Nunito } from "next/font/google";
import Link from "next/link";

const nunito = Nunito({ subsets: ["latin"] });

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <span className={"mt-auto text-xl font-bold " + nunito.className}>
        PicTok
      </span>
      <Image
        src="/images/assets/pictok.png"
        className="mb-5"
        alt="Pictok Logo"
        width={40}
        height={40}
      />
    </Link>
  );
}
