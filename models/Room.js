import mongoose from "mongoose"; // Import the mongoose library to interact with MongoDB

// Define a schema for the Room model
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,     // The title or name of the room
      required: true,   // This field is required
    },
    price: {
      type: Number,     // The price of the room per night
      required: true,   // This field is required
    },
    maxPeople: {
      type: Number,     // The maximum number of people that can stay in the room
      required: true,   // This field is required
    },
    description: {
      type: String,     // A detailed description of the room
      required: true,   // This field is required
    },
    roomNumbers: [{ 
      number: Number,   // The room number
      unavailableDates: { 
        type: [Date]    // An array of dates when the room is unavailable
      }
    }],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Room model based on the defined schema
export default mongoose.model("Room", RoomSchema);
