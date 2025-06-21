import { ReactNode } from "react";
import Header from "@/component/Header";

export default function AdminLayout({
  children,
  title,
  links,
}: {
  children: ReactNode;
  title: string;
  links: { title: string; href: string }[];
}) {
  // linksが未指定の場合はデフォルトのリンクを使用
  if (!links || links.length === 0) {
    links = [
      { title: "ルーム一覧", href: "/rooms" },
      { title: "設定", href: "/settings" },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title={title}
        href="/"
        links={links}
      />
      <main className="flex-1 mt-16">
        {children}
      </main>
    </div>
  );
}
