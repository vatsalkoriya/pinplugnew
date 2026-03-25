import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";

import Product from "./src/models/Product.js";
import Contact from "./src/models/Contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌  MONGO_URI is not set in .env");
    process.exit(1);
}

// ─── Middleware ──────────────────────────────────────────────────────────────

app.use(cors({
    origin: [
        "http://localhost:5173",  // vite dev
        "http://localhost:8080",  // vite dev (alternate)
        "http://localhost:4173",  // vite preview
        process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
}));

app.use(express.json());

// ─── Multer Config ───────────────────────────────────────────────────────────

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"));
        }
    },
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve built frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist")));
}

// ─── Health ──────────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// ─── Products ────────────────────────────────────────────────────────────────

// GET /api/products          → all products (optionally filter by ?category=)
app.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category && category !== "all" ? { category } : {};
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// GET /api/products/:id      → get single product
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

// POST /api/products          → add product
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// DELETE /api/products/:id    → delete product
app.delete("/api/products/:id", async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Product not found" });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// PUT /api/products/:id       → update product
app.put("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// POST /api/upload            → upload image
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
});

// ─── Contacts ────────────────────────────────────────────────────────────────

// GET /api/contacts           → all contact inquiries
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
});

// POST /api/contacts          → submit contact form
app.post("/api/contacts", async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// PATCH /api/contacts/:id/contacted  → mark as contacted
app.patch("/api/contacts/:id/contacted", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: "contacted" },
            { new: true }
        );
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.json(contact);
    } catch (e) {
        res.status(500).json({ error: "Failed to update contact" });
    }
});

// ─── SPA fallback (production only) ─────────────────────────────────────────

if (process.env.NODE_ENV === "production") {
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
}

// ─── Connect & Start ─────────────────────────────────────────────────────────

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅  MongoDB connected");
        app.listen(PORT, () =>
            console.log(`🚀  Server → http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("❌  MongoDB connection failed:", err.message);
        process.exit(1);
    });
