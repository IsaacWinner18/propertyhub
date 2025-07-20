"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Clock,
  Calendar,
  BookOpen,
} from "lucide-react";

interface Agent {
  name?: string;
  avatar?: string;
  isVerified?: boolean;
}

interface AvailabilityStatus {
  isAvailable: boolean;
  availableFrom?: string;
  occupiedUntil?: string;
  daysRemaining?: number;
}

const defaultAgent: Required<Agent> = {
  name: "Unknown Agent",
  avatar: "/placeholder.svg?height=32&width=32",
  isVerified: false,
};

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "sale" | "rent" | "apartment";
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  isFavorite?: boolean;
  agent?: Agent;
  availability?: AvailabilityStatus;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  type,
  bedrooms,
  bathrooms,
  area,
  images = ["/placeholder.svg"], // Default to placeholder if images is undefined
  isFavorite = false,
  agent = defaultAgent,
  availability = { isAvailable: true },
}: PropertyCardProps) {
  // Ensure images is never empty
  const safeImages =
    images && images.length > 0 ? images : ["/placeholder.svg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(true);

  const mergedAgent = { ...defaultAgent, ...agent };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  const getTypeLabel = () => {
    switch (type) {
      case "sale":
        return "For Sale";
      case "rent":
        return "For Rent";
      case "apartment":
        return "Short Stay";
      default:
        return "For Sale";
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "sale":
        return "bg-green-500/90 text-white";
      case "rent":
        return "bg-blue-500/90 text-white";
      case "apartment":
        return "bg-purple-500/90 text-white";
      default:
        return "bg-green-500/90 text-white";
    }
  };

  const getAvailabilityStatus = () => {
    if (availability.isAvailable) {
      return {
        label: "Available Now",
        color: "bg-green-500/90 text-white",
        icon: <Calendar className="h-3 w-3" />,
      };
    } else {
      return {
        label: `Available in ${availability.daysRemaining} days`,
        color: "bg-orange-500/90 text-white",
        icon: <Clock className="h-3 w-3" />,
      };
    }
  };

  const availabilityInfo = getAvailabilityStatus();

  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/90"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(true)}
    >
      {/* Agent Profile Section */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg">
        <div className="relative">
          <Image
            src={mergedAgent.avatar || "/placeholder.svg"}
            alt={mergedAgent.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          {mergedAgent.isVerified && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
              <Shield className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-900 truncate max-w-20">
          {mergedAgent.name}
        </span>
      </div>

      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={safeImages[currentImageIndex]}
          alt={title}
          width={400}
          height={256}
          className="w-full h-full object-cover transition-transform duration-700 scale-110"
        />

        {/* Availability Overlay for Occupied Properties */}
        {!availability.isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 text-center">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">
                Currently Occupied
              </p>
              <p className="text-xs text-gray-600">
                Available {availability.availableFrom}
              </p>
            </div>
          </div>
        )}

        {/* Carousel Controls */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {safeImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md ${getTypeColor()}`}
          >
            {getTypeLabel()}
          </span>
          {/* Availability Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md flex items-center space-x-1 ${availabilityInfo.color}`}
          >
            {availabilityInfo.icon}
            <span>{availabilityInfo.label}</span>
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110">
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <div className="mt-3">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            {type === "rent" && <span className="text-gray-600">/month</span>}
            {type === "apartment" && (
              <span className="text-gray-600">/night</span>
            )}
          </div>
        </div>

        {/* Availability Info */}
        {!availability.isAvailable && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3">
            <div className="flex items-center space-x-2 text-orange-700">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                Available from {availability.availableFrom} (
                {availability.daysRemaining} days)
              </span>
            </div>
          </div>
        )}

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm font-medium">{bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm font-medium">{bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span className="text-sm font-medium">
              {area.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {location}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/listing/${id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            View Details
          </Link>
          {!availability.isAvailable && (
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center">
              <BookOpen className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
