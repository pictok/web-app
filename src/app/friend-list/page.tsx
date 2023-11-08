import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const friendsList = ["Amy", "Lisa", "John", "Bob", "Sally"];

export default function FriendList() {
  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-2">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Friends</h1>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex h-[75px] w-[350px] items-center rounded-full bg-white">
          <Search className="ml-6 stroke-black" />

          <input
            type="text"
            placeholder="Search"
            className=" mx-4 text-lg text-stone-900"
          />
        </div>
      </div>

      {friendsList.map((friend) => (
        <div className="flex items-center justify-center py-4" key={friend}>
          <div className="flex h-[90px] w-[350px] items-center rounded-full bg-white px-3 pr-9 shadow-lg">
            <Avatar className="  h-[72px] w-[70px] border-4 border-secondary">
              <AvatarImage
                className="object-cover"
                src="/images/avatars/user.png"
              />
            </Avatar>

            <div className="flex-grow pl-4">
              <h2 className="text-xl font-semibold text-stone-900">{friend}</h2>
              <p className="text-sm text-gray-500">Vancouver, BC</p>
            </div>

            <ChevronRight className="stroke-gray-700" />
          </div>
        </div>
      ))}
    </main>
  );
}
