import { supabase } from "../supabase";
import { CommunityApplicantRecord, CommunityApplicationAnswer, CommunityContactDetails } from "./community-application-types";

// Helper function to convert community application answers to applicant record
export const convertAnswersToApplicant = (
  answers: Record<number, CommunityApplicationAnswer>
): CommunityApplicantRecord => {
  const businessType = answers[1] as string;
  const businessDescription = answers[2] as string;
  const monthlyRevenue = answers[3] as string;
  const aiExperience = answers[4] as string;
  const communityGoals = answers[5] as string[];
  const aiChallenge = answers[6] as string;
  const websiteUrl = answers[7] as string;
  const linkedinUrl = answers[8] as string;
  const contactDetails = answers[9] as CommunityContactDetails;

  return {
    businessType,
    businessDescription,
    monthlyRevenue,
    aiExperience,
    communityGoals,
    aiChallenge,
    websiteUrl,
    linkedinUrl,
    firstName: contactDetails.firstName,
    lastName: contactDetails.lastName,
    phone: contactDetails.phone,
    email: contactDetails.email,
    company: contactDetails.company,
    hearAboutUs: contactDetails.hearAboutUs,
    hearAboutUsOther: contactDetails.hearAboutUsOther,
  };
};

// Helper function to send community application notification emails
async function sendCommunityApplicationNotification(applicantData: any) {
  try {
    // Get base URL - handle different environments
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/community-application-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicantData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send community application notification:", errorData);
      return false;
    }

    const result = await response.json();
    console.log("Community application notification sent successfully:", result.message);
    return true;
  } catch (error) {
    console.error("Error sending community application notification:", error);
    return false;
  }
}

// Function to save community application result to community_applicants table
export async function saveCommunityApplication(answers: Record<number, CommunityApplicationAnswer>) {
  try {
    const applicantData = convertAnswersToApplicant(answers);

    const applicantRecord = {
      business_type: applicantData.businessType,
      business_description: applicantData.businessDescription,
      monthly_revenue: applicantData.monthlyRevenue,
      ai_experience: applicantData.aiExperience,
      community_goals: applicantData.communityGoals,
      ai_challenge: applicantData.aiChallenge,
      website_url: applicantData.websiteUrl,
      linkedin_url: applicantData.linkedinUrl,
      first_name: applicantData.firstName,
      last_name: applicantData.lastName,
      phone: applicantData.phone,
      email: applicantData.email,
      company: applicantData.company,
      hear_about_us: applicantData.hearAboutUs,
      hear_about_us_other: applicantData.hearAboutUsOther,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("community_applicants")
      .insert([applicantRecord])
      .select();

    if (error) {
      console.error("Error saving community application:", error);
      return { success: false, error };
    }

    console.log("Community application saved successfully:", data);

    // Send notification emails after successful database save
    // Note: We don't await this to avoid blocking the user response
    // If email fails, it won't affect the application submission
    sendCommunityApplicationNotification(applicantRecord).catch((emailError) => {
      console.error(
        "Community application notification email failed (non-blocking):",
        emailError
      );
    });

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving community application:", error);
    return { success: false, error };
  }
}