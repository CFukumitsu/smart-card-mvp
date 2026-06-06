import { NextResponse } from "next/server";
import { supabase } from "../../src/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { card_slug, event_type } = body;

  const { error } = await supabase.from("card_events").insert({
    card_slug,
    event_type,
  });
  
  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao registrar evento" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}