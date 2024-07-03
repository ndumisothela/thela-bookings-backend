import express from "express"; // Import the Express framework for building the API server

import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js"; // Import various controller functions from roomController.js to handle room-related operations

import { verifyAdmin } from "../utilities/verifyToken.js"; // Import a utility function to verify if the user is an admin

const router = express.Router(); // Create a new router instance using Express

// CREATE operation: POST /rooms/:hotelid
router.post("/:hotelid", verifyAdmin, createRoom); // Route for creating a new room for a specific hotel, requires admin authentication

// UPDATE operation: PUT /rooms/availability/:id
router.put("/availability/:id", updateRoomAvailability); // Route for updating room availability by room ID

// UPDATE operation: PUT /rooms/:id
router.put("/:id", verifyAdmin, updateRoom); // Route for updating a specific room by ID, requires admin authentication

// DELETE operation: DELETE /rooms/:id/:hotelid
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom); // Route for deleting a specific room by ID and hotel ID, requires admin authentication

// GET operation: GET /rooms/:id
router.get("/:id", getRoom); // Route for retrieving a specific room by ID

// GET ALL operation: GET /rooms/
router.get("/", getRooms); // Route for retrieving all rooms

export default router; // Export the router instance to be used by the main application
