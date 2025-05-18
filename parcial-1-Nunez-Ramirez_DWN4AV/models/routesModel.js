import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true }, // ID del usuario que sugiere la ruta
  createdAt: { type: Date, default: Date.now },
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

export default mongoose.model("routes", routeSchema);
