import mongoose from "mongoose";

const ConfessionSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            required: true
        },
        confession: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.Confession || mongoose.model("Confession", ConfessionSchema);
