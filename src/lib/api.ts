const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed: ${res.status}`);
    }
    return res.json();
}

// ─── Products ──────────────────────────────────────────────────────────────

export interface Product {
    _id: string;
    name: string;
    category: string;
    modelNumber: string;
    price: string;
    mrp?: string;
    discount?: string;
    image: string;
    images?: string[];
    specs: string[];
    description?: string;
}

export const productsApi = {
    getAll: (category?: string) => {
        const qs = category && category !== "all" ? `?category=${category}` : "";
        return request<Product[]>(`/products${qs}`);
    },
    getById: (id: string) => request<Product>(`/products/${id}`),
    create: (data: Omit<Product, "_id">) =>
        request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Omit<Product, "_id">>) =>
        request<Product>(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: string) =>
        request<{ success: boolean }>(`/products/${id}`, { method: "DELETE" }),
};

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error("Upload failed");
    }
    const data = await res.json();
    return data.url;
}

// ─── Contacts ──────────────────────────────────────────────────────────────

export interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: "new" | "contacted";
    quantity?: number;
}

export const contactsApi = {
    getAll: () => request<Contact[]>("/contacts"),
    create: (data: Omit<Contact, "_id" | "date" | "status">) =>
        request<Contact>("/contacts", { method: "POST", body: JSON.stringify(data) }),
    markContacted: (id: string) =>
        request<Contact>(`/contacts/${id}/contacted`, { method: "PATCH" }),
};
