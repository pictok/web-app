import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import BackButton from "@/components/design/BackButton";
import Navbar from "@/components/design/Navbar";
import RegularButton from "@/components/design/RegularButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/db/auth/auth";

export default async function Profile() {
  const cookieStore = cookies();
  const user = await getCurrentUser(cookieStore);
  return (
    <main className="mx-auto max-w-sm px-2 py-5">
      <div className="relative flex items-center justify-center py-5 pb-10">
        <BackButton />
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>
      <div className="px-5 pb-5">
        <Avatar className="mx-auto h-[163.7px] w-[163.7px] border-4 border-secondary">
          <AvatarImage className="object-cover" src={user?.avatar} />
        </Avatar>
      </div>
      <h1 className="pb-0 text-center text-3xl font-bold">{user?.name}</h1>
      <div className="flex justify-center">
        <Link href="/sign-out">
          <Button variant="secondary" className="mt-3 text-sm text-foreground">
            Sign out
          </Button>
        </Link>
      </div>
      <div className="my-10 flex flex-col gap-5">
        <Link href="/friends">
          <RegularButton className="relative  flex h-[139px]  w-[364px] justify-start pb-0 pl-5 pr-3 pt-5 text-left">
            <div className="pb-5">
              <h3 className="text-lg">My Friends</h3>
              <p className="mt-2 font-normal">View your list of friends</p>
            </div>
            <div className="absolute -bottom-3 -right-5 h-[145px] w-[145px]  overflow-hidden">
              <Image
                src="/images/assets/friends.png"
                fill={true}
                alt="Headphone icon"
                className="z-10"
                quality={100}
              />
            </div>
            <div className="weird-circle2 absolute bottom-[-2px] right-[-2px] h-[139px] w-[140px] overflow-hidden rounded-tr-3xl bg-secondary-variant"></div>
          </RegularButton>
        </Link>
        <Link href="/photos">
          <RegularButton
            variant="right"
            className="relative flex h-[139px]  w-[364px] justify-start pb-0 pl-5 pr-3 pt-5 text-left"
          >
            <div className="pb-5">
              <h3 className="text-lg">Photos</h3>
              <p className="mt-2 font-normal">View your saved photos</p>
            </div>
            <div className="absolute bottom-2 right-0 h-[94px] w-[94px] overflow-hidden">
              <Image
                src="/images/assets/image.png"
                fill={true}
                quality={100}
                alt="Lightbulb icon"
                className="z-10"
              />
            </div>
            <div className="weird-circle2 absolute bottom-[-2px] right-[-2px] h-[139px] w-[140px] overflow-hidden rounded-tr-3xl bg-primary-variant"></div>
          </RegularButton>
        </Link>
      </div>
      <div className="mt-auto">
        <Navbar />
      </div>
    </main>
  );
}
