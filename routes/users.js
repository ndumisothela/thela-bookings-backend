import express from "express"; // Import the Express framework for building the API server

import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userController.js"; // Import various controller functions from userController.js to handle user-related operations

import { verifyAdmin, verifyToken, verifyUser } from "../utilities/verifyToken.js"; // Import utility functions to verify user roles and authentication tokens

const router = express.Router(); // Create a new router instance using Express

// UPDATE operation: PUT /users/:id
router.put("/:id", verifyUser, updateUser); // Route for updating a specific user by ID, requires user authentication

// DELETE operation: DELETE /users/:id
router.delete("/:id", verifyUser, deleteUser); // Route for deleting a specific user by ID, requires user authentication

// GET operation: GET /users/:id
router.get("/:id", verifyUser, getUser); // Route for retrieving a specific user by ID, requires user authentication

// GET ALL operation: GET /users/
router.get("/", verifyAdmin, getUsers); // Route for retrieving all users, requires admin authentication

export default router; // Export the router instance to be used by the main application
