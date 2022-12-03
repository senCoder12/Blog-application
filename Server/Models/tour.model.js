import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    creator: {
        type: String,
        required: true
    },
    imageFile: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);
const tourModel = mongoose.model("Tour", tourSchema);

export default tourModel;
