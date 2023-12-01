"use client";

import Image from "next/image";
import { Avatar } from "../ui/avatar";
import Logo from "./Logo";
import { ModeToggle } from "../ui/mode-toggle";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/db/auth/getCurrentUser";
import supabase from "@/db/supabase";
import LoadSpinnerSVG from "../icons/LoadSpinnerSVG";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type User = {
  name: string;
  avatar: string;
};

export default function HomeHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const { user, error } = await getCurrentUser();
      if (error) {
        console.error(error);
      }
      if (user) {
        setCurrentUser({
          name: user.name,
          avatar: user.avatar,
        });
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <Logo />
        {!isLoading && !currentUser && <ModeToggle />}
        {isLoading && (
          <div className="mr-5 animate-spin">
            <Loader2Icon size={34} className="stroke-primary" />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-between">
          <div className="my-5 flex items-center gap-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      )}

      {!isLoading && currentUser && (
        <div className="item flex justify-between">
          <div className="my-5 flex items-center gap-2">
            <Avatar className="h-16 w-16 border-4 border-secondary">
              <Image
                className="object-cover"
                src={currentUser.avatar}
                alt={currentUser.name}
                width={164}
                height={164}
              />
            </Avatar>
            <span className="text-xl font-semibold sm:text-2xl">
              {currentUser.name}
            </span>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      )}
    </>
  );
}
