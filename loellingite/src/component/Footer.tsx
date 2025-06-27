"use client";

import { usePathname } from "next/navigation";
import {
  IoHomeOutline,
  IoHome,
  IoSearchOutline,
  IoSearch,
  IoAdd,
} from "react-icons/io5";

export default function Footer() {
  const pathname = usePathname();

  const navItems: Array<{
    label: string;
    onClick: () => void;
    activeIcon: React.ReactElement;
    inactiveIcon: React.ReactElement;
    isSpecial?: boolean;
    isActive?: boolean;
  }> = [
    {
      label: "ホーム",
      onClick: () => window.location.href = "/",
      activeIcon: <IoHome className="w-6 h-6" />,
      inactiveIcon: <IoHomeOutline className="w-6 h-6" />,
      isActive: pathname === "/rooms",
    },
    {
      label: "作成",
      onClick: () => window.location.href = "/room/create_room",
      activeIcon: <IoAdd className="w-6 h-6" />,
      inactiveIcon: <IoAdd className="w-6 h-6" />,
      isSpecial: true,
    },
    {
      label: "検索",
      onClick: () => window.location.href = "/search",
      activeIcon: <IoSearch className="w-6 h-6" />,
      inactiveIcon: <IoSearchOutline className="w-6 h-6" />,
      isActive: pathname.startsWith("/rooms"),
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-primaryBackground border-t border-primaryBorder z-50">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItems.map((item, index) => {
          const active = item.isActive || false;
          
          // 特別なプラスボタンの場合
          if (item.isSpecial) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center min-w-0 flex-1 py-2"
              >
                <div className="bg-primaryBackground rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-primaryBorder">
                  <div className="text-primaryText">
                    {item.activeIcon}
                  </div>
                </div>
              </button>
            );
          }
          
          // 通常のナビゲーションアイテム
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-2"
            >
              <div
                className={`${
                  active ? "text-[#7B5858]" : "text-[#7B5858]/60"
                } transition-colors`}
              >
                {active ? item.activeIcon : item.inactiveIcon}
              </div>
              <span
                className={`text-xs mt-1 ${
                  active ? "text-[#7B5858] font-medium" : "text-[#7B5858]/60"
                } transition-colors`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
