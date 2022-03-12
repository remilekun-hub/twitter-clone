import React from "react";

function Sidebarlink({ text, Icon, active }) {
  return (
    <div
      className={`text-[#d9d9d9] cursor-pointer flex items-center justify-center 
      xl:justify-start text-lg space-x-3 ${active && "font-bold"}`}
    >
      <Icon className="h-7 text-white" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default Sidebarlink;
