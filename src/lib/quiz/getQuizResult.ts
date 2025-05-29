import { supabase } from "../supabase";

export async function getQuizResultBySession(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching quiz result:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error fetching quiz result:", error);
    return { success: false, error };
  }
}

export async function getQuizResultByLinkedinId(linkedinId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("linkedin_id", linkedinId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching quiz result by LinkedIn ID:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(
      "Unexpected error fetching quiz result by LinkedIn ID:",
      error
    );
    return { success: false, error };
  }
}

export async function getQuizResultByLinkedinUrl(linkedinUrl: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("linkedin_url", linkedinUrl)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching quiz result by LinkedIn URL:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error(
      "Unexpected error fetching quiz result by LinkedIn URL:",
      error
    );
    return { success: false, error };
  }
}
