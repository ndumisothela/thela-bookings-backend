import User from "../models/User.js"; // Import the User model to interact with the users collection in the database

// Update an existing user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,       // Find the user by ID from the request parameters
      { $set: req.body },  // Set the fields to be updated with the request body data
      { new: true }        // Return the updated document
    );
    res.status(200).json(updatedUser); // Send a success response with the updated user data
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
}

// Delete an existing user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id); // Find the user by ID from the request parameters and delete it
    res.status(200).json("User has been deleted."); // Send a success response with a confirmation message
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
}

// Get a specific user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by ID from the request parameters
    res.status(200).json(user); // Send a success response with the user data
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
}

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.status(200).json(users); // Send a success response with the list of users
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
}
