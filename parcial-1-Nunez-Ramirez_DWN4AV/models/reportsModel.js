
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: { type: [String], required: true },
  locationPoint: {
    type: [
      {
        lat: { type: Number },
        lng: { type: Number }
      }
    ],
    default: []
  }
});

export default mongoose.model("reports", reportSchema);
