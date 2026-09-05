import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileActionBar />
      <ChatWidget />
    </>
  );
}
