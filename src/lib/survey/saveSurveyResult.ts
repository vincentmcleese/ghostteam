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

// Function to save survey result to leads table
export async function saveSurveyResult(answers: Record<number, SurveyAnswer>) {
  try {
    const leadData = convertAnswersToLead(answers);

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
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
        },
      ])
      .select();

    if (error) {
      console.error("Error saving lead:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving lead:", error);
    return { success: false, error };
  }
}
