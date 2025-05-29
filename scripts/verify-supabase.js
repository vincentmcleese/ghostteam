#!/usr/bin/env node

// This script verifies the Supabase connection and database setup
// Run with: node scripts/verify-supabase.js

const { createClient } = require("@supabase/supabase-js");

// Configuration
const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJle" +
  "HAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabase() {
  try {
    console.log("Verifying Supabase connection and database setup...");

    // Check quiz data
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", "00000000-0000-0000-0000-000000000001")
      .single();

    if (quizError) {
      console.error("❌ Error fetching quiz:", quizError);
      return;
    }

    console.log("✅ Successfully connected to Supabase");
    console.log(`✅ Found quiz: ${quizData.title}`);

    // Check questions
    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", "00000000-0000-0000-0000-000000000001");

    if (questionsError) {
      console.error("❌ Error fetching questions:", questionsError);
      return;
    }

    console.log(`✅ Found ${questionsData.length} questions`);

    // Check answer options for first question
    if (questionsData.length > 0) {
      const firstQuestionId = questionsData[0].id;
      const { data: optionsData, error: optionsError } = await supabase
        .from("answer_options")
        .select("*")
        .eq("question_id", firstQuestionId);

      if (optionsError) {
        console.error("❌ Error fetching answer options:", optionsError);
        return;
      }

      console.log(
        `✅ Found ${optionsData.length} answer options for the first question`
      );
    }

    console.log(
      "\n🎉 Your Supabase local development setup is working correctly!"
    );
    console.log("\nNext steps:");
    console.log(
      "1. Make sure to set up your .env.local with Supabase credentials"
    );
    console.log("2. Use the supabase client in your application");
    console.log(
      "3. When ready to deploy, link your project with: npx supabase link --project-ref <YOUR_PROJECT_REF>"
    );
    console.log(
      "4. Push your local schema to production with: npx supabase db push"
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

// Run the verification
verifyDatabase();
