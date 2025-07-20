"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Building2, Users, BarChart3, Settings, Menu, X, Eye, TrendingUp } from "lucide-react"

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { id: "listings", label: "Listings", icon: Building2, href: "/admin/listings" },
  { id: "users", label: "Users", icon: Users, href: "/admin/users" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
]

const stats = [
  { label: "Total Listings", value: "1,234", change: "+12%", icon: Building2, color: "blue" },
  { label: "Pending Approvals", value: "23", change: "+5%", icon: Eye, color: "orange" },
  { label: "Total Users", value: "5,678", change: "+8%", icon: Users, color: "green" },
  { label: "Monthly Views", value: "45.2K", change: "+15%", icon: TrendingUp, color: "purple" },
]

const recentListings = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    type: "Rent",
    price: "$2,500",
    status: "Active",
    agent: "Sarah Johnson",
  },
  { id: "2", title: "Luxury Family Home", type: "Sale", price: "$850,000", status: "Pending", agent: "Mike Chen" },
  { id: "3", title: "Cozy Studio Loft", type: "Rent", price: "$1,800", status: "Active", agent: "Emma Davis" },
  { id: "4", title: "Suburban Townhouse", type: "Sale", price: "$650,000", status: "Rejected", agent: "Tom Wilson" },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="text-xl font-bold text-blue-600">PropertyHub Admin</div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search..." className="input-field w-64" />
              </div>

              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="hidden md:block">Admin User</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="card p-6">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        stat.color === "blue"
                          ? "bg-blue-100"
                          : stat.color === "orange"
                            ? "bg-orange-100"
                            : stat.color === "green"
                              ? "bg-green-100"
                              : "bg-purple-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "orange"
                              ? "text-orange-600"
                              : stat.color === "green"
                                ? "text-green-600"
                                : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p
                        className={`text-xs font-medium ${
                          stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change} from last month
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Listings */}
            <div className="card">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Recent Listings</h3>
                  <Link href="/admin/listings" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{listing.title}</h4>
                        <p className="text-sm text-gray-600">
                          {listing.agent} • {listing.type} • {listing.price}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          listing.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : listing.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Link
                    href="/admin/listings/new"
                    className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Add New Listing</h4>
                        <p className="text-sm text-gray-600">Create a new property listing</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin/users"
                    className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Manage Users</h4>
                        <p className="text-sm text-gray-600">View and manage user accounts</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin/analytics"
                    className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">View Analytics</h4>
                        <p className="text-sm text-gray-600">Check performance metrics</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
