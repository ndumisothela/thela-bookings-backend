import cors from "cors"; // Import CORS middleware for enabling Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Import dotenv for loading environment variables from a .env file
import express from "express"; // Import the Express framework for building the API server
import mongoose from "mongoose"; // Import mongoose for MongoDB database interaction
import authRoute from "./routes/auth.js"; // Import routes for authentication operations
import usersRoute from "./routes/users.js"; // Import routes for user operations
import hotelsRoute from "./routes/hotels.js"; // Import routes for hotel operations
import roomsRoute from "./routes/rooms.js"; // Import routes for room operations
import cookieParser from "cookie-parser"; // Import cookie-parser middleware for parsing cookies

const app = express(); // Create a new instance of Express application
dotenv.config(); // Load environment variables from .env file into process.env

// Function to connect to MongoDB database
const connect = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO); // Connect to MongoDB using the connection string from environment variables
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error; // Throw error if connection fails
  }
};

// Event listeners for MongoDB connection status
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!"); // Log message when MongoDB connection is disconnected
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!"); // Log message when MongoDB connection is established
});

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser()); // Use cookie-parser middleware for parsing cookies
app.use(express.json()); // Parse incoming JSON requests

// Routes setup
app.use("/api/auth", authRoute); // Use authRoute for handling routes related to authentication
app.use("/api/users", usersRoute); // Use usersRoute for handling routes related to users
app.use("/api/hotels", hotelsRoute); // Use hotelsRoute for handling routes related to hotels
app.use("/api/rooms", roomsRoute); // Use roomsRoute for handling routes related to rooms

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500; // Default to status 500 (Internal Server Error) if no status is provided
  const errorMessage = err.message || "Something went wrong!"; // Default error message
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack, // Include error stack trace for debugging
  });
});

// Start the server
app.listen(8800, () => {
  connect(); // Connect to MongoDB when the server starts
  console.log("Connected to backend. Server is running on port 8800.");
});
