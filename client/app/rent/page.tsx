"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { SlidersHorizontal, X, MapPin, Home, Calendar } from "lucide-react"

const rentProperties = [
  {
    id: "1",
    title: "Luxury 3-Bedroom Apartment in Independence Layout",
    location: "Independence Layout, Enugu",
    price: "₦2,500,000",
    type: "rent" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    images: [
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
    ],
    agent: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: true,
    },
  },
  {
    id: "2",
    title: "Modern 2-Bedroom Flat in GRA",
    location: "GRA Enugu, Enugu",
    price: "₦1,800,000",
    type: "rent" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    images: ["/placeholder.svg?height=256&width=400", "/placeholder.svg?height=256&width=400"],
    agent: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: true,
    },
  },
  {
    id: "3",
    title: "Spacious 4-Bedroom Duplex in New Haven",
    location: "New Haven, Enugu",
    price: "₦3,200,000",
    type: "rent" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 1800,
    images: [
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
    ],
    agent: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: true,
    },
  },
  {
    id: "4",
    title: "Cozy 1-Bedroom Apartment in Trans Ekulu",
    location: "Trans Ekulu, Enugu",
    price: "₦800,000",
    type: "rent" as const,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    images: ["/placeholder.svg?height=256&width=400", "/placeholder.svg?height=256&width=400"],
    agent: {
      name: "Tom Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: false,
    },
  },
  {
    id: "5",
    title: "Executive 3-Bedroom Flat in Achara Layout",
    location: "Achara Layout, Enugu",
    price: "₦2,000,000",
    type: "rent" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 1100,
    images: [
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
      "/placeholder.svg?height=256&width=400",
    ],
    agent: {
      name: "Grace Okoro",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: true,
    },
  },
  {
    id: "6",
    title: "Beautiful 2-Bedroom Apartment in Coal Camp",
    location: "Coal Camp, Enugu",
    price: "₦1,200,000",
    type: "rent" as const,
    bedrooms: 2,
    bathrooms: 1,
    area: 800,
    images: ["/placeholder.svg?height=256&width=400", "/placeholder.svg?height=256&width=400"],
    agent: {
      name: "David Eze",
      avatar: "/placeholder.svg?height=32&width=32",
      isVerified: true,
    },
  },
]

const locations = [
  "All Locations",
  "Independence Layout",
  "GRA Enugu",
  "New Haven",
  "Trans Ekulu",
  "Achara Layout",
  "Coal Camp",
  "Uwani",
  "Abakpa Nike",
]

const priceRanges = ["Any Price", "Under ₦1M", "₦1M - ₦2M", "₦2M - ₦3M", "₦3M - ₦5M", "Above ₦5M"]

export default function RentPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: "All Locations",
    priceRange: "Any Price",
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    propertyType: [] as string[],
    amenities: [] as string[],
  })
  const [sortBy, setSortBy] = useState("newest")
  const [properties, setProperties] = useState(rentProperties)

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleCheckboxChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key as keyof typeof prev].includes(value)
        ? (prev[key as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[key as keyof typeof prev] as string[]), value],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Properties for Rent in Enugu</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100">
              Discover comfortable and affordable rental properties across Enugu State. From luxury apartments to cozy
              family homes.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{properties.length}+</div>
                <div className="text-sm md:text-base text-gray-300">Available Rentals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">9</div>
                <div className="text-sm md:text-base text-gray-300">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-sm md:text-base text-gray-300">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filter Properties</h3>
                <button className="lg:hidden" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                <select
                  className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
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

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Monthly Rent</label>
                <select
                  className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
                <div className="space-y-3">
                  {["1", "2", "3", "4", "5+"].map((bed) => (
                    <label key={bed} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.bedrooms.includes(bed)}
                        onChange={() => handleCheckboxChange("bedrooms", bed)}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {bed} bedroom{bed !== "1" ? "s" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bathrooms</label>
                <div className="space-y-3">
                  {["1", "2", "3", "4+"].map((bath) => (
                    <label key={bath} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.bathrooms.includes(bath)}
                        onChange={() => handleCheckboxChange("bathrooms", bath)}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {bath} bathroom{bath !== "1" ? "s" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                <div className="space-y-3">
                  {["Apartment", "House", "Duplex", "Flat", "Bungalow"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.propertyType.includes(type)}
                        onChange={() => handleCheckboxChange("propertyType", type)}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Properties in Enugu</h1>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {properties.length} properties available for rent
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                  className="lg:hidden bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-700 py-2 px-4 rounded-2xl font-medium flex items-center"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </button>

                <select
                  className="h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bedrooms">Most Bedrooms</option>
                </select>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Load More Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Rental */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Rent in Enugu?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of renting properties in Enugu State
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexibility</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy the freedom to move when your circumstances change without the commitment of ownership.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Maintenance Worries</h3>
              <p className="text-gray-600 leading-relaxed">
                Let landlords handle repairs and maintenance while you focus on enjoying your home.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prime Locations</h3>
              <p className="text-gray-600 leading-relaxed">
                Access premium locations in Enugu that might be unaffordable to purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
