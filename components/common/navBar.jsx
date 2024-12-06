import React from "react";
import { Button } from "../ui/button";
import { BellDotIcon } from "lucide-react";

const NavBar = () => {
  return (
    <div className="w-full px-3 py-1 border-b bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-primary">X-Pense</h2>
        <Button variant="outline" className="rounded-full" size="icon">
          <BellDotIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
