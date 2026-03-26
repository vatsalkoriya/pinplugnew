import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotLazy from "./ChatbotLazy";
import AnnouncementBar from "./AnnouncementBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <ChatbotLazy />
    </>
  );
}
