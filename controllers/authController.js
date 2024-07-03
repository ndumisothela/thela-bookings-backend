import User from "../models/User.js"; // Import the User model
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import { createError } from "../utilities/error.js"; // Import a utility function for creating errors
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWT tokens


// Register function to handle user registration
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10); // Generate a salt with 10 rounds
    const hash = bcrypt.hashSync(req.body.password, salt); // Hash the user's password with the generated salt

    // Create a new user instance with the hashed password and other details from the request body
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(200).send("User has been created."); // Send a success response
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};

// Login function to handle user authentication
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // Find the user by username from the request body
    if (!user) return next(createError(404, "User not found!")); // If user is not found, create a 404 error and pass it to the error handling middleware

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // If the password is incorrect, create a 400 error and pass it to the error handling middleware
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // Create a JWT token with the user's ID and isAdmin status.
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // Destructure the user object to exclude the password and isAdmin from the response
    const { password, isAdmin, ...otherDetails } = user._doc;

    // Set a cookie with the JWT token, set httpOnly for security, and send the user details in the response.
    res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};


