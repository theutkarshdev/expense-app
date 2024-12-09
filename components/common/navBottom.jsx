import React from "react";
import { HomeIcon, PlusCircleIcon, UserCircle } from "lucide-react";
import Link from "next/link";

const NavBarBottom = () => {
  return (
    <div className="w-full p-3 border-t bg-white flex justify-evenly rounded-t-2xl overflow-hidden">
      <div>
        <Link href={"/dashboard"}>
          <HomeIcon />
        </Link>
      </div>
      <div>
        <Link href={"/add-person"}>
          <PlusCircleIcon />
        </Link>
      </div>
      <div>
        <Link href={"/account"}>
          <UserCircle />
        </Link>
      </div>
    </div>
  );
};

export default NavBarBottom;
