#!/usr/bin/env node

const { createClient } = require("@supabase/supabase-js");

// Configuration
const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Testing quiz_results insert...");

  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .insert([
        {
          quiz_id: "00000000-0000-0000-0000-000000000001",
          session_id: "test-session-" + Date.now(),
          result_category: "A",
          score: 10,
          answers: { q1: "test answer" },
        },
      ])
      .select();

    if (error) {
      console.error("❌ Error inserting test data:", error);
      return;
    }

    console.log("✅ Successfully inserted test data:");
    console.log(data);

    // Now try to fetch the data we just inserted
    const { data: fetchedData, error: fetchError } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error("❌ Error fetching quiz results:", fetchError);
      return;
    }

    console.log("\n✅ Most recent quiz results in the database:");
    console.log(fetchedData);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

// Run the test
testInsert();
