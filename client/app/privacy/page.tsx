import Header from "@/components/header";
import Footer from "@/components/footer";
import { Shield, Eye, Lock, Users } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
        <div className='absolute top-0 left-0 w-full h-full bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-blue-100">
              Your privacy is important to us. Learn how we collect, use, and
              protect your personal information.
            </p>
            <p className="text-blue-200">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="h-8 w-8 text-blue-600 mr-3" />
                  Introduction
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  PropertyHub ("we," "our," or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit
                  our website or use our services. Please read this privacy
                  policy carefully. If you do not agree with the terms of this
                  privacy policy, please do not access the site.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-8 w-8 text-green-600 mr-3" />
                  Information We Collect
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Register for an account</li>
                  <li>Contact agents or property owners</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Submit property listings</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When you visit our website, we may automatically collect
                  certain information about your device and usage patterns,
                  including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Search queries and preferences</li>
                  <li>Device information and operating system</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lock className="h-8 w-8 text-purple-600 mr-3" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the information we collect for various purposes,
                  including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and communications</li>
                  <li>Personalizing your experience</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Improving our website and services</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Information Sharing and Disclosure
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  With Your Consent
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may share your information when you explicitly consent to
                  such sharing, such as when contacting property agents or
                  owners.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Service Providers
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may share information with third-party service providers
                  who assist us in operating our website and providing services
                  to you.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Legal Requirements
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We may disclose information if required by law or in response
                  to valid legal requests from authorities.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data transmission protocols</li>
                  <li>Regular staff training on data protection</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Your Privacy Rights
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal data</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Cookies and Tracking
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance
                  your browsing experience. You can control cookie settings
                  through your browser preferences. Our use of cookies includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Marketing cookies for personalized advertising</li>
                  <li>Preference cookies to remember your settings</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data
                  practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Email:</strong> privacy@propertyhub.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +234 803 123 4567
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Independence Layout, Enugu,
                      Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Policy Updates
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. We encourage
                  you to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
