import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
})

const availabilitySchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
    },
    availableFrom: {
        type: String,
    },
    occupiedUntil: {
        type: String,
    },
    daysRemaining: {
        type: Number,
    },

})

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, enum: ["rent"], required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  yearBuilt: { type: Number, required: true },
  lotSize: { type: String },
  heating: { type: String },
  cooling: { type: String },
  description: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  agent: agentSchema,
  availability: availabilitySchema,
});

const Property = mongoose.model("Property", propertySchema)

export default Property;