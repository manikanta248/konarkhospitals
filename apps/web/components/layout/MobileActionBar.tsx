import { Calendar, MessageCircle, Phone } from "lucide-react";
import { HOSPITAL } from "@konark/shared";

export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink-100 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-ink-700 active:bg-ink-50">
        <Phone size={19} />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={`https://wa.me/${HOSPITAL.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 border-x border-ink-100 py-2.5 text-emerald-600 active:bg-emerald-50"
      >
        <MessageCircle size={19} />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <a href="/book-appointment" className="flex flex-col items-center justify-center gap-0.5 bg-brand-600 py-2.5 text-white active:bg-brand-700">
        <Calendar size={19} />
        <span className="text-[11px] font-medium">Book Now</span>
      </a>
    </div>
  );
}
