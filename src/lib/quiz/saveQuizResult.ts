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
    const { data, error } = await supabase
      .from("quiz_results")
      .insert([
        {
          quiz_id: result.quizId,
          session_id: result.sessionId,
          linkedin_id: result.linkedinId || null,
          linkedin_url: result.linkedinUrl || null,
          linkedin_data: result.linkedinData || null,
          result_category: result.resultCategory,
          score: result.score,
          answers: result.answers,
        },
      ])
      .select();

    if (error) {
      console.error("Error saving quiz result:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error saving quiz result:", error);
    return { success: false, error };
  }
}
