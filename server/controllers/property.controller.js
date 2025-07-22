import Property from "../models/listing.model.js";

export const addProperty = async (req, res) => {
  try {
    // Strict validation for all required fields and types
    const {
      title,
      location,
      price,
      type,
      bedrooms,
      bathrooms,
      area,
      yearBuilt,
      lotSize,
      heating,
      cooling,
      description,
      images,
      amenities,
      agent,
      availability,
    } = req.body;

    // Validate required string fields
    const requiredStringFields = [
      { key: "title", value: title },
      { key: "location", value: location },
      { key: "price", value: price },
      { key: "type", value: type },
    ];
    for (const field of requiredStringFields) {
      if (!field.value || typeof field.value !== "string") {
        return res
          .status(400)
          .json({ error: `${field.key} is required and must be a string` });
      }
    }

    // Validate required number fields
    const numberFields = [
      { key: "bedrooms", value: bedrooms },
      { key: "bathrooms", value: bathrooms },
      { key: "area", value: area },
      { key: "yearBuilt", value: yearBuilt },
    ];
    for (const field of numberFields) {
      if (typeof field.value !== "number" || isNaN(field.value)) {
        return res
          .status(400)
          .json({ error: `${field.key} is required and must be a number` });
      }
    }

    // Validate arrays
    if (!Array.isArray(images)) {
      return res.status(400).json({ error: "images must be an array" });
    }
    if (!Array.isArray(amenities)) {
      return res.status(400).json({ error: "amenities must be an array" });
    }

    // Validate agent object
    if (
      !agent ||
      typeof agent !== "object" ||
      typeof agent.name !== "string" ||
      typeof agent.email !== "string" ||
      typeof agent.phone !== "string"
    ) {
      return res.status(400).json({
        error: "agent must be an object with name, email, and phone as strings",
      });
    }

    // Validate availability object
    if (
      !availability ||
      typeof availability !== "object" ||
      typeof availability.isAvailable !== "boolean" ||
      typeof availability.availableFrom !== "string" ||
      typeof availability.occupiedUntil !== "string" ||
      (availability.daysRemaining !== undefined &&
        typeof availability.daysRemaining !== "number")
    ) {
      return res
        .status(400)
        .json({ error: "availability must be an object with valid fields" });
    }

    // Generate a unique id (could use uuid or similar in production)
    const id = Date.now().toString();
    const propertyData = {
      id,
      title,
      location,
      price,
      type,
      bedrooms,
      bathrooms,
      area,
      yearBuilt,
      lotSize: lotSize || "",
      heating: heating || "",
      cooling: cooling || "",
      description: description || "",
      images,
      amenities,
      agent,
      availability,
    };

    const property = new Property(propertyData);
    await property.save();
    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
