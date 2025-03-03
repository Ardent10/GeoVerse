import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  name: String,
  clues: [String],
  funFact: String,
});

export default mongoose.model("Destination", DestinationSchema);
