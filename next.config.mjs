/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow production builds to complete even if type errors exist.
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-popover",
      "@radix-ui/react-tabs",
      "recharts",
      "xlsx",
      "papaparse",
    ],
    // Disable build worker to avoid Windows EPERM spawn failures.
    webpackBuildWorker: false,
    // Use worker_threads instead of child_process to avoid Windows EPERM spawn errors.
    workerThreads: true,
  },
  // Compress responses for faster page loads
  compress: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  // Reduce powered-by header
  poweredByHeader: false,
};

export default nextConfig;
