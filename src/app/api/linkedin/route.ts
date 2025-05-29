import { NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

export async function GET(request: Request) {
  try {
    // Get the LinkedIn ID from the URL parameter
    const { searchParams } = new URL(request.url);
    const linkedinId = searchParams.get("id");

    if (!linkedinId) {
      return NextResponse.json(
        { error: "LinkedIn ID is required" },
        { status: 400 }
      );
    }

    // Initialize the ApifyClient with API token from environment variables
    const client = new ApifyClient({
      token: process.env.APIFY_API_TOKEN,
    });

    // Prepare Actor input with the LinkedIn profile URL
    const input = {
      profileUrls: [`https://www.linkedin.com/in/${linkedinId}`],
    };

    // Run the Actor and wait for it to finish
    const run = await client.actor("2SyF0bVxmgGr8IVCZ").call(input);

    // Fetch Actor results from the run's dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (items.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Extract only the needed information
    const profileData = items[0];
    const responseData = {
      firstName: profileData.firstName,
      profileImage: profileData.profilePic || profileData.profilePicHighQuality,
      headline: profileData.headline,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn profile" },
      { status: 500 }
    );
  }
}
