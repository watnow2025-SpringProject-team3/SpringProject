import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Header from "@/component/Header";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  let isLoggedIn = false;
  console.log("AuthLayout rendering...");
  try {
    const supabase = createSupabaseServerClient();
    const user = await supabase.auth.getUser();

    isLoggedIn = !!user;
  } catch {
    isLoggedIn = false;
  }
  console.log("User logged in:", isLoggedIn);

  if (isLoggedIn) {
    redirect("/rooms");
  }

  return (
    <>
      <Header title="サービス名" href="/" />
      {children}
    </>
  );
}
