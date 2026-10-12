import { ABOUT } from "@konark/shared";

export const SITE_FAQS = [
  {
    question: "What medical services does Konark Hospitals offer?",
    answer:
      "Konark Hospitals provides comprehensive multispeciality care, including Fertility & IVF, Gynaecology, Paediatrics, Urology, Orthopaedics, Cardiology, Neurology, General Medicine, Pulmonology and other specialised services.",
  },
  {
    question: "How can I book an appointment with a doctor?",
    answer: "You can book an appointment through the Book an Appointment option on our website or contact Konark Hospitals directly by phone.",
  },
  {
    question: "Does Konark Hospitals provide 24/7 emergency care?",
    answer: "Yes. Konark Hospitals provides 24/7 emergency care for patients requiring immediate medical attention.",
  },
  {
    question: "Does Konark Hospitals offer IVF and fertility treatments?",
    answer: `Yes. Our Fertility & IVF services include IVF, IUI and comprehensive fertility care, supported by experienced specialists since ${ABOUT.establishedYear}.`,
  },
  {
    question: "Does Konark Hospitals accept health insurance and cashless treatment?",
    answer:
      "Yes. Konark Hospitals works with multiple insurance companies and TPAs. Cashless treatment is available for eligible policies, subject to insurance approval and applicable terms.",
  },
  {
    question: "Can I get a second medical opinion at Konark Hospitals?",
    answer: "Yes. Patients can seek a second medical opinion from our experienced specialists to better understand their diagnosis and treatment options.",
  },
  {
    question: "What documents are required for hospital admission?",
    answer:
      "Depending on the treatment, patients may need to provide a valid ID, previous medical records, prescriptions and insurance documents. Our admissions team will guide you through the required documentation.",
  },
  {
    question: "Where is Konark Hospitals located?",
    answer: "Konark Hospitals is located at Petbasheerabad, Jeedimetla, Hyderabad, Telangana. You can visit our Contact Us page for directions and contact details.",
  },
] as const;
