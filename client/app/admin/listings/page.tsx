"use client";

import { useEffect, useState } from "react";
import RecentListings, {
  Listing,
} from "../../../components/admin/RecentListings";

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiPrefix = process.env.NEXT_PUBLIC_API_URI || "";
        const res = await fetch(`${apiPrefix}/api/properties`);
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        // Map API data to Listing interface
        const mapped: Listing[] = data.map((property: any) => {
          let status = "Active";
          if (property.availability) {
            if (property.availability.isAvailable === false) {
              // If not available, check if availableFrom is in the future
              const now = new Date();
              const availableFrom = property.availability.availableFrom
                ? new Date(property.availability.availableFrom)
                : null;
              if (availableFrom && availableFrom > now) {
                status = "Pending";
              } else {
                status = "Rejected";
              }
            }
          }
          return {
            id: property.id,
            title: property.title,
            type: property.type,
            price: property.price,
            status,
            agent: property.agent?.name || "Unknown",
          };
        });
        setListings(mapped);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Listings</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && <RecentListings listings={listings} />}
    </div>
  );
}
