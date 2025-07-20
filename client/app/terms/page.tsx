import Header from "@/components/header";
import { FileText, Scale, AlertTriangle, Users } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
              Please read these terms carefully before using PropertyHub's
              services.
            </p>
            <p className="text-gray-300">Last updated: January 15, 2024</p>
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
                  <Scale className="h-8 w-8 text-blue-600 mr-3" />
                  Agreement to Terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of
                  PropertyHub's website and services. By accessing or using our
                  services, you agree to be bound by these Terms. If you
                  disagree with any part of these terms, then you may not access
                  our services.
                </p>
              </div>

              {/* Use of Services */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-8 w-8 text-green-600 mr-3" />
                  Use of Our Services
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Eligibility
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You must be at least 18 years old to use our services. By
                  using PropertyHub, you represent and warrant that you meet
                  this age requirement.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Registration
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To access certain features, you may need to create an account.
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Providing accurate and complete information</li>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Acceptable Use
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    Use our services for any illegal or unauthorized purpose
                  </li>
                  <li>
                    Post false, misleading, or fraudulent property listings
                  </li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our services</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              {/* Property Listings */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Property Listings
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Listing Requirements
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  When posting property listings, you must:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Provide accurate and truthful information</li>
                  <li>Have legal authority to list the property</li>
                  <li>Use only genuine photographs of the property</li>
                  <li>Comply with all applicable housing laws</li>
                  <li>Update or remove listings when no longer available</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Content Ownership
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain ownership of content you post, but grant
                  PropertyHub a license to use, display, and distribute your
                  content on our platform for the purpose of providing our
                  services.
                </p>
              </div>

              {/* Fees and Payments */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Fees and Payments
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Some of our services may require payment of fees. When
                  applicable:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Fees are clearly displayed before purchase</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                  <li>You authorize us to charge your payment method</li>
                  <li>You are responsible for all applicable taxes</li>
                  <li>We may change fees with reasonable notice</li>
                </ul>
              </div>

              {/* Disclaimers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mr-3" />
                  Disclaimers and Limitations
                </h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Service Availability
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We strive to maintain service availability but cannot
                  guarantee uninterrupted access. We may temporarily suspend
                  services for maintenance or updates.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Third-Party Content
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  PropertyHub is a platform that connects users. We do not
                  verify all user-generated content and are not responsible for
                  the accuracy of property listings or user communications.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Limitation of Liability
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, PropertyHub shall not
                  be liable for any indirect, incidental, special, or
                  consequential damages arising from your use of our services.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Intellectual Property
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  PropertyHub and its content, features, and functionality are
                  owned by PropertyHub and are protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You may not reproduce, distribute, modify, or create
                  derivative works of our content without our prior written
                  consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
