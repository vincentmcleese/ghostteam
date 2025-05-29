import { supabase } from "../supabase";

export type QuizResult = {
  quizId: string;
  sessionId: string;
  linkedinId?: string | null;
  linkedinUrl?: string | null;
  linkedinData?: any | null;
  resultCategory: string; // A, B, C or custom categories
  score: number;
  answers: Record<string, any>; // All answers in a JSON structure
};

export async function saveQuizResult(result: QuizResult) {
  try {
    // Create a base record without the potentially problematic field
    const baseRecord = {
      quiz_id: result.quizId,
      session_id: result.sessionId,
      linkedin_id: result.linkedinId || null,
      linkedin_data: result.linkedinData || null,
      result_category: result.resultCategory,
      score: result.score,
      answers: result.answers,
    };

    // Only add linkedin_url if it's provided in the result
    const recordToInsert = result.linkedinUrl
      ? { ...baseRecord, linkedin_url: result.linkedinUrl }
      : baseRecord;

    const { data, error } = await supabase
      .from("quiz_results")
      .insert([recordToInsert])
      .select();

    if (error) {
      // If there's a specific error about linkedin_url column not existing,
      // try again without that field
      if (error.message?.includes("linkedin_url") && result.linkedinUrl) {
        console.log("linkedin_url column doesn't exist, retrying without it");
        const { data: retryData, error: retryError } = await supabase
          .from("quiz_results")
          .insert([baseRecord])
          .select();

        if (retryError) {
          console.error("Error saving quiz result on retry:", retryError);
          return { success: false, error: retryError };
        }

        return { success: true, data: retryData };
      }

      console.error("Error saving quiz result:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving quiz result:", error);
    return { success: false, error };
  }
}
