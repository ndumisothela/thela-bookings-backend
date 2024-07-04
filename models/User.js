import mongoose from "mongoose"; // Import the mongoose library to interact with MongoDB

// Define a schema for the User model
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,     // Field for the username
      required: true,   // This field is required
      unique: true,     // Username must be unique
    },
    email: {
      type: String,     // Field for the email address
      required: true,   // This field is required
      unique: true,     // Email address must be unique
    },
    country: {
      type: String,     // Field for the user's country
      required: true,   // This field is required
    },
    img: {
      type: String,     // Field for the user's profile image URL
    },
    city: {
      type: String,     // Field for the user's city
      required: true,   // This field is required
    },
    phone: {
      type: String,     // Field for the user's phone number
      required: true,   // This field is required
    },
    password: {
      type: String,     // Field for the user's password
      required: true,   // This field is required
    },
    isAdmin: {
      type: Boolean,    // Indicates if the user is an administrator
      default: false,   // Default value is false
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the User model based on the defined schema
export default mongoose.model("User", UserSchema);
