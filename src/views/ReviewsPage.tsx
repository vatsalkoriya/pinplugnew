"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "pinplug_reviews";

function loadReviews(): Review[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ELFSIGHT_APP_ID;
    if (!appId) return;
    const existing = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (existing) return;
    const load = () => {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    };
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
    } else {
      setTimeout(load, 800);
    }
  }, []);

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newReview: Review = {
      id: `${Date.now()}`,
      name: name.trim(),
      rating,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    setName("");
    setRating(5);
    setMessage("");
  };

  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Reviews</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Customer Reviews</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Share your experience with Pinplug and read what others are saying.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-10">
          <div className="rounded-2xl bg-card shadow-card outline-subtle p-6">
            <h2 className="text-lg font-semibold text-foreground">Add Your Review</h2>
            <p className="text-sm text-muted-foreground mt-1">Your feedback helps us improve.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-foreground">Rating</span>
                <select
                  value={rating}
                  onChange={event => setRating(Number(event.target.value))}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {[5, 4, 3, 2, 1].map(val => (
                    <option key={val} value={val}>
                      {val} Star{val > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-foreground">Review</span>
                <textarea
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition"
              >
                Submit Review
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">What Customers Say</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {reviews.length > 0 ? `${reviews.length} review${reviews.length > 1 ? "s" : ""}` : "No reviews yet"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-xl font-semibold text-foreground">{averageRating || "-"}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {reviews.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                  Be the first to leave a review.
                </div>
              )}
              {reviews.map(review => (
                <div key={review.id} className="rounded-xl bg-card shadow-card outline-subtle p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-foreground">{review.rating}/5</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{review.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Google Reviews</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Live Reviews</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Verified reviews pulled directly from Google.
            </p>
          </motion.div>
          <div className="mt-8 rounded-2xl bg-card shadow-card outline-subtle p-4">
            {process.env.NEXT_PUBLIC_ELFSIGHT_APP_ID ? (
              <div
                className={`elfsight-app-${process.env.NEXT_PUBLIC_ELFSIGHT_APP_ID}`}
                data-elfsight-app-lazy
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Set `NEXT_PUBLIC_ELFSIGHT_APP_ID` in `.env` to display the Google Reviews widget.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
