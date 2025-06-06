import { supabase } from "../supabase";
import { LeadRecord, SurveyAnswer, ContactDetails } from "./survey-types";

// Helper function to convert survey answers to lead record
export const convertAnswersToLead = (
  answers: Record<number, SurveyAnswer>
): LeadRecord => {
  const businessType = answers[1] as string;
  const businessDescription = answers[2] as string;
  const projectType = answers[3] as string;
  const helpNeeded = answers[4] as string;
  const monthlyRevenue = answers[5] as string;
  const websiteUrl = answers[6] as string;
  const linkedinUrl = answers[7] as string;
  const contactDetails = answers[8] as ContactDetails;

  return {
    businessType,
    businessDescription,
    projectType,
    helpNeeded,
    monthlyRevenue,
    websiteUrl,
    linkedinUrl,
    firstName: contactDetails.firstName,
    lastName: contactDetails.lastName,
    phone: contactDetails.phone,
    email: contactDetails.email,
  };
};

// Helper function to send lead notification emails
async function sendLeadNotification(leadData: any) {
  try {
    // Get base URL - handle different environments
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/lead-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send lead notification:", errorData);
      return false;
    }

    const result = await response.json();
    console.log("Lead notification sent successfully:", result.message);
    return true;
  } catch (error) {
    console.error("Error sending lead notification:", error);
    return false;
  }
}

// Function to save survey result to leads table
export async function saveSurveyResult(answers: Record<number, SurveyAnswer>) {
  try {
    const leadData = convertAnswersToLead(answers);

    const leadRecord = {
      business_type: leadData.businessType,
      business_description: leadData.businessDescription,
      project_type: leadData.projectType,
      help_needed: leadData.helpNeeded,
      monthly_revenue: leadData.monthlyRevenue,
      website_url: leadData.websiteUrl,
      linkedin_url: leadData.linkedinUrl,
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      phone: leadData.phone,
      email: leadData.email,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("leads")
      .insert([leadRecord])
      .select();

    if (error) {
      console.error("Error saving lead:", error);
      return { success: false, error };
    }

    console.log("Lead saved successfully:", data);

    // Send notification emails after successful database save
    // Note: We don't await this to avoid blocking the user response
    // If email fails, it won't affect the lead submission
    sendLeadNotification(leadRecord).catch((emailError) => {
      console.error(
        "Lead notification email failed (non-blocking):",
        emailError
      );
    });

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving lead:", error);
    return { success: false, error };
  }
}
