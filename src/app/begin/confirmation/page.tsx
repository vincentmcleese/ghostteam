import { Metadata } from "next";

// Define the metadata
export const metadata: Metadata = {
  title: "Thank You - Survey Submitted",
  description:
    "Your survey has been successfully submitted. We'll be in touch soon!",
  openGraph: {
    title: "Thank You - Survey Submitted",
    description:
      "Your survey has been successfully submitted. We'll be in touch soon!",
    type: "website",
  },
};

/**
 * Confirmation page after survey submission
 */
export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success checkmark */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
            Thank You!
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your details have been successfully submitted. We've received your
            information and will review your requirements carefully.
          </p>

          {/* Next steps */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              What happens next?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Review & Analysis
                  </h3>
                  <p className="text-gray-600">
                    Our team will review your business requirements and assess
                    how we can best help you achieve your goals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Personalized Outreach
                  </h3>
                  <p className="text-gray-600">
                    We'll reach out within 24-48 hours to discuss your specific
                    needs and how we can support your business growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Strategy Session
                  </h3>
                  <p className="text-gray-600">
                    If we're a good fit, we'll schedule a detailed strategy
                    session to create a customized plan for your success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-gray-600">Have questions in the meantime?</p>
            <a
              href="mailto:hello@20hours.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
