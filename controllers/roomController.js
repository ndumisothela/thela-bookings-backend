import Room from "../models/Room.js"; // Import the Room model to interact with the rooms collection in the database
import Hotel from "../models/Hotel.js"; // Import the Hotel model to interact with the hotels collection in the database
import { createError } from "../utilities/error.js"; // Import a utility function to create custom error objects

// Create a new room and add it to a hotel
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // Extract the hotel ID from the request parameters
  const newRoom = new Room(req.body); // Create a new instance of the Room model with the request body data

  try {
    const savedRoom = await newRoom.save(); // Save the new room instance to the database
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }, // Add the new room's ID to the hotel's rooms array
      });
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
    res.status(200).json(savedRoom); // Send a success response with the saved room data
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Update an existing room
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,       // Find the room by ID from the request parameters
      { $set: req.body },  // Set the fields to be updated with the request body data
      { new: true }        // Return the updated document
    );
    res.status(200).json(updatedRoom); // Send a success response with the updated room data
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Update room availability by adding unavailable dates
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id }, // Find the room by its room number ID
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates, // Add the new unavailable dates to the room's unavailable dates array
        },
      }
    );
    res.status(200).json("Room status has been updated."); // Send a success response with a confirmation message
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Delete an existing room and remove it from the hotel's rooms array
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // Extract the hotel ID from the request parameters
  try {
    await Room.findByIdAndDelete(req.params.id); // Find the room by ID and delete it
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, // Remove the room's ID from the hotel's rooms array
      });
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
    res.status(200).json("Room has been deleted."); // Send a success response with a confirmation message
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Get a specific room by ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id); // Find the room by ID from the request parameters
    res.status(200).json(room); // Send a success response with the room data
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Get all rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(); // Find all rooms in the database
    res.status(200).json(rooms); // Send a success response with the list of rooms
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};
