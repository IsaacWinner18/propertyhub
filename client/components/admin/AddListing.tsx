import React, { useState } from "react";

interface Agent {
  name: string;
  email: string;
  phone: string;
}

interface Availability {
  isAvailable: boolean;
  availableFrom: string;
  occupiedUntil: string;
  daysRemaining: string; // changed to string
}

export interface ListingForm {
  title: string;
  location: string;
  price: string;
  type: "rent";
  bedrooms: string; // changed to string
  bathrooms: string; // changed to string
  area: string; // changed to string
  yearBuilt: string; // changed to string
  lotSize: string;
  heating: string;
  cooling: string;
  description: string;
  images: string[];
  amenities: string[];
  agent: Agent;
  availability: Availability;
}

interface AddListingProps {
  onCancel?: () => void;
}

const initialState: ListingForm = {
  title: "",
  location: "",
  price: "",
  type: "rent",
  bedrooms: "",
  bathrooms: "",
  area: "",
  yearBuilt: "",
  lotSize: "",
  heating: "",
  cooling: "",
  description: "",
  images: [""],
  amenities: [""],
  agent: { name: "", email: "", phone: "" },
  availability: {
    isAvailable: true,
    availableFrom: "",
    occupiedUntil: "",
    daysRemaining: "",
  },
};

const AddListing: React.FC<AddListingProps> = ({ onCancel }) => {
  const [form, setForm] = useState<ListingForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("agent.")) {
      setForm((prev) => ({
        ...prev,
        agent: { ...prev.agent, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("availability.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [key]:
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (
    field: "images" | "amenities",
    idx: number,
    value: string
  ) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleAddArrayItem = (field: "images" | "amenities") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveArrayItem = (
    field: "images" | "amenities",
    idx: number
  ) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Convert number fields to numbers before submit if needed
    const preparedForm = {
      ...form,
      bedrooms: form.bedrooms === "" ? undefined : Number(form.bedrooms),
      bathrooms: form.bathrooms === "" ? undefined : Number(form.bathrooms),
      area: form.area === "" ? undefined : Number(form.area),
      yearBuilt: form.yearBuilt === "" ? undefined : Number(form.yearBuilt),
      availability: {
        ...form.availability,
        daysRemaining:
          form.availability.daysRemaining === ""
            ? undefined
            : Number(form.availability.daysRemaining),
      },
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/api/add/properties`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedForm),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add property");
      } else {
        setSuccess("Property added successfully!");
        setForm(initialState); // Optionally reset form
      }
    } catch (err: any) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {loading && <div className="text-blue-600 mb-2">Submitting...</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-semibold mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-semibold mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block font-semibold mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="rent">Rent</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block font-semibold mb-1">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="block font-semibold mb-1">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="area" className="block font-semibold mb-1">
              Area (sqft)
            </label>
            <input
              id="area"
              name="area"
              type="number"
              value={form.area}
              onChange={handleChange}
              placeholder="Area (sqft)"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="yearBuilt" className="block font-semibold mb-1">
              Year Built
            </label>
            <input
              id="yearBuilt"
              name="yearBuilt"
              type="number"
              value={form.yearBuilt}
              onChange={handleChange}
              placeholder="Year Built"
              className="input-field"
              required
            />
          </div>
          <div>
            <label htmlFor="lotSize" className="block font-semibold mb-1">
              Lot Size
            </label>
            <input
              id="lotSize"
              name="lotSize"
              value={form.lotSize}
              onChange={handleChange}
              placeholder="Lot Size"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="heating" className="block font-semibold mb-1">
              Heating
            </label>
            <input
              id="heating"
              name="heating"
              value={form.heating}
              onChange={handleChange}
              placeholder="Heating"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="cooling" className="block font-semibold mb-1">
              Cooling
            </label>
            <input
              id="cooling"
              name="cooling"
              value={form.cooling}
              onChange={handleChange}
              placeholder="Cooling"
              className="input-field"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="input-field w-full"
          />
        </div>
        {/* Images */}
        <div>
          <label className="font-semibold">Images</label>
          {form.images.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <label htmlFor={`image-${idx}`} className="sr-only">
                Image URL #{idx + 1}
              </label>
              <input
                id={`image-${idx}`}
                type="text"
                value={img}
                onChange={(e) =>
                  handleArrayChange("images", idx, e.target.value)
                }
                placeholder={`Image URL #${idx + 1}`}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("images", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddArrayItem("images")}>
            Add Image
          </button>
        </div>
        {/* Amenities */}
        <div>
          <label className="font-semibold">Amenities</label>
          {form.amenities.map((am, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <label htmlFor={`amenity-${idx}`} className="sr-only">
                Amenity #{idx + 1}
              </label>
              <input
                id={`amenity-${idx}`}
                type="text"
                value={am}
                onChange={(e) =>
                  handleArrayChange("amenities", idx, e.target.value)
                }
                placeholder={`Amenity #${idx + 1}`}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("amenities", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddArrayItem("amenities")}>
            Add Amenity
          </button>
        </div>
        {/* Agent */}
        <div className="border p-2 rounded">
          <label className="font-semibold">Agent Info</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <label htmlFor="agent-name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                id="agent-name"
                name="agent.name"
                value={form.agent.name}
                onChange={handleChange}
                placeholder="Name"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="agent-email" className="block font-semibold mb-1">
                Email
              </label>
              <input
                id="agent-email"
                name="agent.email"
                value={form.agent.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="agent-phone" className="block font-semibold mb-1">
                Phone
              </label>
              <input
                id="agent-phone"
                name="agent.phone"
                value={form.agent.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="input-field"
              />
            </div>
          </div>
        </div>
        {/* Availability */}
        <div className="border p-2 rounded">
          <label className="font-semibold">Availability</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="availability-isAvailable"
                name="availability.isAvailable"
                checked={form.availability.isAvailable}
                onChange={handleChange}
              />
              Available
            </label>
            <div>
              <label
                htmlFor="availability-availableFrom"
                className="block font-semibold mb-1"
              >
                Available From
              </label>
              <input
                id="availability-availableFrom"
                name="availability.availableFrom"
                value={form.availability.availableFrom}
                onChange={handleChange}
                placeholder="Available From"
                className="input-field"
                type="date"
              />
            </div>
            <div>
              <label
                htmlFor="availability-occupiedUntil"
                className="block font-semibold mb-1"
              >
                Occupied Until
              </label>
              <input
                id="availability-occupiedUntil"
                name="availability.occupiedUntil"
                value={form.availability.occupiedUntil}
                onChange={handleChange}
                placeholder="Occupied Until"
                className="input-field"
                type="date"
              />
            </div>
            <div>
              <label
                htmlFor="availability-daysRemaining"
                className="block font-semibold mb-1"
              >
                Days Remaining
              </label>
              <input
                id="availability-daysRemaining"
                name="availability.daysRemaining"
                type="number"
                value={form.availability.daysRemaining}
                onChange={handleChange}
                placeholder="Days Remaining"
                className="input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel || (() => {})}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
