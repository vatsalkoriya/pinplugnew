import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import Contact from "./models/Contact.js";

const products = [
    { name: "InverterPro 1.5T Split AC", category: "ac", modelNumber: "PP-AC-1501", price: "₹34,990", image: "", specs: ["1.5 Ton", "5 Star", "Inverter", "Copper Condenser"] },
    { name: "CoolBreeze Window AC", category: "ac", modelNumber: "PP-AC-0802", price: "₹22,490", image: "", specs: ["1 Ton", "3 Star", "Non-Inverter", "Auto Swing"] },
    { name: "FrostFree 265L Refrigerator", category: "refrigerator", modelNumber: "PP-RF-2651", price: "₹28,990", image: "", specs: ["265L", "Double Door", "Frost Free", "Inverter Compressor"] },
    { name: "MiniCool 190L Refrigerator", category: "refrigerator", modelNumber: "PP-RF-1901", price: "₹14,990", image: "", specs: ["190L", "Single Door", "Direct Cool", "Stabilizer Free"] },
    { name: "TurboWash 7kg Front Load", category: "washing-machine", modelNumber: "PP-WM-7001", price: "₹32,990", image: "", specs: ["7 kg", "Front Load", "1200 RPM", "Steam Wash"] },
    { name: "EasyWash 8kg Top Load", category: "washing-machine", modelNumber: "PP-WM-8002", price: "₹18,490", image: "", specs: ["8 kg", "Top Load", "720 RPM", "Auto Balance"] },
    { name: "UltraView 55\" 4K Smart TV", category: "led-tv", modelNumber: "PP-TV-5501", price: "₹42,990", image: "", specs: ["55 inch", "4K UHD", "Smart TV", "HDR10+"] },
    { name: "ClearView 32\" HD Smart TV", category: "led-tv", modelNumber: "PP-TV-3201", price: "₹14,990", image: "", specs: ["32 inch", "HD Ready", "Smart TV", "Built-in WiFi"] },
    { name: "HeatMax 15L Storage Geyser", category: "geyser", modelNumber: "PP-GY-1501", price: "₹8,990", image: "", specs: ["15L", "Storage", "5 Star", "Glass Lined Tank"] },
    { name: "InstantHeat 3L Geyser", category: "geyser", modelNumber: "PP-GY-0301", price: "₹4,490", image: "", specs: ["3L", "Instant", "Copper Element", "Auto Cut-off"] },
    { name: "PureFlow 7-Stage RO", category: "ro", modelNumber: "PP-RO-7001", price: "₹12,990", image: "", specs: ["7 Stage", "RO+UV+UF", "12L Tank", "TDS Controller"] },
    { name: "AquaPure 5-Stage RO", category: "ro", modelNumber: "PP-RO-5001", price: "₹7,990", image: "", specs: ["5 Stage", "RO+UV", "8L Tank", "Auto Flush"] },
];

const contacts = [
    { name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", subject: "AC Installation Inquiry", message: "I need a 1.5 ton split AC installed in my bedroom. Please share the best options and installation charges.", date: "2026-03-15", status: "new" },
    { name: "Priya Patel", email: "priya@email.com", phone: "+91 87654 32109", subject: "RO Service Request", message: "My RO system needs filter replacement and annual maintenance.", date: "2026-03-14", status: "contacted" },
    { name: "Amit Kumar", email: "amit@email.com", phone: "+91 76543 21098", subject: "Smart Home Setup", message: "Interested in smart home integration for my new apartment. Need consultation.", date: "2026-03-13", status: "new" },
];

async function seed() {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            console.error("❌ MONGO_URI not found in .env");
            return;
        }

        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        await Product.deleteMany({});
        await Contact.deleteMany({});
        console.log("🧹 Cleared existing collections");

        // Insert new data
        await Product.insertMany(products);
        await Contact.insertMany(contacts);
        console.log("🌱 Database seeded successfully!");

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
}

seed();
