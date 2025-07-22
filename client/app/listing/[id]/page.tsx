"use client";

import type React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import WhatsAppChat from "@/components/whatsapp-chat";
import { useProperty } from "@/contexts/PropertyContext";
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
} from "lucide-react";

export default function ListingDetailPage() {
  const params = useParams();
  const { properties, loading } = useProperty();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Find property by id from context
  const property = properties?.find((p) => p.id === params.id);

  // If loading or not found, show appropriate message
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span>Loading property details...</span>
      </div>
    );
  }
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span>Property not found.</span>
      </div>
    );
  }

  // Find similar properties (excluding current)
  const similarProperties = properties
    .filter((p) => p.id !== params.id)
    .slice(0, 6);

  // Image navigation for gallery
  const images = property.images || ["/placeholder.svg"];
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", contactForm);
    alert("Your inquiry has been sent!");
  };

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
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={property.title}
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
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? "border-blue-600"
                          : "border-transparent"
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
                      <h3 className="text-lg font-semibold mb-4">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Property Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span>{property.yearBuilt || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lot Size:</span>
                            <span>{property.lotSize || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Heating:</span>
                            <span>{property.heating || "-"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cooling:</span>
                            <span>{property.cooling || "-"}</span>
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
                      <p className="text-gray-600">
                        Interactive map would be embedded here
                      </p>
                    </div>
                  </div>
                )}
                {activeTab === "amenities" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(property.amenities || []).map((amenity: string) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          {amenity === "Pool" && (
                            <Waves className="h-5 w-5 text-blue-600" />
                          )}
                          {amenity === "Gym" && (
                            <Dumbbell className="h-5 w-5 text-blue-600" />
                          )}
                          {amenity === "Parking" && (
                            <Car className="h-5 w-5 text-blue-600" />
                          )}
                          {amenity === "WiFi" && (
                            <Wifi className="h-5 w-5 text-blue-600" />
                          )}
                          {amenity === "Concierge" && (
                            <Calendar className="h-5 w-5 text-blue-600" />
                          )}
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "similar" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Similar Properties
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {similarProperties.map((sp) => (
                        <PropertyCard key={sp.id} {...sp} />
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
                      property.type === "sale"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    For {property.type === "sale" ? "Sale" : "Rent"}
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {property.price}
                  {property.type === "rent" && (
                    <span className="text-lg text-gray-600">/month</span>
                  )}
                </div>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {property.bedrooms} bed
                      {property.bedrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {property.bathrooms} bath
                      {property.bathrooms !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {property.area?.toLocaleString?.() ||
                        property.area ||
                        "-"}{" "}
                      sqft
                    </span>
                  </div>
                </div>
              </div>
              {/* Availability Status */}
              {property.availability && !property.availability.isAvailable && (
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-6 w-6 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-900">
                      Currently Occupied
                    </h3>
                  </div>
                  <div className="space-y-2 text-orange-700">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Available from: {property.availability.availableFrom}
                    </p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Days remaining: {property.availability.daysRemaining}
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
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email *"
                    className="input-field"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="input-field"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message *"
                    rows={4}
                    className="input-field resize-none"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Inquiry
                </button>
              </form>
              {/* Agent Info */}
              {property.agent && (
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{property.agent.name}</p>
                    {property.agent.phone && <p>{property.agent.phone}</p>}
                    {property.agent.email && <p>{property.agent.email}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <WhatsAppChat />
      <Footer />
    </div>
  );
}
