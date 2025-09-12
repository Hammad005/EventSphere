import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: [
                "Cultural",
                "Technical",
                "Sports",
                "Workshop",
                "Seminar",
                "Other",
            ],
            default: "Other",
        },

        department: {
            type: String,
            required: true,
        },

        venue: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        registrationDeadline: {
            type: Date,
            required: true,
        },

        fee: {
            type: Number,
            default: 0, // free by default
        },

        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        participants: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                paymentStatus: {
                    type: String,
                    enum: ["pending", "paid", "not_required"],
                    default: "pending",
                },
                attended: {
                    type: Boolean,
                    default: false, // updated after QR scan
                },
                certificateIssued: {
                    type: Boolean,
                    default: false,
                },
                registeredAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        medias: [{
            mediaId: {
                type: String,
            },
            mediaUrl: {
                type: String,

            }
        }],

        feedback: [
            {
                name: String,
                message: String,
                rating: { type: Number, min: 1, max: 5 },
                createdAt: { type: Date, default: Date.now },
            },
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Admin who approved it
        },

        approved: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event
