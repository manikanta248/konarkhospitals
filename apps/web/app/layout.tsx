import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { HOSPITAL, ABOUT } from "@konark/shared";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo-keywords";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const TITLE_DEFAULT = "Konark Hospitals — Best Multispeciality Hospital in Hyderabad";
const DESCRIPTION_DEFAULT =
  "Konark Hospitals, Jeedimetla — best multispeciality hospital in Hyderabad offering fertility & IVF, cardiology, orthopaedics, gynecology, paediatrics and 24/7 emergency care.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Konark Hospitals",
  },
  description: DESCRIPTION_DEFAULT,
  keywords: [
    "multispeciality hospital in Hyderabad",
    "best hospital in Jeedimetla",
    "IVF center Hyderabad",
    "fertility hospital Hyderabad",
    "gynecologist Hyderabad",
    "cardiologist Hyderabad",
    "orthopaedic doctor Hyderabad",
    "emergency hospital Jeedimetla",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Konark Hospitals",
    title: TITLE_DEFAULT,
    description: DESCRIPTION_DEFAULT,
    images: [{ url: "/images/brand/konark-logo-transparent.png", width: 225, height: 225, alt: "Konark Hospitals" }],
  },
  twitter: {
    card: "summary",
    title: TITLE_DEFAULT,
    description: DESCRIPTION_DEFAULT,
  },
  robots: { index: true, follow: true },
};

const hospitalJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: HOSPITAL.name,
  description: DESCRIPTION_DEFAULT,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/konark-logo-transparent.png`,
  image: `${SITE_URL}/images/brand/konark-logo-transparent.png`,
  telephone: HOSPITAL.phone,
  email: HOSPITAL.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: HOSPITAL.address,
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500055",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 17.5124278, longitude: 78.4754673 },
  hasMap: HOSPITAL.mapsUrl,
  sameAs: [HOSPITAL.socials.instagram],
  foundingDate: String(ABOUT.establishedYear),
  medicalSpecialty: [
    "Cardiology",
    "Neurology",
    "Orthopaedics",
    "Fertility & IVF",
    "Gynecology",
    "Paediatrics",
    "Urology",
    "Pulmonology",
    "General Medicine",
  ],
  availableService: { "@type": "MedicalTherapy", name: "24/7 Emergency Care" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <JsonLd data={hospitalJsonLd} />
        {children}
      </body>
    </html>
  );
}
