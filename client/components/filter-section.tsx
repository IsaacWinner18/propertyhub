"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

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

const priceRanges = ["Any Price", "Under ₦500K", "₦500K - ₦1M", "₦1M - ₦2M", "₦2M - ₦5M", "₦5M - ₦10M", "Above ₦10M"]

export default function FilterSection() {
  const [filters, setFilters] = useState({
    location: "All Locations",
    priceRange: "Any Price",
    propertyType: "all",
    searchQuery: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Property</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use our advanced filters to discover properties that match your exact needs in Enugu
          </p>
        </div> */}

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter property name or keyword..."
                  className="w-full h-12 pl-12 pr-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
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

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
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

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                value={filters.propertyType}
                onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="apartment">Short Stay</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </button>
            <button className="sm:w-auto bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
