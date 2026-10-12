/**
 * Central keyword map for on-page SEO. Titles/descriptions generated from this file
 * are also what's documented for the client — keep this the single source of truth
 * rather than duplicating keyword copy inline on individual pages.
 */

export const SITE_URL = "https://www.konarkhospitals.com";

export const PRIMARY_KEYWORDS = [
  "best multispeciality hospital in Hyderabad",
  "hospital in Jeedimetla",
  "hospital in Petbasheerabad",
  "best IVF center in Hyderabad",
  "fertility hospital Hyderabad",
];

export const DEPARTMENT_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "fertility-ivf": {
    title: "Best IVF & Fertility Center in Hyderabad",
    description:
      "IVF, IUI and comprehensive fertility treatment at Konark Hospitals, Jeedimetla — experienced fertility specialists, advanced lab and personalised care since 2009.",
    keywords: ["best IVF center in Hyderabad", "fertility hospital Jeedimetla", "IUI treatment Hyderabad", "infertility specialist Hyderabad"],
  },
  gynecology: {
    title: "Best Gynecologist in Hyderabad | Women's Health",
    description:
      "Expert gynecology and obstetric care at Konark Hospitals, Jeedimetla — high-risk pregnancy, maternity and women's health services from experienced specialists.",
    keywords: ["best gynecologist in Hyderabad", "maternity hospital Jeedimetla", "high-risk pregnancy care Hyderabad", "women's health hospital Hyderabad"],
  },
  paediatrics: {
    title: "Best Paediatrician in Hyderabad | Child Specialist",
    description:
      "Paediatric and neonatal care at Konark Hospitals, Jeedimetla — experienced child specialists for newborn, infant and adolescent health.",
    keywords: ["best paediatrician in Hyderabad", "child specialist Jeedimetla", "neonatal care Hyderabad"],
  },
  "general-medicine": {
    title: "Best General Physician in Hyderabad",
    description:
      "General medicine and internal medicine consultations at Konark Hospitals, Jeedimetla — diagnosis and management of everyday and chronic health conditions.",
    keywords: ["general physician Hyderabad", "internal medicine specialist Jeedimetla", "family doctor Hyderabad"],
  },
  urology: {
    title: "Best Urologist in Hyderabad | Kidney & Urinary Care",
    description:
      "Urology care at Konark Hospitals, Jeedimetla — kidney stones, prostate and urinary tract treatment from experienced urology specialists.",
    keywords: ["best urologist in Hyderabad", "kidney stone treatment Hyderabad", "urology hospital Jeedimetla"],
  },
  orthopaedics: {
    title: "Best Orthopaedic Doctor in Hyderabad | Bone & Joint Care",
    description:
      "Orthopaedic and joint care at Konark Hospitals, Jeedimetla — fracture treatment, joint replacement and sports injury care from experienced orthopaedic surgeons.",
    keywords: ["best orthopaedic doctor in Hyderabad", "joint replacement surgery Hyderabad", "orthopaedic hospital Jeedimetla"],
  },
  cardiology: {
    title: "Best Cardiologist in Hyderabad | Heart Specialist",
    description:
      "Cardiology care at Konark Hospitals, Jeedimetla — heart disease diagnosis, treatment and preventive cardiac care from experienced cardiologists.",
    keywords: ["best cardiologist in Hyderabad", "heart specialist Jeedimetla", "cardiac care hospital Hyderabad"],
  },
  neurology: {
    title: "Best Neurologist in Hyderabad | Brain & Nerve Care",
    description:
      "Neurology care at Konark Hospitals, Jeedimetla — stroke, epilepsy and nerve disorder treatment from experienced neurology specialists.",
    keywords: ["best neurologist in Hyderabad", "stroke treatment Hyderabad", "neurology hospital Jeedimetla"],
  },
  pulmonology: {
    title: "Best Pulmonologist in Hyderabad | Lung Specialist",
    description:
      "Pulmonology and respiratory care at Konark Hospitals, Jeedimetla — asthma, COPD and lung disease treatment from experienced chest specialists.",
    keywords: ["best pulmonologist in Hyderabad", "lung specialist Jeedimetla", "asthma treatment Hyderabad"],
  },
  "plastic-surgery-cosmetology": {
    title: "Best Plastic Surgeon in Hyderabad | Cosmetic Surgery",
    description:
      "Plastic surgery and cosmetology services at Konark Hospitals, Jeedimetla — reconstructive and cosmetic procedures from experienced plastic surgeons.",
    keywords: ["best plastic surgeon in Hyderabad", "cosmetic surgery Jeedimetla", "cosmetology clinic Hyderabad"],
  },
  ent: {
    title: "Best ENT Specialist in Hyderabad | Ear, Nose & Throat",
    description:
      "ENT care at Konark Hospitals, Jeedimetla — ear, nose and throat diagnosis and treatment from experienced ENT specialists.",
    keywords: ["best ENT specialist in Hyderabad", "ENT hospital Jeedimetla", "ear nose throat doctor Hyderabad"],
  },
  physiotherapy: {
    title: "Best Physiotherapy Center in Hyderabad",
    description:
      "Physiotherapy and rehabilitation services at Konark Hospitals, Jeedimetla — post-surgical recovery, pain management and mobility care.",
    keywords: ["best physiotherapist in Hyderabad", "physiotherapy center Jeedimetla", "rehabilitation clinic Hyderabad"],
  },
  "vascular-surgery": {
    title: "Vascular Surgeon in Hyderabad | Vascular Surgery",
    description:
      "Vascular surgery care at Konark Hospitals, Jeedimetla — varicose veins, vascular disease diagnosis and treatment from experienced vascular surgeons.",
    keywords: ["vascular surgeon Hyderabad", "varicose veins treatment Hyderabad", "vascular surgery Jeedimetla"],
  },
};
