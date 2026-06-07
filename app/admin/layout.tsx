import AdminSidebar from "./AdminSidebar";
import { createClient } from "../src/lib/supabaseServer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName = "Usuário";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    fullName = profile?.full_name || user.email || "Usuário";
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar fullName={fullName} />

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}