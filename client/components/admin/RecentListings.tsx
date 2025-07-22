"use client";

export interface Listing {
  id: string;
  title: string;
  type: string;
  price: string;
  status: string;
  agent: string;
}

import Link from "next/link";

export default function RecentListings({ listings }: { listings: Listing[] }) {
  return (
    <div className="card">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Listings</h3>
          <Link
            href="/admin/listings"
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            View all
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
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
  );
}
