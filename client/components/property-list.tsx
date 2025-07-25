"use client";
import { useProperty } from "../contexts/PropertyContext";
import PropertyCard from "./property-card";
import type { PropertyCardProps } from "./property-card";

export default function PropertyList() {
  const { properties, loading } = useProperty();

  if (loading) return <div>Loading...</div>;
  if (!properties || properties.length === 0)
    return <div>No properties found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2 gap-1 w-full">
      {properties.map((property: PropertyCardProps) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
