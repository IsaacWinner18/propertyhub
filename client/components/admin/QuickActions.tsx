"use client";

import Link from "next/link";
import { Building2, Users, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function QuickActions({
  onAddListing,
}: {
  onAddListing: () => void;
}) {
  return (
    <div className="card">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <button
            className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            onClick={onAddListing}
          >
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Add New Listing</h4>
                <p className="text-sm text-gray-600">
                  Create a new property listing
                </p>
              </div>
            </div>
          </button>

          <Link
            href="/admin/users"
            className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Manage Users</h4>
                <p className="text-sm text-gray-600">
                  View and manage user accounts
                </p>
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
                <p className="text-sm text-gray-600">
                  Check performance metrics
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
