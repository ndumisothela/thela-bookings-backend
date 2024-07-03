import mongoose from "mongoose"; // Import the mongoose library to interact with MongoDB

// Define a schema for the Hotel model
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,     // The name of the hotel
    required: true,   // This field is required
  },
  type: {
    type: String,     // The type of the hotel (e.g., hotel, resort, etc.)
    required: true,   // This field is required
  },
  city: {
    type: String,     // The city where the hotel is located
    required: true,   // This field is required
  },
  address: {
    type: String,     // The address of the hotel
    required: true,   // This field is required
  },
  distance: {
    type: String,     // The distance from a specific point of interest (e.g., city center, airport)
    required: true,   // This field is required
  },
  photos: {
    type: [String],   // An array of strings representing URLs of photos of the hotel
  },
  title: {
    type: String,     // A short title or tagline for the hotel
    required: true,   // This field is required
  },
  description: {
    type: String,     // A detailed description of the hotel
    required: true,   // This field is required
  },
  rating: {
    type: Number,     // The rating of the hotel, usually from 0 to 5
    min: 0,           // Minimum value for the rating
    max: 5,           // Maximum value for the rating
  },
  rooms: {
    type: [String],   // An array of room IDs (references to Room documents)
  },
  cheapestPrice: {
    type: Number,     // The cheapest price available for a room at the hotel
    required: true,   // This field is required
  },
  featured: {
    type: Boolean,    // Whether the hotel is featured or not
    default: false,   // Default value is false
  },
});

// Export the Hotel model based on the defined schema
export default mongoose.model("Hotel", HotelSchema);
