import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    enrollmentNumber: {
      type: String,
      required: function () {
        return this.role === "participant";
      }, // Only required for students
    },

    role: {
      type: String,
      enum: ["participant", "organizer", "admin"],
      default: "participant",
    },

    phone: {
      type: String,
    },

    department: {
      type: String,
      required: function () {
        return this.role === "participant" || this.role === "organizer";
      },
    },

    // For participants
    registeredEvents: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        status: {
          type: String,
          enum: ["registered", "attended", "cancelled"],
          default: "registered",
        },
        certificateIssued: {
          type: Boolean,
          default: false,
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "not_required"],
          default: "pending",
        },
      },
    ],

    // For organizers
    managedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    // Notifications
    notifications: [
      {
        type: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Admin-only controls
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
