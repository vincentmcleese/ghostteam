import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Join Our AI Automation Community",
  description:
    "Connect with 100+ founders and experts, share AI workflow automations, and get support in the Ghost Team AI Community.",
  path: "/community",
  ogImage: "/images/joinslack.png",
  keywords: [
    "AI community",
    "automation community",
    "AI workflows",
    "Slack community",
    "Ghost Team AI",
    "AI automation",
  ],
});

// A layout component must be a React component that renders its children.
export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
