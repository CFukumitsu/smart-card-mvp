import { supabase } from "../../src/lib/supabase";
import AdminSidebar from "./AdminSidebar";
import MobileMenu from "../../../components/MobileMenu";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
    .single();

  return (
    <main className="min-h-screen bg-[#070b16] text-white">
      <div className="min-h-screen md:grid md:grid-cols-[230px_1fr]">
        <div className="hidden md:block">
          <AdminSidebar slug={slug} fullName={card?.full_name} />
        </div>

        <section className="p-5 md:p-8">
          <MobileMenu slug={slug} fullName={card?.full_name} />

          {children}
        </section>
      </div>
    </main>
  );
}