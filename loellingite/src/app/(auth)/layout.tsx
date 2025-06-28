import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  let isLoggedIn = false;
  console.log("AuthLayout rendering...");
  try {
    const supabase = await createSupabaseServerClient();
    const user = await supabase.auth.getUser();

    isLoggedIn = user.data.user !== null;
  } catch {
    isLoggedIn = false;
  }
  console.log("User logged in:", isLoggedIn);

  if (isLoggedIn) {
    console.log("User is logged in, redirecting to /rooms");
    redirect("/rooms");
  }

  return (
    <>
      {children}
    </>
  );
}
