import { Snowflake, Refrigerator, WashingMachine, Tv, Flame, Droplets, Package } from "lucide-react";
import type { ComponentType } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  modelNumber: string;
  price: string;
  image: string;
  specs: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "new" | "contacted";
}

export const categories: Category[] = [
  { id: "ac", name: "Air Conditioners", icon: Snowflake, description: "Split, window & inverter ACs" },
  { id: "refrigerator", name: "Refrigerators", icon: Refrigerator, description: "Single & double door models" },
  { id: "washing-machine", name: "Washing Machines", icon: WashingMachine, description: "Front & top load washers" },
  { id: "led-tv", name: "LED TVs", icon: Tv, description: "Smart & Ultra HD displays" },
  { id: "geyser", name: "Geysers", icon: Flame, description: "Instant & storage water heaters" },
  { id: "ro", name: "RO Systems", icon: Droplets, description: "Water purification systems" },
  { id: "all", name: "All Products", icon: Package, description: "Browse entire catalog" },
];

export const products: Product[] = [
  { id: "1", name: "InverterPro 1.5T Split AC", category: "ac", modelNumber: "PP-AC-1501", price: "₹34,990", image: "", specs: ["1.5 Ton", "5 Star", "Inverter", "Copper Condenser"] },
  { id: "2", name: "CoolBreeze Window AC", category: "ac", modelNumber: "PP-AC-0802", price: "₹22,490", image: "", specs: ["1 Ton", "3 Star", "Non-Inverter", "Auto Swing"] },
  { id: "3", name: "FrostFree 265L Refrigerator", category: "refrigerator", modelNumber: "PP-RF-2651", price: "₹28,990", image: "", specs: ["265L", "Double Door", "Frost Free", "Inverter Compressor"] },
  { id: "4", name: "MiniCool 190L Refrigerator", category: "refrigerator", modelNumber: "PP-RF-1901", price: "₹14,990", image: "", specs: ["190L", "Single Door", "Direct Cool", "Stabilizer Free"] },
  { id: "5", name: "TurboWash 7kg Front Load", category: "washing-machine", modelNumber: "PP-WM-7001", price: "₹32,990", image: "", specs: ["7 kg", "Front Load", "1200 RPM", "Steam Wash"] },
  { id: "6", name: "EasyWash 8kg Top Load", category: "washing-machine", modelNumber: "PP-WM-8002", price: "₹18,490", image: "", specs: ["8 kg", "Top Load", "720 RPM", "Auto Balance"] },
  { id: "7", name: "UltraView 55\" 4K Smart TV", category: "led-tv", modelNumber: "PP-TV-5501", price: "₹42,990", image: "", specs: ["55 inch", "4K UHD", "Smart TV", "HDR10+"] },
  { id: "8", name: "ClearView 32\" HD Smart TV", category: "led-tv", modelNumber: "PP-TV-3201", price: "₹14,990", image: "", specs: ["32 inch", "HD Ready", "Smart TV", "Built-in WiFi"] },
  { id: "9", name: "HeatMax 15L Storage Geyser", category: "geyser", modelNumber: "PP-GY-1501", price: "₹8,990", image: "", specs: ["15L", "Storage", "5 Star", "Glass Lined Tank"] },
  { id: "10", name: "InstantHeat 3L Geyser", category: "geyser", modelNumber: "PP-GY-0301", price: "₹4,490", image: "", specs: ["3L", "Instant", "Copper Element", "Auto Cut-off"] },
  { id: "11", name: "PureFlow 7-Stage RO", category: "ro", modelNumber: "PP-RO-7001", price: "₹12,990", image: "", specs: ["7 Stage", "RO+UV+UF", "12L Tank", "TDS Controller"] },
  { id: "12", name: "AquaPure 5-Stage RO", category: "ro", modelNumber: "PP-RO-5001", price: "₹7,990", image: "", specs: ["5 Stage", "RO+UV", "8L Tank", "Auto Flush"] },
];

export const sampleContacts: ContactMessage[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", subject: "AC Installation Inquiry", message: "I need a 1.5 ton split AC installed in my bedroom. Please share the best options and installation charges.", date: "2026-03-15", status: "new" },
  { id: "2", name: "Priya Patel", email: "priya@email.com", phone: "+91 87654 32109", subject: "RO Service Request", message: "My RO system needs filter replacement and annual maintenance.", date: "2026-03-14", status: "contacted" },
  { id: "3", name: "Amit Kumar", email: "amit@email.com", phone: "+91 76543 21098", subject: "Smart Home Setup", message: "Interested in smart home integration for my new apartment. Need consultation.", date: "2026-03-13", status: "new" },
];
