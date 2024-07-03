import Hotel from "../models/Hotel.js"; // Import the Hotel model to interact with the hotels collection in the database
import Room from "../models/Room.js";   // Import the Room model to interact with the rooms collection in the database

// Create a new hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body); // Create a new instance of the Hotel model with the request body data

  try {
    const savedHotel = await newHotel.save(); // Save the new hotel instance to the database
    res.status(200).json(savedHotel);         // Send a success response with the saved hotel data
  } catch (err) {
    next(err);                                // Pass any errors to the error handling middleware
  }
};

// Update an existing hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,       // Find the hotel by ID from the request parameters
      { $set: req.body },  // Set the fields to be updated with the request body data
      { new: true }        // Return the updated document
    );
    res.status(200).json(updatedHotel);       // Send a success response with the updated hotel data
  } catch (err) {
    next(err);                                // Pass any errors to the error handling middleware
  }
};

// Delete an existing hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id); // Find the hotel by ID and delete it
    res.status(200).json("Hotel has been deleted."); // Send a success response with a confirmation message
  } catch (err) {
    next(err);                                     // Pass any errors to the error handling middleware
  }
};

// Get a specific hotel by ID
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Find the hotel by ID from the request parameters
    res.status(200).json(hotel);                       // Send a success response with the hotel data
  } catch (err) {
    next(err);                                         // Pass any errors to the error handling middleware
  }
};

// Get all hotels with optional filtering
export const getHotels = async (req, res, next) => {
  const { min, max, limit, featured, ...others } = req.query; // Destructure the query parameters
  try {
    const query = {
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 }, // Set the price range for filtering
    };
    
    if (featured) {
      query.featured = featured === 'true'; // Add featured filter if provided
    }

    const hotels = await Hotel.find(query).limit(Number(limit) || 4); // Find hotels matching the query and limit the results

    res.status(200).json(hotels); // Send a success response with the list of hotels
  } catch (err) {
    next(err);                    // Pass any errors to the error handling middleware
  }
};

// Get the count of hotels by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); // Split the cities query parameter into an array
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city }); // Count the number of hotels in each city
      })
    );
    res.status(200).json(list); // Send a success response with the counts
  } catch (err) {
    next(err);                  // Pass any errors to the error handling middleware
  }
};

// Get the count of hotels by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });        // Count hotels of type "hotel"
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" }); // Count hotels of type "apartment"
    const resortCount = await Hotel.countDocuments({ type: "resort" });       // Count hotels of type "resort"
    const villaCount = await Hotel.countDocuments({ type: "villa" });         // Count hotels of type "villa"
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });         // Count hotels of type "cabin"

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]); // Send a success response with the counts by type
  } catch (err) {
    next(err);               // Pass any errors to the error handling middleware
  }
};

// Get all rooms for a specific hotel
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Find the hotel by ID from the request parameters
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room); // Find each room by its ID
      })
    );
    res.status(200).json(list);   // Send a success response with the list of rooms
  } catch (err) {
    next(err);                    // Pass any errors to the error handling middleware
  }
};
