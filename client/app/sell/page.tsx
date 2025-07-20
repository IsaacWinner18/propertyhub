import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Home,
  Camera,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "List Your Property",
    description:
      "Create a detailed listing with high-quality photos and comprehensive property information.",
  },
  {
    icon: Users,
    title: "Connect with Buyers",
    description:
      "Our platform connects you with serious buyers actively searching for properties in Enugu.",
  },
  {
    icon: TrendingUp,
    title: "Get Market Value",
    description:
      "Receive competitive offers and sell at the best market price with our pricing insights.",
  },
  {
    icon: Shield,
    title: "Secure Transaction",
    description:
      "Complete your sale safely with our secure payment processing and legal documentation support.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Quick Sales",
    description: "Average time to sell: 30-45 days",
    stat: "45 Days",
  },
  {
    icon: Users,
    title: "Wide Reach",
    description: "Access to thousands of potential buyers",
    stat: "10,000+",
  },
  {
    icon: Award,
    title: "Success Rate",
    description: "Properties sold successfully",
    stat: "95%",
  },
  {
    icon: TrendingUp,
    title: "Market Value",
    description: "Average sale price vs listing price",
    stat: "98%",
  },
];

const pricingPlans = [
  {
    name: "Basic Listing",
    price: "₦50,000",
    duration: "3 months",
    features: [
      "Property listing on platform",
      "Up to 10 photos",
      "Basic property description",
      "Email support",
      "Basic analytics",
    ],
    popular: false,
  },
  {
    name: "Premium Listing",
    price: "₦100,000",
    duration: "6 months",
    features: [
      "Featured property placement",
      "Up to 25 photos + virtual tour",
      "Professional property description",
      "Priority support",
      "Advanced analytics",
      "Social media promotion",
      "Agent assistance",
    ],
    popular: true,
  },
  {
    name: "Platinum Listing",
    price: "₦150,000",
    duration: "12 months",
    features: [
      "Top placement guarantee",
      "Unlimited photos + 3D tour",
      "Professional photography",
      "Dedicated agent support",
      "Premium analytics dashboard",
      "Multi-platform promotion",
      "Legal documentation support",
      "Negotiation assistance",
    ],
    popular: false,
  },
];

export default function SellPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-600 via-green-700 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your Property in Enugu
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-green-100">
                Get the best value for your property with PropertyHub's
                comprehensive selling platform. Connect with serious buyers and
                close deals faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white hover:bg-gray-100 text-green-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  List Your Property
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                  Get Free Valuation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How to Sell Your Property
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow these simple steps to list and sell your property on
                PropertyHub
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Sell with PropertyHub?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of successful property sellers in Enugu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {benefit.stat}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose Your Listing Plan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select the perfect plan to showcase your property and attract
                the right buyers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 relative ${
                    plan.popular ? "ring-2 ring-green-500 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {plan.price}
                    </div>
                    <p className="text-gray-600">Valid for {plan.duration}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Sell Your Property?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful sellers who have found buyers through
              PropertyHub. Start your listing today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-green-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Start Listing Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                Contact Our Team
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
