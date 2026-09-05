export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}

export const NAV: NavGroup[] = [
  {
    label: "Medical Services",
    href: "/services",
    links: [
      { label: "Cardiology", href: "/services/cardiology", description: "Heart & cardiac care" },
      { label: "Neurology", href: "/services/neurology", description: "Brain & nervous system" },
      { label: "Orthopaedics", href: "/services/orthopaedics", description: "Bone, joint & trauma care" },
      { label: "Fertility & IVF", href: "/services/fertility-ivf", description: "IVF, IUI & fertility care" },
      { label: "Gynecology", href: "/services/gynecology", description: "Women's health & obstetrics" },
      { label: "Paediatrics", href: "/services/paediatrics", description: "Newborn & child care" },
      { label: "Urology", href: "/services/urology", description: "Urinary & reproductive care" },
      { label: "Pulmonology", href: "/services/pulmonology", description: "Lung & respiratory care" },
      { label: "General Medicine", href: "/services/general-medicine", description: "Everyday illness & chronic care" },
      { label: "Plastic Surgery & Cosmetology", href: "/services/plastic-surgery-cosmetology", description: "Reconstructive & cosmetic surgery" },
      { label: "ENT", href: "/services/ent", description: "Ear, nose & throat care" },
      { label: "Physiotherapy", href: "/services/physiotherapy", description: "Rehabilitation & recovery" },
      { label: "Vascular & Endovascular Surgery", href: "/services/vascular-surgery", description: "Blood vessel conditions" },
    ],
  },
  {
    label: "Doctors",
    href: "/doctors",
    links: [
      { label: "Find a Doctor", href: "/doctors", description: "Search by specialty" },
      { label: "Book Consultation", href: "/book-appointment?type=consultation", description: "Schedule a visit" },
    ],
  },
  {
    label: "Patient Care",
    href: "/patient-care",
    links: [
      { label: "Insurance & TPA", href: "/patient-care/insurance-tpa" },
      { label: "Medical Records", href: "/patient-care/medical-records" },
      { label: "Patient Guide", href: "/patient-care/patient-guide" },
      { label: "Admission & Discharge", href: "/patient-care/admission-discharge" },
      { label: "Second Opinion", href: "/patient-care/second-opinion" },
    ],
  },
  {
    label: "About",
    href: "/about",
    links: [
      { label: "About Konark", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Infrastructure", href: "/about/infrastructure" },
      { label: "Awards & Recognition", href: "/about/awards" },
      { label: "Patient Testimonials", href: "/testimonials" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/article",
    links: [
      { label: "Health Articles", href: "/resources/article" },
      { label: "Disease Information", href: "/resources/disease" },
      { label: "Treatment Guides", href: "/resources/treatment-guide" },
      { label: "Videos", href: "/resources/video" },
      { label: "News & Events", href: "/resources/news" },
    ],
  },
];

export const UTILITY_LINKS: NavLink[] = [
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Locations", href: "/locations" },
];
