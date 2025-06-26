import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email and LinkedIn URL are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert into waitlist table
    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: email.toLowerCase().trim(),
          cohort_number: 2,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);

      // Handle duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully joined waitlist!",
        data: data?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
