// Test script for lead notification emails
const testLeadData = {
  business_type: "SaaS Startup",
  business_description: "We're building a productivity tool for remote teams",
  project_type: "Mobile & Web Development",
  help_needed: "Full-Stack Development",
  monthly_revenue: "$5,000 - $10,000",
  website_url: "https://example-startup.com",
  linkedin_url: "https://linkedin.com/in/founder",
  first_name: "John",
  last_name: "Doe",
  phone: "+1-555-123-4567",
  email: "john.doe@example-startup.com",
  created_at: new Date().toISOString(),
};

async function testLeadNotification() {
  console.log("🧪 Testing lead notification API...");

  try {
    const response = await fetch(
      "http://localhost:3000/api/lead-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testLeadData),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Lead notification test passed!");
      console.log("Response:", result);
    } else {
      console.error("❌ Lead notification test failed:");
      console.error("Status:", response.status);
      console.error("Response:", result);
    }
  } catch (error) {
    console.error("❌ Network error testing lead notification:", error);
  }
}

console.log("To test the lead notification:");
console.log("1. Start the development server: npm run dev");
console.log("2. Run this test: node scripts/test-lead-notification.js");
console.log(
  "3. Check your email for notifications sent to elliot@ghostteam.ai and vincent@ghostteam.ai"
);
console.log("");

// Uncomment the line below to run the test (requires dev server to be running)
// testLeadNotification();
