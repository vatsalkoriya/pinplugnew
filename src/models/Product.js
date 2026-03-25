import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxlength: 200 },
        category: { type: String, required: true },
        modelNumber: { type: String, required: true, maxlength: 50 },
        price: { type: String, required: true, maxlength: 20 },
        image: { type: String, default: "" },
        images: [{ type: String }],
        specs: [{ type: String }],
        description: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
