import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the URL from the search params
    const { searchParams } = new URL(request.url);
    const link = searchParams.get("link");

    // Check if link is valid and is a Slack invite link
    if (!link || !link.includes("join.slack.com")) {
      return NextResponse.redirect(new URL("/community", request.url));
    }

    // Redirect to the Slack invite link
    return NextResponse.redirect(link);
  } catch (error) {
    console.error("Error redirecting to Slack:", error);
    return NextResponse.redirect(new URL("/community", request.url));
  }
}
