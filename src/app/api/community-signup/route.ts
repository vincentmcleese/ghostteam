import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Get the authorized email from environment variable or use a default
const AUTHORIZED_EMAIL = "vincent@ghostteam.ai";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, firstName = "there" } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Here you would typically:
    // 1. Save email to database
    // 2. Add user to mailing list (e.g., using Mailchimp, ConvertKit, etc.)

    console.log("New community signup:", email);

    // In development, we'll send to the authorized email but store the original recipient
    const recipientEmail =
      process.env.NODE_ENV === "production" ? email : AUTHORIZED_EMAIL;

    console.log(
      "Sending welcome email to:",
      recipientEmail,
      "Original recipient:",
      email
    );

    // Send a welcome email
    const { data, error } = await resend.emails.send({
      from: "Vincent from Ghost Team <vincent@ghostteam.ai>",
      to: recipientEmail,
      subject: "Welcome to the 20hours AI Community! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to the 20hours AI Community! 👋</h1>
          <p>Hi ${firstName}!</p>
          
          <p>Thank you for joining our Slack community! We're excited to have you on board.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444;">Here's what you can expect:</h2>
            <ul>
              <li>✅ Connect with AI automation experts</li>
              <li>✅ Share your workflows and learn from others</li>
              <li>✅ Access exclusive automation templates</li>
              <li>✅ Get help with your AI implementation questions</li>
            </ul>
          </div>

          <p>To get the most out of our community:</p>
          <ol>
            <li>Introduce yourself in the #introductions channel</li>
            <li>Check out the pinned resources in #resources</li>
            <li>Ask any questions in #help</li>
          </ol>

          <p>If you need any assistance or have questions, feel free to reach out to our team in Slack or reply to this email.</p>
          
          <p>Best regards,<br>Vincent<br>Ghost Team</p>
          
          ${
            process.env.NODE_ENV !== "production"
              ? `
          <div style="margin-top: 20px; padding: 10px; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 4px;">
            <p style="color: #856404; margin: 0;">
              <strong>Development Mode:</strong> This email was sent to ${AUTHORIZED_EMAIL} instead of ${email} due to Resend's development restrictions.
            </p>
          </div>
          `
              : ""
          }
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Welcome email sent successfully:", data);

    // Return success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error processing community signup:", error);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
