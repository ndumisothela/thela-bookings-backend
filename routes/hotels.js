import express from "express"; // Import the Express framework for building the API server

import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js"; // Import various controller functions from hotelController.js to handle hotel-related operations

import Hotel from "../models/Hotel.js"; // Import the Hotel model to interact with hotel data in the database

import { verifyAdmin } from "../utilities/verifyToken.js"; // Import a utility function to verify if the user is an admin

const router = express.Router(); // Create a new router instance using Express

// CREATE operation: POST /hotels/
router.post("/", verifyAdmin, createHotel); // Route for creating a new hotel, requires admin authentication

// UPDATE operation: PUT /hotels/:id
router.put("/:id", verifyAdmin, updateHotel); // Route for updating a specific hotel by ID, requires admin authentication

// DELETE operation: DELETE /hotels/:id
router.delete("/:id", verifyAdmin, deleteHotel); // Route for deleting a specific hotel by ID, requires admin authentication

// GET operation: GET /hotels/find/:id
router.get("/find/:id", getHotel); // Route for retrieving a specific hotel by ID

// GET ALL operation: GET /hotels/
router.get("/", getHotels); // Route for retrieving all hotels

// Custom GET operation: GET /hotels/countByCity
router.get("/countByCity", countByCity); // Route for counting hotels by city

// Custom GET operation: GET /hotels/countByType
router.get("/countByType", countByType); // Route for counting hotels by type

// Custom GET operation: GET /hotels/room/:id
router.get("/room/:id", getHotelRooms); // Route for retrieving rooms of a specific hotel by hotel ID

export default router; // Export the router instance to be used by the main application
