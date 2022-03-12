import React from "react";
import Image from "next/image";
import Sidebarlink from "./Sidebarlink";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[280px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <Sidebarlink text="Home" Icon={HomeIcon} active />
        <Sidebarlink text="Explore" Icon={HashtagIcon} />
        <Sidebarlink text="Notifications" Icon={BellIcon} />
        <Sidebarlink text="Messages" Icon={InboxIcon} />
        <Sidebarlink text="Bookmarks" Icon={BookmarkIcon} />
        <Sidebarlink text="Lists" Icon={ClipboardListIcon} />
        <Sidebarlink text="Profile" Icon={UserIcon} />
        <Sidebarlink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button
        className="hidden xl:inline ml-auto font-bold text-white rounded-full 
        text-lg bg-[#1d9bf0] w-[170px] h-[42px] hover:bg-[#1a8cd8]"
      >
        Tweet
      </button>
      <div
        onClick={signOut}
        className="text-[#d9d9d9] flex items-center justify-center mt-auto xl:ml-auto xl:-mr-3 hoverAnimation"
      >
        <img
          src={session.user.image}
          alt="user"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="hidden xl:flex flex-col items-start leading-5">
          <p className="font-bold text-sm text-left">{session.user.name}</p>
          <p className="text-[#6e767d] text-left">@{session.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-4" />
      </div>
    </div>
  );
}

export default Sidebar;
