import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error("Missing INSTAGRAM_ACCESS_TOKEN environment variable.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Using the official Instagram Graph API (Basic Display API endpoint for long-lived tokens)
    // We fetch media_type to filter out images and only keep VIDEO (reels)
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username&access_token=${accessToken}`;

    // The fetch here will automatically be cached by Next.js.
    // 'next: { revalidate: 3600 }' means it will revalidate the cache every hour (3600 seconds)
    // allowing automatic background refreshes without hitting rate limits.
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Instagram API Error:", errorData);
      return NextResponse.json({ error: "Failed to fetch from Instagram" }, { status: 502 });
    }

    const data = await response.json();

    // Filter only video media types (Reels / Videos)
    const reels = data.data.filter(
      (item: any) => item.media_type === "VIDEO" || item.media_type === "CAROUSEL_ALBUM" // Sometimes videos are inside carousels
    );

    return NextResponse.json({ reels });
  } catch (error) {
    console.error("Error in Instagram API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
