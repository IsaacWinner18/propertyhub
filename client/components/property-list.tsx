"use client";
import { useProperty } from "../contexts/PropertyContext";
import PropertyCard from "./property-card";
import type { PropertyCardProps } from "./property-card";

export default function PropertyList() {
  const { properties, loading } = useProperty();
  console.log(properties);

  if (loading) return <div>Loading...</div>;
  if (!properties || properties.length === 0)
    return <div>No properties found.</div>;

  return (
    <div>
      {properties.map((property: PropertyCardProps) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
