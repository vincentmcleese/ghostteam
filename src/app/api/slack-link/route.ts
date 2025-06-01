import { supabase } from "@/lib/supabase"; // Assuming supabase client is in lib
import { NextResponse } from "next/server";

const SLACK_LINK_KEY = "slackInviteLink";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("app_config")
      .select("config_value")
      .eq("config_key", SLACK_LINK_KEY)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116: Row not found, which is fine, means no link set
      console.error("Error fetching Slack link:", error);
      return NextResponse.json(
        { error: "Failed to fetch Slack link", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ slackInviteLink: data?.config_value || null });
  } catch (error: any) {
    console.error("Unexpected error in GET /api/slack-link:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { slackInviteLink } = await request.json();

    if (!slackInviteLink || typeof slackInviteLink !== "string") {
      return NextResponse.json(
        { error: "Invalid slackInviteLink provided" },
        { status: 400 }
      );
    }

    // Validate URL structure (basic validation)
    const urlPattern =
      /^https:\/\/join\.slack\.com\/((t\/[\w-]+\/shared_invite\/[\w-]+)|[\w\/\-~]+)$/;
    if (!urlPattern.test(slackInviteLink)) {
      return NextResponse.json(
        {
          error:
            "The link does not appear to be a valid Slack invitation link. It should start with https://join.slack.com/ and have a valid path.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("app_config")
      .upsert(
        {
          config_key: SLACK_LINK_KEY,
          config_value: slackInviteLink,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "config_key" }
      )
      .select();

    if (error) {
      console.error("Error saving Slack link:", error);
      return NextResponse.json(
        { error: "Failed to save Slack link", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Unexpected error in POST /api/slack-link:", error);
    if (error.name === "SyntaxError") {
      // Handle cases where request.json() fails
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
