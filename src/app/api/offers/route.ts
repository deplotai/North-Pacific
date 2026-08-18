import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

function getSupabase(token?: string) {
  if (token) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const dynamic = 'force-dynamic';

// GET — Public: fetch offer config
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Offers GET error:", err);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}

// PUT — Authenticated: update offer config
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabase(token);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Get existing offer row
    const { data: existing } = await supabase
      .from("offers")
      .select("id")
      .limit(1)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Offer config not found" }, { status: 404 });
    }

    const { data, error } = await supabase
      .from("offers")
      .update({
        enabled: body.enabled ?? false,
        title: body.title || "OFFER WINDOW",
        text: body.text || "",
        banner_image: body.banner_image || "",
        countdown_hours: body.countdown_hours || 12,
        show_countdown: body.show_countdown ?? false,
        discount_percentage: body.discount_percentage ? parseInt(body.discount_percentage) : null,
        active_product_ids: body.active_product_ids || [],
        position: body.position || "section",
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Offers PUT error:", err);
    return NextResponse.json({ error: "Failed to update offers" }, { status: 500 });
  }
}
