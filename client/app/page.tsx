"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import FilterSection from "@/components/filter-section";
import Newsletter from "@/components/newsletter";
import WhatsAppChat from "@/components/whatsapp-chat";
import { Search, Eye, Key, ArrowRight } from "lucide-react";
import Image from "next/image";
import PropertyList from "@/components/property-list";



export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1752586648/dben_face_two_njkbsv.jpg",
    "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1749233192/header-image-r1oppec6sbagu6n3b0ndd6ydbgok8uypvu1b73s034_sjkihe.jpg",
    "https://res.cloudinary.com/dkfmaqtpy/image/upload/v1751988615/Dubai-real-estate_hawrbw.jpg",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImages[currentSlide] || "/placeholder.svg"}
            alt="Featured Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Your Dream Home in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enugu
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
              From luxury apartments to cozy short-stays, find the perfect
              property that matches your lifestyle and budget in the heart of
              Enugu State.
            </p>

            {/* Hero Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-3 shadow-2xl border border-white/20">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search by location, property type, or price range..."
                      className="w-full h-14 pl-12 pr-4 text-gray-900 bg-transparent rounded-2xl focus:outline-none placeholder-gray-500"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 md:py-4 px-4 md:px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Find Properties
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Featured Properties
              </h2>
              <p className="text-sm md:text-md text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our handpicked selection of premium properties across
                Enugu, from luxury homes to affordable short-stay apartments.
              </p>
            </div>

            <div className=" lg:px-8 py-8 max-w-7xl mx-auto w-full">
              <PropertyList />
            </div>

            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center mx-auto">
                View All Properties
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
      </section>
      {/* <FilterSection /> */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-4 md:mx-auto my-16 ">
        {stats.map((stat, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-100px" });
          const [count, setCount] = useState(0);

          useEffect(() => {
            let controls: any;
            if (isInView) {
              controls = animate(0, stat.value, {
                duration: 1.5,
                ease: "easeOut",
                onUpdate: (latest) => setCount(Math.floor(latest)),
              });
            }
            return () => controls && controls.stop && controls.stop();
          }, [isInView, stat.value]);

          return (
            <motion.div
              key={stat.label}
              ref={ref}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              }}
              className={`rounded-3xl bg-gradient-to-br ${stat.card} shadow-xl p-8 flex flex-col items-center justify-center backdrop-blur-lg border border-white/30 transition-all duration-300 cursor-pointer group`}
            >
              <div
                className={`text-4xl md:text-5xl font-bold mb-2 ${stat.numberColor} drop-shadow-lg`}
              >
                {count}+
              </div>
              <div className="text-base md:text-lg text-gray-600 font-medium text-center">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              How PropertyHub Works
            </h2>
            <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
              Finding your perfect property in Enugu has never been easier.
              Follow these simple steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Image
                    src="/Search_icon-removebg-preview.png"
                    alt="SearchIcon"
                    width={68}
                    height={68}
                    className="object-contain h-21 w-21"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Search & Filter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Use our advanced search filters to find properties that match
                your exact requirements, budget, and preferred location in
                Enugu.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Image
                    src="/map-agent.png"
                    alt="Map Agent"
                    width={68}
                    height={68}
                    className="object-contain h-21 w-21"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Schedule Tours
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with verified agents and schedule property viewings at
                your convenience. Virtual tours are also available for remote
                viewing.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Image
                    src="/3d-key-icon.png"
                    alt="Key Icon"
                    width={68}
                    height={68}
                    className="object-contain h-21 w-21"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Secure & Move
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Complete the paperwork with our secure platform, make payments
                safely, and get the keys to your new home in Enugu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Chat Widget */}
      <WhatsAppChat />

      <Newsletter />
      <Footer />
    </div>
  );
}

// Stats data for cards
const stats = [
  {
    value: 1000,
    label: "Properties Listed",
    color: "text-blue-400",
    card: "from-blue-100/60 to-blue-50/80",
    numberColor: "text-blue-400",
  },
  {
    value: 500,
    label: "Happy Clients",
    color: "text-purple-400",
    card: "from-purple-100/60 to-purple-50/80",
    numberColor: "text-purple-400",
  },
  {
    value: 50,
    label: "Verified Agents",
    color: "text-green-400",
    card: "from-green-100/60 to-green-50/80",
    numberColor: "text-green-400",
  },
];
