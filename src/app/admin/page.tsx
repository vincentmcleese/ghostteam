"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminPage = () => {
  const [slackInviteLink, setSlackInviteLink] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load the current Slack invite link from localStorage
    const storedLink = localStorage.getItem("slackInviteLink");
    if (storedLink) {
      setSlackInviteLink(storedLink);
    }
  }, []);

  const handleSave = () => {
    try {
      // Validate URL
      if (!slackInviteLink.trim()) {
        setError("Please enter a valid Slack invitation link");
        setIsSuccess(false);
        return;
      }

      // Basic URL validation
      const urlPattern =
        /^https:\/\/join\.slack\.com\/t\/[\w-]+\/shared_invite\/[\w-]+$/;
      if (!urlPattern.test(slackInviteLink)) {
        setError(
          "The link doesn't appear to be a valid Slack invitation link. It should start with https://join.slack.com/"
        );
        setIsSuccess(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem("slackInviteLink", slackInviteLink);
      setIsSuccess(true);
      setError("");

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch {
      // Ignoring the specific error details
      setError("Failed to save the invitation link");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Update the Slack community invitation link here. This link will be
              used on the Community page.
            </p>
          </div>

          <div className="space-y-6">
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md">
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
              />
              <p className="text-sm text-gray-500">
                Slack invitation links expire, typically after 30 days.
                You&apos;ll need to generate a new link in your Slack workspace
                and update it here.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSave}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">
            How to generate a new Slack invitation link
          </h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open your Slack workspace in a browser</li>
            <li>Click on the workspace name in the top left</li>
            <li>Select &quot;Invite people&quot; from the dropdown</li>
            <li>Choose &quot;Share invite link&quot;</li>
            <li>Set the expiration time (recommend 30 days)</li>
            <li>Copy the generated link and paste it above</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
