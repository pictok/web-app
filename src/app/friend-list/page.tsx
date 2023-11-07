

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

      {friendsList.map((friend) => (
        <div className="flex justify-center items-center py-4" key={friend}>
          <div className="w-[350px] h-[90px] bg-white rounded-full shadow-lg flex items-center px-3 pr-9">
          <Avatar className="  h-[72px] w-[70px] border-4 border-secondary">
          <AvatarImage
            className="object-cover"
            src="/images/avatars/user.png"

          />
        </Avatar>

            

          <div className="flex-grow pl-4">
          <h2 className="text-stone-900 text-xl font-semibold">{friend}</h2>
          <p className="text-sm text-gray-500">Vancouver, BC</p>
        </div>

        <ChevronRight className="bg-black"/>
          </div>
        </div>
      ))}
    </main>
  );
}
