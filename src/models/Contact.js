import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
        email: { type: String, required: true, maxlength: 255 },
        phone: { type: String, default: "", maxlength: 20 },
        subject: { type: String, default: "", maxlength: 200 },
        message: { type: String, required: true, maxlength: 1000 },
        date: { type: String, default: () => new Date().toISOString().split("T")[0] },
        status: { type: String, enum: ["new", "contacted"], default: "new" },
        quantity: { type: Number, default: 1 },
    },
    { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
