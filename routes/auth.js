import express from "express"; // Import the Express framework for building the API server

import { login, register } from "../controllers/authController.js"; // Import the login and register functions from the authController module

const router = express.Router(); // Create a new router instance using Express

router.post("/register", register); // Define a POST route for registering a new user, handled by the register function in authController

router.post("/login", login); // Define a POST route for user login, handled by the login function in authController

export default router; // Export the router instance to be used by the main application
