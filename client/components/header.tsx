"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, X, User as UserIcon, Heart, ChevronDown, LogOut, Settings, Home, Key } from "lucide-react"
import { isAuthenticated, getUserData, logout, USER_ROLES, getRoleDisplayName } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated()
      setIsLoggedIn(authStatus)
      
      if (authStatus) {
        const userData = await getUserData()
        setUser(userData)
      }
    }
    
    checkAuth()
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.profile-menu')) {
        setIsProfileOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleLogout = async () => {
    try {
      await logout()
      setIsLoggedIn(false)
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

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
            {isLoggedIn && user ? (
              <div className="relative profile-menu">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    {user.role === USER_ROLES.AGENT && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">
                    {user.fullName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1" role="none">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user.fullName || 'User'}</p>
                        <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
                      </div>
                      
                      <Link 
                        href="/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Home className="mr-3 h-5 w-5 text-gray-400" />
                        Dashboard
                      </Link>
                      
                      {user.role === USER_ROLES.AGENT && (
                        <Link 
                          href="/agent/listings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Key className="mr-3 h-5 w-5 text-gray-400" />
                          My Listings
                        </Link>
                      )}
                      
                      <Link 
                        href="/settings" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="mr-3 h-5 w-5 text-red-400" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
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
            
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="block py-2 text-gray-700">
                  Dashboard
                </Link>
                {user?.role === USER_ROLES.AGENT && (
                  <Link href="/agent/listings" className="block py-2 text-gray-700">
                    My Listings
                  </Link>
                )}
                <Link href="/settings" className="block py-2 text-gray-700">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2 border-t mt-2">
                <Link href="/auth/login" className="block py-2 text-blue-600 font-medium">
                  Log In
                </Link>
                <Link href="/auth/signup" className="block py-2 bg-blue-600 text-white rounded-md text-center font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
