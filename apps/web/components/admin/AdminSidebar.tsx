"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Bot,
  Briefcase,
  Calendar,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  Newspaper,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/layout/Logo";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar },
  { href: "/admin/messages", label: "Contact Messages", icon: Mail },
  { href: "/admin/chat-logs", label: "Chat Conversations", icon: MessageCircle },
  { href: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/admin/departments", label: "Departments", icon: Users },
  { href: "/admin/articles", label: "Articles & Resources", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/health-packages", label: "Health Packages", icon: Award },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-ink-100 bg-white">
      <div className="flex h-20 items-center border-b border-ink-100 px-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                    active ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-50"
                  }`}
                >
                  <item.icon size={17} className="shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-ink-100 p-4">
        <p className="truncate text-xs text-ink-500">{user?.email}</p>
        <button
          onClick={() => logout()}
          className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-ink-600 hover:bg-ink-50"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
