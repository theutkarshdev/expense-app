import { Button } from "@/components/ui/button";
import { deleteSession } from "@/lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import bgImage from "@/assets/imgs/Rectangle 9.png";
import DP from "@/assets/imgs/smiling-beard.jpg";
import PageHeader from "@/components/common/pageHeader";
import { BellDotIcon, SettingsIcon, UserIcon } from "lucide-react";

const AccountPage = () => {
  async function handleLogout() {
    "use server";
    await deleteSession();
    redirect("/auth/login");
  }

  return (
    <div className="h-full relative">
      <Image
        className="w-full h-[40dvh] absolute top-0 z-[0]"
        width={500}
        height={500}
        src={bgImage}
        alt="background"
      />
      <div className="absolute top-0 z-[1] w-full px-3 py-5">
        <PageHeader />
        <div className="text-center mt-[25dvh]">
          <Image className="rounded-full size-24 border mx-auto" width={100} height={100} src={DP} alt="Profile Pic" />
          <h2 className="text-lg font-semibold">Utkarsh Kushwaha</h2>
          <p className="text-xs">utkarsh@gmail.com</p>
        </div>

        <div>
          <ul className="my-5">
            <li className="flex gap-3 border-b py-3">
              <UserIcon />
              <p>My Profile</p>
            </li>
            <li className="flex gap-3 border-b py-3">
              <BellDotIcon />
              <p>Notifications</p>
            </li>
            <li className="flex gap-3 py-3">
              <SettingsIcon />
              <p>Settings</p>
            </li>
          </ul>
          <form action={handleLogout}>
            <Button type="submit" className="w-full" size="lg">
              Log Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
