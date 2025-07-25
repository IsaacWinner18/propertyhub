"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  Settings,
  X,
  Plus,
} from "lucide-react";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "listings",
    label: "Listings",
    icon: Building2,
    href: "/admin/listings",
  },
  {
    id: "add-listing",
    label: "Add New Listing",
    icon: Plus,
    href: "/admin/listings/new",
  },
  // { id: "users", label: "Users", icon: Users, href: "/admin/users" },

  // {
  //   id: "settings",
  //   label: "Settings",
  //   icon: Settings,
  //   href: "/admin/settings",
  // },
];

export default function Sidebar({
  activeItem,
  setActiveItem,
  sidebarOpen,
  setSidebarOpen,
  onAddListing,
}: {
  activeItem: string;
  setActiveItem: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onAddListing?: () => void;
}) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="text-xl font-bold text-blue-600">
            PropertyHub Admin
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 h-screen">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            if (item.id === "add-listing" && onAddListing) {
              return (
                <button
                  key={item.id}
                  className={`flex items-center w-full px-6 py-3 text-sm font-medium text-left focus:outline-none focus:bg-blue-100 transition-colors duration-150 ${
                    activeItem === item.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveItem(item.id);
                    onAddListing();
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            }
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
            );
          })}
        </nav>
      </div>
    </>
  );
}
