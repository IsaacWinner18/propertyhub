"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { SlidersHorizontal, X } from "lucide-react"

const mockProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    location: "Downtown, Seattle, WA",
    price: "$2,500",
    type: "rent" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "/placeholder.svg?height=225&width=400",
  },
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
  {
    id: "5",
    title: "Waterfront Condo",
    location: "Kirkland, WA",
    price: "$3,200",
    type: "rent" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    image: "/placeholder.svg?height=225&width=400",
  },
  {
    id: "6",
    title: "Historic Brownstone",
    location: "Queen Anne, Seattle, WA",
    price: "$1,200,000",
    type: "sale" as const,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    image: "/placeholder.svg?height=225&width=400",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    propertyType: [] as string[],
    amenities: [] as string[],
  })
  const [sortBy, setSortBy] = useState("newest")
  const [properties, setProperties] = useState(mockProperties)

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button className="lg:hidden" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Transaction Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Transaction Type</label>
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      filters.type === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleFilterChange("type", "all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      filters.type === "sale" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleFilterChange("type", "sale")}
                  >
                    Sale
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      filters.type === "rent" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleFilterChange("type", "rent")}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="input-field text-sm"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    className="input-field text-sm"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <div className="space-y-2">
                  {["1", "2", "3", "4+"].map((bed) => (
                    <label key={bed} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.bedrooms.includes(bed)}
                        onChange={() => handleCheckboxChange("bedrooms", bed)}
                      />
                      <span className="ml-2 text-sm">
                        {bed} bedroom{bed !== "1" ? "s" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <div className="space-y-2">
                  {["1", "2", "3", "4+"].map((bath) => (
                    <label key={bath} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.bathrooms.includes(bath)}
                        onChange={() => handleCheckboxChange("bathrooms", bath)}
                      />
                      <span className="ml-2 text-sm">
                        {bath} bathroom{bath !== "1" ? "s" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <div className="space-y-2">
                  {["Apartment", "House", "Condo", "Townhouse"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={filters.propertyType.includes(type)}
                        onChange={() => handleCheckboxChange("propertyType", type)}
                      />
                      <span className="ml-2 text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-primary w-full">Apply Filters</button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Properties for {filters.type === "all" ? "Sale & Rent" : filters.type === "sale" ? "Sale" : "Rent"}
                </h1>
                <p className="text-gray-600">{properties.length} properties found</p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button className="lg:hidden btn-secondary flex items-center" onClick={() => setShowFilters(true)}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </button>

                <select className="input-field w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-secondary">Load More Properties</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
