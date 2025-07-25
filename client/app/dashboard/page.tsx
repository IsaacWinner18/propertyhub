"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PropertyCard from "@/components/property-card"
import { User, Heart, MessageSquare, Settings, Bell } from "lucide-react"

const savedProperties = [
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
    isFavorite: true,
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
    isFavorite: true,
  },
]

const recentInquiries = [
  {
    id: "1",
    property: "Modern Downtown Apartment",
    agent: "Sarah Johnson",
    date: "2024-01-15",
    status: "Pending",
  },
  {
    id: "2",
    property: "Luxury Family Home",
    agent: "Mike Chen",
    date: "2024-01-12",
    status: "Responded",
  },
  {
    id: "3",
    property: "Cozy Studio Loft",
    agent: "Emma Davis",
    date: "2024-01-10",
    status: "Viewed",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated:", profileData)
    alert("Profile updated successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div>Coming Soon!</div>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation 
          <div className="lg:w-64">
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{profileData.name}</h3>
                  <p className="text-sm text-gray-600">Property Seeker</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === "overview" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === "favorites" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Saved Properties</span>
                </button>

                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === "inquiries" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Inquiries</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === "settings" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                  <p className="text-gray-600">Welcome back! Here's what's happening with your property search.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
                        <p className="text-gray-600">Saved Properties</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">{recentInquiries.length}</p>
                        <p className="text-gray-600">Total Inquiries</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Bell className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-2xl font-bold text-gray-900">2</p>
                        <p className="text-gray-600">New Responses</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New response from Sarah Johnson</p>
                        <p className="text-xs text-gray-600">Modern Downtown Apartment - 2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Property saved to favorites</p>
                        <p className="text-xs text-gray-600">Luxury Family Home - 1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Inquiry sent to agent</p>
                        <p className="text-xs text-gray-600">Cozy Studio Loft - 3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Properties</h1>
                  <p className="text-gray-600">Properties you've saved for later viewing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Inquiries</h1>
                  <p className="text-gray-600">Track your property inquiries and agent responses.</p>
                </div>

                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Agent
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentInquiries.map((inquiry) => (
                          <tr key={inquiry.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{inquiry.property}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{inquiry.agent}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{inquiry.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  inquiry.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : inquiry.status === "Responded"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {inquiry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
                  <p className="text-gray-600">Manage your account information and preferences.</p>
                </div>

                <div className="card p-6">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          className="input-field"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="input-field"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="input-field"
                            value={profileData.currentPassword}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <input
                            type="password"
                            className="input-field"
                            value={profileData.newPassword}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, newPassword: e.target.value }))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="input-field"
                            value={profileData.confirmPassword}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>  */}

      <Footer />
    </div>
  );
}
