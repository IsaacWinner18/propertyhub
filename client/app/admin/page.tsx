"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import StatsGrid, { Stat } from "../../components/admin/StatsGrid";
import RecentListings, { Listing } from "../../components/admin/RecentListings";
import QuickActions from "../../components/admin/QuickActions";
import AddListing, { ListingForm } from "../../components/admin/AddListing";
import { adminApi } from "../../lib/api";
import {
  Users,
  LayoutDashboard,
  Building2,
  Eye,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// Simple alert component since shadcn/ui is not installed
const Alert = ({ variant = 'default', children }: { variant?: 'default' | 'destructive', children: React.ReactNode }) => (
  <div className={`p-4 mb-4 rounded-md ${variant === 'destructive' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
    {children}
  </div>
);

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold mb-2">{children}</h3>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Simple button component
const Button = ({
  variant = 'default',
  size = 'default',
  className = '',
  onClick,
  children,
}: {
  variant?: 'default' | 'outline' | 'destructive',
  size?: 'default' | 'sm' | 'lg',
  className?: string,
  onClick: () => void,
  children: React.ReactNode
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md text-sm',
    lg: 'h-11 px-8 rounded-md',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Default empty data to prevent undefined errors
const defaultStats: Stat[] = [
  {
    label: "Total Listings",
    value: "0",
    change: "+0%",
    icon: Building2,
    color: "blue",
  },
  {
    label: "Pending Approvals",
    value: "0",
    change: "+0%",
    icon: Eye,
    color: "orange",
  },
  {
    label: "Total Users",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "green",
  },
  {
    label: "Active Listings",
    value: "0",
    change: "+0%",
    icon: TrendingUp,
    color: "purple",
  },
];

const defaultRecentListings: Listing[] = [];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showAddListing, setShowAddListing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<{
    stats: Stat[];
    recentListings: Listing[];
  }>({
    stats: defaultStats,
    recentListings: defaultRecentListings,
  });

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminApi.getDashboardStats();
      
      // Map the API response to the expected format
      const stats = data.stats.map((stat: { icon: string; [key: string]: any }) => {
        let Icon = Building2; // Default icon
        if (stat.icon === 'Eye') Icon = Eye;
        else if (stat.icon === 'Users') Icon = Users;
        else if (stat.icon === 'TrendingUp') Icon = TrendingUp;
        
        return {
          ...stat,
          icon: Icon,
        };
      });
      
      setDashboardData({
        stats,
        recentListings: data.recentListings || [],
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeItem === 'dashboard') {
      fetchDashboardData();
    }
  }, [activeItem]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

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
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2">Loading dashboard data...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <StatsGrid stats={dashboardData.stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                <RecentListings listings={dashboardData.recentListings} />
                <QuickActions 
                  onAddListing={() => setShowAddListing(true)}
                  onRefresh={handleRefresh}
                />
              </div>
            </>
          )}
        </div>
      ) : null}
        </div>
      </div>
    </div>
  );
}
