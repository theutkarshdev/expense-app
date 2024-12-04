import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Illustration from "@/assets/imgs/Illustration.png";
import Link from "next/link";

const OnboardingStep1 = () => {
  return (
    <div className="h-dvh bg-white flex flex-col justify-center text-center px-3">
      <Image
        width={300}
        height={300}
        className="mx-auto bg-slate-50 rounded-2xl"
        src={Illustration}
        priority
        alt="Onboarding Illustration"
      />
      <h2 className="text-3xl font-semibold mt-4 mb-2 px-5">Gain total control of your money</h2>
      <p className="text-sm text-gray-500 px-5">Become your own money manager and make every cent count</p>
      <ul className="w-full flex justify-center gap-2.5 [&_li]:rounded-full my-5 items-center">
        <li className="bg-primary size-4"></li>
        <li className="bg-gray-300 size-2"></li>
        <li className="bg-gray-300 size-2"></li>
      </ul>
      <Link href={"/onboarding/step2"}>
        <Button className="w-full">Continue</Button>
      </Link>
    </div>
  );
};

export default OnboardingStep1;
