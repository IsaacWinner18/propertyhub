"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import {
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  Calendar,
  MapPin,
  Car,
  Wifi,
  Dumbbell,
  Waves,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
} from "lucide-react"

const mockProperty = {
  id: "1",
  title: "Modern Downtown Apartment",
  location: "Downtown, Seattle, WA",
  price: "$2,500",
  type: "rent" as const,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  yearBuilt: 2020,
  lotSize: "N/A",
  heating: "Central Air",
  cooling: "Central Air",
  description:
    "Beautiful modern apartment in the heart of downtown Seattle. This stunning 2-bedroom, 2-bathroom unit features floor-to-ceiling windows, hardwood floors, and a gourmet kitchen with stainless steel appliances. The building offers world-class amenities including a fitness center, rooftop deck, and concierge service.",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  amenities: ["Pool", "Gym", "Parking", "WiFi", "Concierge"],
  agent: {
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah@propertyhub.com",
  },
  availability: {
    isAvailable: false,
    availableFrom: "March 15, 2024",
    occupiedUntil: "March 14, 2024",
    daysRemaining: 45,
  },
}

const similarProperties = [
  {
    id: "2",
    title: "Luxury Family Home",
    location: "Bellevue, WA",
    price: "$850,000",
    type: "sale" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    id: "3",
    title: "Cozy Studio Loft",
    location: "Capitol Hill, Seattle, WA",
    price: "$1,800",
    type: "rent" as const,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    id: "4",
    title: "Suburban Townhouse",
    location: "Redmond, WA",
    price: "$650,000",
    type: "sale" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "/placeholder.svg?height=225&width=400",
  },
]

export default function ListingDetailPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("details")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === mockProperty.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? mockProperty.images.length - 1 : prev - 1))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    alert("Your inquiry has been sent!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="card mb-8">
              <div className="relative">
                <img
                  src={mockProperty.images[currentImageIndex] || "/placeholder.svg"}
                  alt={mockProperty.title}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {mockProperty.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {mockProperty.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? "border-blue-600" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info Tabs */}
            <div className="card">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {["details", "map", "amenities", "similar"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{mockProperty.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Property Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span>{mockProperty.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lot Size:</span>
                            <span>{mockProperty.lotSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heating:</span>
                            <span>{mockProperty.heating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cooling:</span>
                            <span>{mockProperty.cooling}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "map" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Location</h3>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-600">Interactive map would be embedded here</p>
                    </div>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockProperty.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          {amenity === "Pool" && <Waves className="h-5 w-5 text-blue-600" />}
                          {amenity === "Gym" && <Dumbbell className="h-5 w-5 text-blue-600" />}
                          {amenity === "Parking" && <Car className="h-5 w-5 text-blue-600" />}
                          {amenity === "WiFi" && <Wifi className="h-5 w-5 text-blue-600" />}
                          {amenity === "Concierge" && <Calendar className="h-5 w-5 text-blue-600" />}
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "similar" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Similar Properties</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {similarProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Property Summary */}
            <div className="card p-6 mb-6 sticky top-24">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      mockProperty.type === "sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    For {mockProperty.type === "sale" ? "Sale" : "Rent"}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-red-600">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockProperty.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mockProperty.location}</span>
                </div>

                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {mockProperty.price}
                  {mockProperty.type === "rent" && <span className="text-lg text-gray-600">/month</span>}
                </div>

                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {mockProperty.bedrooms} bed{mockProperty.bedrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {mockProperty.bathrooms} bath{mockProperty.bathrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span className="text-sm">{mockProperty.area.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              {!mockProperty.availability.isAvailable && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-900">Currently Occupied</h3>
                  </div>
                  <div className="space-y-2 text-orange-700">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Available from: {mockProperty.availability.availableFrom}
                    </p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Days remaining: {mockProperty.availability.daysRemaining}
                    </p>
                  </div>
                  <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Book for Future Availability
                  </button>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Agent</h3>

                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    className="input-field"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email *"
                    className="input-field"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="input-field"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message *"
                    rows={4}
                    className="input-field resize-none"
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Inquiry
                </button>
              </form>

              {/* Agent Info */}
              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{mockProperty.agent.name}</p>
                  <p>{mockProperty.agent.phone}</p>
                  <p>{mockProperty.agent.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppChat />
      <Footer />
    </div>
  )
}

import WhatsAppChat from "@/components/whatsapp-chat"
