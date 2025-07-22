"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import StatsGrid, { Stat } from "../../components/admin/StatsGrid";
import RecentListings, { Listing } from "../../components/admin/RecentListings";
import QuickActions from "../../components/admin/QuickActions";
import AddListing, { ListingForm } from "../../components/admin/AddListing";
import {
  Users,
  LayoutDashboard,
  Building2,
  BarChart3,
  Settings,
  Eye,
  TrendingUp,
} from "lucide-react";
import React from "react";

const stats: Stat[] = [
  {
    label: "Total Listings",
    value: "1,234",
    change: "+12%",
    icon: Building2,
    color: "blue",
  },
  {
    label: "Pending Approvals",
    value: "23",
    change: "+5%",
    icon: Eye,
    color: "orange",
  },
  {
    label: "Total Users",
    value: "5,678",
    change: "+8%",
    icon: Users,
    color: "green",
  },
  {
    label: "Monthly Views",
    value: "45.2K",
    change: "+15%",
    icon: TrendingUp,
    color: "purple",
  },
];

const recentListings: Listing[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    type: "Rent",
    price: "$2,500",
    status: "Active",
    agent: "Sarah Johnson",
  },
  {
    id: "2",
    title: "Luxury Family Home",
    type: "Sale",
    price: "$850,000",
    status: "Pending",
    agent: "Mike Chen",
  },
  {
    id: "3",
    title: "Cozy Studio Loft",
    type: "Rent",
    price: "$1,800",
    status: "Active",
    agent: "Emma Davis",
  },
  {
    id: "4",
    title: "Suburban Townhouse",
    type: "Sale",
    price: "$650,000",
    status: "Rejected",
    agent: "Tom Wilson",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showAddListing, setShowAddListing] = useState(false);

  // Prevent background scroll when sidebar is open on mobile
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Hide AddListing when switching back to dashboard
  React.useEffect(() => {
    if (activeItem === "dashboard") {
      setShowAddListing(false);
    }
  }, [activeItem]);

  // Dummy submit handler for now
  const handleAddListingSubmit = (listing: ListingForm) => {
    // TODO: send to backend
    setShowAddListing(false);
    // Optionally, show a toast or update listings
  };

  return (
    <div className=" bg-gray-300 flex">
      {/* Sidebar: only visible as static on md and above */}
      <div className="hidden md:block w-64 h-screen bg-white border-r shadow-sm static z-30">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onAddListing={() => setShowAddListing(true)}
        />
      </div>
      {/* Sidebar overlay for mobile (below md) */}
      <div className="block md:hidden">
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onAddListing={() => setShowAddListing(true)}
        />
      </div>
      {/* Main content */}
      <div className="flex-1 bg-gray-200 min-h-screen">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              {/* Menu button only visible on mobile */}
              <button
                className="lg:hidden mr-4"
                aria-label="Open sidebar menu"
                onClick={() => setSidebarOpen(true)}
              >
                <LayoutDashboard className="h-6 w-6" />
              </button>
              {/* <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1> */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field w-64"
                />
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
        <div className="p-2">
          {showAddListing ? (
            <AddListing onCancel={() => setShowAddListing(false)} />
          ) : activeItem === "dashboard" ? (
            <>
              <StatsGrid stats={stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <RecentListings listings={recentListings} />
                <QuickActions onAddListing={() => setShowAddListing(true)} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
