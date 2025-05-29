#!/usr/bin/env node

// This script verifies that quiz results can be saved and retrieved from Supabase
// Run with: node scripts/verify-save-results.js

const { createClient } = require("@supabase/supabase-js");

// Configuration
const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyQuizResultsSaveAndRetrieve() {
  console.log("Testing quiz results save and retrieve functionality...");

  try {
    // Generate a test session ID
    const sessionId = `test-session-${Date.now()}`;

    console.log(`Using session ID: ${sessionId}`);

    // Create test quiz result data
    const resultData = {
      quiz_id: "00000000-0000-0000-0000-000000000001",
      session_id: sessionId,
      result_category: "B",
      score: 2.5,
      answers: {
        1: "A",
        2: "B",
        3: "C",
        4: "B",
        5: "B",
      },
    };

    // Step 1: Save the result
    console.log("\nStep 1: Saving quiz result...");
    const { data: savedData, error: saveError } = await supabase
      .from("quiz_results")
      .insert([resultData])
      .select();

    if (saveError) {
      console.error("❌ Error saving quiz result:", saveError);
      return;
    }

    console.log("✅ Successfully saved quiz result:");
    console.log(savedData[0]);

    // Step 2: Retrieve the result by session ID
    console.log("\nStep 2: Retrieving quiz result by session ID...");
    const { data: retrievedData, error: retrieveError } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("session_id", sessionId)
      .single();

    if (retrieveError) {
      console.error("❌ Error retrieving quiz result:", retrieveError);
      return;
    }

    console.log("✅ Successfully retrieved quiz result:");
    console.log(retrievedData);

    // Step 3: Verify the data matches
    console.log("\nStep 3: Verifying data integrity...");
    const isResultCategoryMatch =
      retrievedData.result_category === resultData.result_category;
    const isScoreMatch = retrievedData.score === resultData.score;
    const isSessionIdMatch = retrievedData.session_id === resultData.session_id;

    console.log(
      `Result category match: ${isResultCategoryMatch ? "✅" : "❌"}`
    );
    console.log(`Score match: ${isScoreMatch ? "✅" : "❌"}`);
    console.log(`Session ID match: ${isSessionIdMatch ? "✅" : "❌"}`);

    if (isResultCategoryMatch && isScoreMatch && isSessionIdMatch) {
      console.log(
        "\n🎉 Quiz results save and retrieve functionality is working correctly!"
      );
    } else {
      console.log("\n❌ Some data doesn't match. Check the implementation.");
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

// Run the verification
verifyQuizResultsSaveAndRetrieve();
