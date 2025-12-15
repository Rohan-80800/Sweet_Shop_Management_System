import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      select: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    purchased_items: [
      {
        sweet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sweet",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        purchasedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
