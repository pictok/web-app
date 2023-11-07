


// create an array of friends in a array

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// map over the array and display the friends

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
          <div className="w-[350px] h-[90px] bg-white rounded-full shadow-lg flex items-center px-6">

            {/* {This should be the image profile of the friend} */}

          <div className="flex-grow">
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
