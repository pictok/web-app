import { Search } from "lucide-react";

export default function Searchbar() {
  return (
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
  );
}
