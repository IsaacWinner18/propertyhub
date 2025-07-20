"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, User, Heart } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">PropertyHub</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search?type=sale" className="text-gray-700 hover:text-blue-600 font-medium">
              Buy
            </Link>
            <Link href="/search?type=rent" className="text-gray-700 hover:text-blue-600 font-medium">
              Rent
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium">
              Sell
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 font-medium">
              Agents
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="City, ZIP, neighborhood" className="input-field pr-12" />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/favorites" className="p-2 text-gray-600 hover:text-blue-600">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link href="/dashboard" className="p-2 text-gray-600 hover:text-blue-600">
                  <User className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Log In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <input type="text" placeholder="City, ZIP, neighborhood" className="input-field pr-12" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link href="/search?type=sale" className="block py-2 text-gray-700">
              Buy
            </Link>
            <Link href="/search?type=rent" className="block py-2 text-gray-700">
              Rent
            </Link>
            <Link href="/sell" className="block py-2 text-gray-700">
              Sell
            </Link>
            <Link href="/agents" className="block py-2 text-gray-700">
              Agents
            </Link>
            <Link href="/about" className="block py-2 text-gray-700">
              About
            </Link>
            <div className="pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <Link href="/favorites" className="block py-2 text-gray-700">
                    Favorites
                  </Link>
                  <Link href="/dashboard" className="block py-2 text-gray-700">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block py-2 text-gray-700">
                    Log In
                  </Link>
                  <Link href="/auth/signup" className="block py-2 text-blue-600 font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
