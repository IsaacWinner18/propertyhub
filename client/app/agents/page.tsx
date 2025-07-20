"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Star, MapPin, Phone, Mail, Shield, Award, Users } from "lucide-react"

const agents = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    rating: 4.9,
    reviews: 127,
    specialization: "Luxury Properties",
    location: "GRA Enugu, Independence Layout",
    experience: "8 years",
    propertiesSold: 156,
    phone: "+234 803 123 4567",
    email: "sarah@propertyhub.com",
    bio: "Specializing in luxury properties across Enugu's premium locations. Sarah has helped over 150 families find their dream homes.",
    languages: ["English", "Igbo"],
    certifications: ["Licensed Real Estate Agent", "Property Valuation Certified"],
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    rating: 4.8,
    reviews: 89,
    specialization: "Commercial Properties",
    location: "New Haven, Trans Ekulu",
    experience: "6 years",
    propertiesSold: 98,
    phone: "+234 806 987 6543",
    email: "mike@propertyhub.com",
    bio: "Expert in commercial real estate with extensive knowledge of Enugu's business districts and investment opportunities.",
    languages: ["English", "Mandarin"],
    certifications: ["Commercial Real Estate License", "Investment Property Specialist"],
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    rating: 4.7,
    reviews: 203,
    specialization: "Residential Rentals",
    location: "Achara Layout, Coal Camp",
    experience: "5 years",
    propertiesSold: 234,
    phone: "+234 809 456 7890",
    email: "emma@propertyhub.com",
    bio: "Passionate about helping people find perfect rental homes. Emma specializes in residential properties and short-term rentals.",
    languages: ["English", "French"],
    certifications: ["Residential Property License", "Rental Management Certified"],
  },
  {
    id: "4",
    name: "Tom Wilson",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: false,
    rating: 4.6,
    reviews: 67,
    specialization: "Affordable Housing",
    location: "Uwani, Abakpa Nike",
    experience: "4 years",
    propertiesSold: 89,
    phone: "+234 807 234 5678",
    email: "tom@propertyhub.com",
    bio: "Dedicated to making homeownership accessible. Tom focuses on affordable housing solutions for young families and first-time buyers.",
    languages: ["English"],
    certifications: ["Real Estate License"],
  },
  {
    id: "5",
    name: "Grace Okoro",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    rating: 4.9,
    reviews: 145,
    specialization: "Investment Properties",
    location: "Independence Layout, GRA",
    experience: "10 years",
    propertiesSold: 187,
    phone: "+234 805 345 6789",
    email: "grace@propertyhub.com",
    bio: "Investment property specialist with a decade of experience. Grace helps clients build wealth through strategic real estate investments.",
    languages: ["English", "Igbo", "Yoruba"],
    certifications: ["Investment Property Specialist", "Property Management License", "Real Estate Broker"],
  },
  {
    id: "6",
    name: "David Eze",
    avatar: "/placeholder.svg?height=200&width=200",
    isVerified: true,
    rating: 4.5,
    reviews: 78,
    specialization: "New Developments",
    location: "Trans Ekulu, New Haven",
    experience: "7 years",
    propertiesSold: 112,
    phone: "+234 808 567 8901",
    email: "david@propertyhub.com",
    bio: "Expert in new property developments and off-plan sales. David helps clients secure properties in upcoming developments.",
    languages: ["English", "Igbo"],
    certifications: ["Development Sales Specialist", "Real Estate License"],
  },
]

const specializations = [
  "All Specializations",
  "Luxury Properties",
  "Commercial Properties",
  "Residential Rentals",
  "Affordable Housing",
  "Investment Properties",
  "New Developments",
]

const locations = [
  "All Locations",
  "GRA Enugu",
  "Independence Layout",
  "New Haven",
  "Trans Ekulu",
  "Achara Layout",
  "Coal Camp",
  "Uwani",
  "Abakpa Nike",
]

export default function AgentsPage() {
  const [filters, setFilters] = useState({
    specialization: "All Specializations",
    location: "All Locations",
    rating: "all",
  })
  const [filteredAgents, setFilteredAgents] = useState(agents)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    // Apply filters logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet Our Expert Agents</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-purple-100">
              Connect with verified real estate professionals in Enugu who will help you find your perfect property or
              sell at the best price.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-sm md:text-base text-gray-300">Verified Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">4.8</div>
                <div className="text-sm md:text-base text-gray-300">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">1000+</div>
                <div className="text-sm md:text-base text-gray-300">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange("specialization", e.target.value)}
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.0+">4.0+ Stars</option>
                  <option value="3.5+">3.5+ Stars</option>
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                  Find Agents
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                {/* Agent Header */}
                <div className="relative p-6 pb-0">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={agent.avatar || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {agent.isVerified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                      <p className="text-purple-600 font-semibold mb-2">{agent.specialization}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">{agent.rating}</span>
                          <span className="ml-1">({agent.reviews})</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{agent.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Stats */}
                <div className="px-6 py-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-2xl">
                      <div className="text-2xl font-bold text-purple-600">{agent.propertiesSold}</div>
                      <div className="text-xs text-gray-600">Properties Sold</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-2xl">
                      <div className="text-2xl font-bold text-green-600">{agent.reviews}</div>
                      <div className="text-xs text-gray-600">Client Reviews</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{agent.bio}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{agent.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2" />
                      <span>{agent.certifications[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="px-6 pb-6">
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Agent CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Become a PropertyHub Agent</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our network of successful real estate professionals and grow your business with our platform and tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Apply Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
