import { supabase } from "../supabase";

export async function verifyDatabaseSetup() {
  try {
    // Check if the quiz exists
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", "00000000-0000-0000-0000-000000000001")
      .single();

    if (quizError) {
      console.error("Error fetching quiz:", quizError);
      return {
        success: false,
        error: quizError,
        message: "Failed to fetch quiz data",
      };
    }

    // Check if questions exist
    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", "00000000-0000-0000-0000-000000000001");

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return {
        success: false,
        error: questionsError,
        message: "Failed to fetch questions data",
      };
    }

    if (!questionsData || questionsData.length === 0) {
      return {
        success: false,
        message: "No questions found for the quiz",
      };
    }

    // Check if answer options exist
    const firstQuestionId = questionsData[0].id;
    const { data: optionsData, error: optionsError } = await supabase
      .from("answer_options")
      .select("*")
      .eq("question_id", firstQuestionId);

    if (optionsError) {
      console.error("Error fetching answer options:", optionsError);
      return {
        success: false,
        error: optionsError,
        message: "Failed to fetch answer options data",
      };
    }

    if (!optionsData || optionsData.length === 0) {
      return {
        success: false,
        message: "No answer options found for the first question",
      };
    }

    // Everything is set up correctly
    return {
      success: true,
      message: "Database is set up correctly",
      data: {
        quiz: quizData,
        questions: questionsData.length,
        options: optionsData.length,
      },
    };
  } catch (error) {
    console.error("Unexpected error verifying database setup:", error);
    return {
      success: false,
      error,
      message: "Unexpected error verifying database setup",
    };
  }
}
