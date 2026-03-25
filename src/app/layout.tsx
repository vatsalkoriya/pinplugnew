import "../index.css";
import Providers from "./providers";

export const metadata = {
  title: "Pinplug",
  description: "Precision electronics and professional integration for the modern home.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
