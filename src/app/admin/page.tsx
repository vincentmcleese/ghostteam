"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminPage = () => {
  const [slackInviteLink, setSlackInviteLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchSlackLink = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/slack-link");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch Slack link");
      }
      const data = await response.json();
      setSlackInviteLink(data.slackInviteLink || "");
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching the link.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlackLink();
  }, [fetchSlackLink]);

  const handleSave = async () => {
    setIsSaving(true);
    setIsSuccess(false);
    setError("");

    // Basic client-side URL validation (optional, as server validates too)
    if (!slackInviteLink.trim()) {
      setError("Please enter a valid Slack invitation link.");
      setIsSaving(false);
      return;
    }
    const urlPattern =
      /^https:\/\/join\.slack\.com\/((t\/[\w-]+\/shared_invite\/[\w-]+)|[\w\/\-~]+)$/;
    if (!urlPattern.test(slackInviteLink)) {
      setError(
        "The link doesn't appear to be a valid Slack invitation link. It should start with https://join.slack.com/ and have a valid path."
      );
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch("/api/slack-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slackInviteLink }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save the link.");
      }

      // const result = await response.json(); // Contains { success: true, data: ... }
      setIsSuccess(true);
      // Optionally re-fetch to confirm or trust the current state
      // fetchSlackLink();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "An error occurred while saving the link.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Update the Slack community invitation link here. This link will
              then be used across the application.
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center p-4">
              <div className="w-8 h-8 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              <p className="ml-2 text-gray-600">Loading link...</p>
            </div>
          )}

          {!isLoading && (
            <div className="space-y-6">
              {isSuccess && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                  {/* Success SVG and text */}
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h5 className="text-green-800 font-medium">Success</h5>
                      <p className="text-green-700 text-sm">
                        Slack invitation link updated successfully.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                  {/* Error SVG and text */}
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h5 className="text-red-800 font-medium">Error</h5>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="slack-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Slack Invitation Link
                </label>
                <Input
                  id="slack-link"
                  placeholder="https://join.slack.com/t/yourworkspace/shared_invite/..."
                  value={slackInviteLink}
                  onChange={(e) => setSlackInviteLink(e.target.value)}
                  className="w-full"
                  disabled={isSaving || isLoading}
                />
                <p className="text-sm text-gray-500">
                  Slack invitation links can expire. You&apos;ll need to
                  generate a new link in your Slack workspace and update it here
                  regularly.
                </p>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleSave}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSaving || isLoading}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">
            How to Generate a New Slack Invitation Link
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Open your Slack workspace in a browser.</li>
            <li>Click on the workspace name in the top left.</li>
            <li>Select &quot;Invite people&quot; from the dropdown.</li>
            <li>
              If prompted, click on the &quot;Invite link&quot; tab or look for
              an option like &quot;Get an invite link to share&quot;.
            </li>
            <li>
              You may have options to set the expiration time (e.g., 30 days, 90
              days, or never). Choose appropriately.
            </li>
            <li>Copy the generated link and paste it above.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
