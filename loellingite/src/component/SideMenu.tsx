"use client";

import React from "react";
import { IoClose, IoSettings, IoLogOut, IoHome } from "react-icons/io5";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const supabase = createSupabaseBrowserClient();
  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <>
      {/* オーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-40"
          onClick={onClose}
        />
      )}

      {/* サイドメニュー */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ヘッダー */}
        <div className="bg-[#7B5858] text-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-[#6a4747] focus:outline-none"
            title="メニューを閉じる"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* メニューアイテム */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/rooms"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <IoHome size={20} className="text-[#7B5858]" />
                <span className="text-gray-700">ホーム</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <IoSettings size={20} className="text-[#7B5858]" />
                <span className="text-gray-700">設定</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
              >
                <IoLogOut size={20} className="text-[#7B5858]" />
                <span className="text-gray-700">ログアウト</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
