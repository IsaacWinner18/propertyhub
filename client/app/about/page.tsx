import Header from "@/components/header"
import Footer from "@/components/footer"
import { Users, Award, Shield, Heart, Target, Eye } from "lucide-react"

const teamMembers = [
  {
    name: "Chukwudi Okafor",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With over 15 years in Enugu real estate, Chukwudi founded PropertyHub to revolutionize property discovery in Southeast Nigeria.",
  },
  {
    name: "Ngozi Eze",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ngozi ensures seamless operations and exceptional customer service across all PropertyHub platforms.",
  },
  {
    name: "Emeka Nwankwo",
    role: "Technology Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Emeka leads our tech team in building innovative solutions that make property search effortless.",
  },
  {
    name: "Adaora Okwu",
    role: "Head of Agent Relations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Adaora manages our network of verified agents and ensures quality service delivery.",
  },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We verify all listings and agents to ensure you have accurate information and secure transactions.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to support you throughout your property journey.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in service delivery and platform functionality.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We're building a community of property seekers, agents, and homeowners in Enugu.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-no-repeat bg-[length:60px_60px]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cg fill='white' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About PropertyHub</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
              Transforming the way people discover, rent, and buy properties in Enugu State through innovation,
              transparency, and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To make property discovery in Enugu State seamless, transparent, and accessible to everyone. We connect
                property seekers with verified agents and quality listings, ensuring a smooth and secure real estate
                experience for all parties involved.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the leading real estate platform in Southeast Nigeria, known for innovation, reliability, and
                exceptional customer service. We envision a future where finding your dream property is as simple as a
                few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600">How PropertyHub came to be</p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                PropertyHub was born out of frustration with the traditional real estate process in Enugu. Our founder,
                Chukwudi Okafor, spent months searching for a suitable apartment in 2019, dealing with unverified
                listings, unreliable agents, and lack of transparency in pricing.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Recognizing that many others faced similar challenges, Chukwudi assembled a team of tech enthusiasts and
                real estate professionals to create a platform that would revolutionize property discovery in Enugu
                State.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Since launching in 2020, PropertyHub has helped over 5,000 people find their perfect homes, connected
                hundreds of verified agents with potential clients, and facilitated millions of naira in property
                transactions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and expand our services, always keeping our users' needs at the heart of
                everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at PropertyHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind PropertyHub's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">PropertyHub by Numbers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">Our impact on the Enugu real estate market</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">5,000+</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,200+</div>
              <div className="text-blue-200">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-200">Verified Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">2,000,000,000+</div>
              <div className="text-blue-200">Transactions Facilitated</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
