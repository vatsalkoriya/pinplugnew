import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxlength: 200 },
        category: { type: String, required: true },
        modelNumber: { type: String, required: true, maxlength: 50 },
        price: { type: String, required: true, maxlength: 20 },
        mrp: { type: String, default: "" },
        discount: { type: String, default: "" },
        image: { type: String, default: "" },
        images: [{ type: String }],
        specs: [{ type: String }],
        description: { type: String, default: "" },
    },
    { timestamps: true, strict: false } // Set strict to false to catch newly added fields more reliably
);

// We delete the model if it exists to ensure schema updates take effect immediately in development
if (mongoose.models.Product) {
    delete mongoose.models.Product;
}

export default mongoose.model("Product", productSchema);
