import Property from "../models/listing.model.js";
import User, { USER_ROLES } from "../models/user.model.js";

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

export const getDashboardStats = async (req, res) => {
  try {
    // Property statistics
    const totalListings = await Property.countDocuments();
    const pendingApprovals = await Property.countDocuments({ status: 'pending' });
    const activeListings = await Property.countDocuments({ 'availability.isAvailable': true });
    
    // User statistics
    const totalUsers = await User.countDocuments();
    const totalAgents = await User.countDocuments({ role: USER_ROLES.AGENT });
    const totalAdmins = await User.countDocuments({ 
      role: { $in: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN] } 
    });
    
    // Get recent 5 listings
    const recentListings = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type price status agent availability');

    res.status(200).json({
      stats: [
        {
          label: 'Total Users',
          value: totalUsers.toString(),
          change: '+0%',
          icon: 'Users',
          color: 'green'
        },
        
        {
          label: 'Total Listings',
          value: totalListings.toString(),
          change: '+0%',
          icon: 'Building2',
          color: 'blue'
        },
        {
          label: 'Pending Approvals',
          value: pendingApprovals.toString(),
          change: '+0%',
          icon: 'Eye',
          color: 'orange'
        },
        {
          label: 'Active Listings',
          value: activeListings.toString(),
          change: '+0%',
          icon: 'TrendingUp',
          color: 'green'
        },
      ],
      recentListings: recentListings.map(listing => ({
        id: listing._id,
        title: listing.title,
        type: listing.type,
        price: `${listing.price}`,
        status: listing.availability?.isAvailable ? 'Active' : 'Inactive',
        agent: listing.agent?.name || 'N/A'
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
