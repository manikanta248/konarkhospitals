export const HOSPITAL = {
  name: "Konark Hospitals",
  tagline: "When passion meets compassion, experience the best medical practices in action.",
  positioning: "Best Multispeciality Hospital in Hyderabad | Fertility, IVF & IUI Specialists",
  address: "#13 & 14, Pipeline Road, Behind Deevan Dhaba, Petbasheerabad, Jeedimetla, Hyderabad – 500 055",
  phone: "+91 40 3526 1515",
  mobile: "+91 98496 61515",
  emergency: "+91 98496 61515",
  whatsapp: "919849661515",
  email: "konark.reception@gmail.com",
  opdHours: "10:00 AM – 3:00 PM & 6:00 PM – 8:00 PM",
  emergencyHours: "Open 24/7",
  mapsUrl: "https://maps.app.goo.gl/kXWTy8tzbW5tcXso7",
  mapsEmbedUrl: "https://www.google.com/maps?q=17.5124278,78.4754673(Konark+Hospitals)&z=17&output=embed",
  socials: {
    instagram: "https://www.instagram.com/konark.hospitals",
  },
};

// Sourced from the live site's "philosophy" and "multispeciality-hospital-in-hyderabad" pages.
export const ABOUT = {
  bedCount: "100-bed",
  establishedYear: 2009,
  trustName: "Thatipally Somalingam Memorial Trust",
  trustFounder: "Sri Ashok K. Thatipally",
  trustMotto: "To Serve the Needy and the Aged",
  founder: {
    name: "Dr. T. Rajani Ashok",
    title: "Founder & Chairperson",
    slug: "dr-t-rajani-ashok",
  },
  vision:
    "To emerge as the leading healthcare provider in the region by delivering high quality medical care tempered by the human touch.",
  mission:
    "To continuously enhance our medical expertise and infrastructure while keeping costs at affordable, easily accessible levels for every family we serve.",
  values: [
    { name: "Compassion", description: "Every patient is treated with empathy — a gentle, caring attitude is at times more effective than the strongest medicine." },
    { name: "Affordability", description: "World-class healthcare, priced to stay within reach of every family we serve." },
    { name: "Respect", description: "Every patient is treated equally, regardless of social standing or financial background." },
    { name: "Excellence", description: "State-of-the-art infrastructure and rigorous medical protocols across every department." },
  ],
  chairpersonMessage: [
    "I don't consider his or her social standing or bank balance. The entire focus is on treating the patient to get well soon.",
    "We are committed to sharing the advancements of modern healthcare with our community, offering 360-degree care for the entire family — with particular emphasis on the health of women and children.",
    "Proactive check-ups and screenings enable early detection of any disease, and we practice this preventive approach across our departments.",
    "A gentle, caring attitude is at times more effective than the strongest medicine. Our mission is to provide the full circle of care — combining the highest medical protocols with genuine compassion.",
  ],
};

export const DEPARTMENT_SLUGS = [
  "cardiology",
  "neurology",
  "orthopaedics",
  "fertility-ivf",
  "gynecology",
  "paediatrics",
  "urology",
  "pulmonology",
  "general-medicine",
  "plastic-surgery-cosmetology",
  "ent",
  "physiotherapy",
  "vascular-surgery",
] as const;
