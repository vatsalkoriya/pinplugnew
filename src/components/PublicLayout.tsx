import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotLazy from "./ChatbotLazy";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatbotLazy />
    </>
  );
}
