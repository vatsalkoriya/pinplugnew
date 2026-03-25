/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow production builds to complete even if type errors exist.
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // Disable build worker to avoid Windows EPERM spawn failures.
    webpackBuildWorker: false,
    // Use worker_threads instead of child_process to avoid Windows EPERM spawn errors.
    workerThreads: true,
  },
};

export default nextConfig;
