import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Get the authorized email from environment variable or use a default
const AUTHORIZED_EMAIL = process.env.AUTHORIZED_EMAIL || "vincent@ghostteam.ai";

export async function POST(request: Request) {
  try {
    const { email, firstName, resultType } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!resultType) {
      return NextResponse.json(
        { error: "Result type is required" },
        { status: 400 }
      );
    }

    // In development, we'll send to the authorized email but store the original recipient
    const recipientEmail =
      process.env.NODE_ENV === "production" ? email : AUTHORIZED_EMAIL;

    console.log(
      "Sending email to:",
      recipientEmail,
      "Original recipient:",
      email,
      "Result type:",
      resultType
    );

    // Generate a unique download link
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/downloads/${resultType}-toolkit.pdf`;

    const { data, error } = await resend.emails.send({
      from: "AI Recruiting Toolkit <onboarding@resend.dev>",
      to: recipientEmail,
      subject: "Your AI Recruiting Toolkit is Ready! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Hi ${firstName || "there"}! 👋</h1>
          <p>Thank you for taking our AI Readiness Quiz! Based on your results as a <strong>${resultType}</strong>, we've prepared a personalized toolkit just for you.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444;">Your Toolkit Includes:</h2>
            <ul>
              <li>✅ Customized checklists</li>
              <li>✅ Ready-to-use templates</li>
              <li>✅ Quick-start guides</li>
              <li>✅ Best practices for your specific profile</li>
            </ul>
          </div>

          <a href="${downloadLink}" 
             style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Download Your Toolkit
          </a>

          <p style="color: #666; font-size: 14px;">This link will expire in 7 days.</p>
          
          <p>Best regards,<br>The AI Recruiting Team</p>
          
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

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
