import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Notification recipients
const NOTIFICATION_EMAILS = ["elliot@ghostteam.ai", "vincent@ghostteam.ai"];

export async function POST(request: Request) {
  try {
    const leadData = await request.json();

    // Validate required fields
    if (!leadData || !leadData.email) {
      return NextResponse.json(
        { error: "Lead data is required" },
        { status: 400 }
      );
    }

    console.log("Sending lead notification emails for:", leadData.email);

    // Format the lead information for the email
    const leadInfo = `
      <h2>Lead Details:</h2>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Business Type</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.business_type || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Business Description</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.business_description || "N/A"}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Project Type</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.project_type || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Help Needed</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.help_needed || "N/A"}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Monthly Revenue</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.monthly_revenue || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Website URL</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">
            ${leadData.website_url ? `<a href="${leadData.website_url}" target="_blank">${leadData.website_url}</a>` : "N/A"}
          </td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">LinkedIn URL</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">
            ${leadData.linkedin_url ? `<a href="${leadData.linkedin_url}" target="_blank">${leadData.linkedin_url}</a>` : "N/A"}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Name</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${leadData.first_name || ""} ${leadData.last_name || ""}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Email</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">
            <a href="mailto:${leadData.email}">${leadData.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Phone</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">
            ${leadData.phone ? `<a href="tel:${leadData.phone}">${leadData.phone}</a>` : "N/A"}
          </td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: bold;">Submitted At</td>
          <td style="padding: 12px; border: 1px solid #dee2e6;">${new Date(leadData.created_at || new Date()).toLocaleString()}</td>
        </tr>
      </table>
    `;

    // Send email to all notification recipients
    const emailPromises = NOTIFICATION_EMAILS.map(async (email) => {
      return resend.emails.send({
        from: "Ghost Team <notifications@ghostteam.ai>",
        to: email,
        subject: "New lead submitted",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="background-color: #007bff; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🎉 New Lead Submitted!</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #dee2e6;">
              <p style="margin-top: 0; font-size: 16px;">A new lead has been submitted through the website lead form.</p>
              
              ${leadInfo}
              
              <div style="margin-top: 30px; padding: 15px; background-color: #d1ecf1; border-left: 4px solid #007bff; border-radius: 4px;">
                <p style="margin: 0;"><strong>Next Steps:</strong></p>
                <ul style="margin: 5px 0;">
                  <li>Review the lead information above</li>
                  <li>Reach out to the prospect within 24 hours</li>
                  <li>Add to CRM if qualified</li>
                </ul>
              </div>
              
              <p style="margin-bottom: 0; color: #6c757d; font-size: 14px;">
                This notification was automatically generated from the lead form submission.
              </p>
            </div>
          </div>
        `,
      });
    });

    // Wait for all emails to be sent
    const results = await Promise.allSettled(emailPromises);

    // Check results
    const successful = results.filter(
      (result) => result.status === "fulfilled"
    );
    const failed = results.filter((result) => result.status === "rejected");

    if (failed.length > 0) {
      console.error("Some notification emails failed:", failed);
      return NextResponse.json(
        {
          success: false,
          message: `${successful.length}/${NOTIFICATION_EMAILS.length} emails sent successfully`,
          errors: failed.map((f) => f.reason),
        },
        { status: 207 }
      ); // 207 Multi-Status
    }

    console.log(
      `All ${successful.length} lead notification emails sent successfully`
    );
    return NextResponse.json({
      success: true,
      message: `Lead notification emails sent to ${NOTIFICATION_EMAILS.length} recipients`,
      data: successful.map((result) => result.value),
    });
  } catch (error) {
    console.error("Unexpected error sending lead notifications:", error);
    return NextResponse.json(
      { error: "Failed to send lead notification emails" },
      { status: 500 }
    );
  }
}
