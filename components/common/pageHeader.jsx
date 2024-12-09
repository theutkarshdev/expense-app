import { ChevronLeft } from "lucide-react";
import React from "react";

const PageHeader = () => {
  return (
    <div className="flex items-center text-white">
      <ChevronLeft className="size-7" />
      <h1 className="text-xl text-center flex-grow pr-7">My Account</h1>
    </div>
  );
};

export default PageHeader;
