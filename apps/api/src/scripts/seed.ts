/**
 * Seeds Firestore with real Konark Hospitals content (departments, doctors, contact-adjacent
 * data) pulled from the live site, plus realistic supporting content (articles, testimonials,
 * events, careers, packages) where the live site had none to copy. Images are placeholders.
 */
import { db } from "../firebase";

// Real assets recovered from the live konarkhospitals.com site (see apps/web/public/images).
// Anything not listed here has no public photo yet — left blank rather than filled with an
// unrelated stock photo, so the frontend falls back to a branded placeholder instead.
const REAL_DOCTOR_PHOTOS: Record<string, string> = {
  "dr-t-rajani-ashok": "/images/doctors/dr-t-rajani-ashok.jpg",
  "dr-deepak": "/images/doctors/dr-deepak.jpg",
  "dr-p-ramesh": "/images/doctors/dr-p-ramesh.jpg",
  "dr-g-ramcharan": "/images/doctors/dr-g-ramcharan.jpg",
  "dr-manjari-singh": "/images/doctors/dr-manjari-singh.jpg",
};

const REAL_DEPARTMENT_IMAGES: Record<string, string> = {
  cardiology: "/images/departments/cardiology.jpg",
  neurology: "/images/departments/neurology.jpg",
  orthopaedics: "/images/departments/orthopaedics.jpg",
  "fertility-ivf": "/images/departments/fertility-ivf.jpg",
  gynecology: "/images/departments/gynecology.jpg",
  paediatrics: "/images/departments/paediatrics.jpg",
  urology: "/images/departments/urology.jpg",
  pulmonology: "/images/departments/pulmonology.jpg",
  "general-medicine": "/images/departments/general-medicine.jpg",
  "plastic-surgery-cosmetology": "/images/departments/plastic-surgery-cosmetology.jpg",
  ent: "/images/departments/ent.jpg",
  physiotherapy: "/images/departments/physiotherapy.jpg",
  "vascular-surgery": "/images/departments/vascular-surgery.jpg",
};

const departments = [
  {
    slug: "cardiology",
    name: "Cardiology",
    shortDescription: "Comprehensive heart care from diagnostics to advanced cardiac procedures.",
    description:
      "Konark Hospitals' Cardiology department delivers complete cardiac care — from routine screening and ECG/echo diagnostics to management of coronary artery disease, hypertension, arrhythmia and heart failure. Our physicians work closely with the emergency and critical care teams to ensure rapid response for cardiac emergencies.",
    heroImage: REAL_DEPARTMENT_IMAGES.cardiology,
    services: ["ECG & Echocardiography", "Cardiac Risk Screening", "Hypertension Management", "Arrhythmia Care", "Post-cardiac Rehabilitation"],
    conditionsTreated: ["Coronary Artery Disease", "Hypertension", "Arrhythmia", "Heart Failure", "Angina"],
    procedures: ["ECG", "2D Echo", "TMT (Treadmill Test)", "Holter Monitoring"],
    faqs: [{ question: "When should I get a cardiac screening done?", answer: "We recommend a baseline screening from age 30 onward, or earlier if you have a family history of heart disease, diabetes, or hypertension." }],
    order: 1,
    opdOnly: true,
  },
  {
    slug: "neurology",
    name: "Neurology",
    shortDescription: "Expert diagnosis and treatment for disorders of the brain, spine and nervous system.",
    description:
      "Our Neurology team manages the full spectrum of neurological conditions including stroke, epilepsy, headaches, and neuromuscular disorders, supported by round-the-clock emergency neurology care and rehabilitation services.",
    heroImage: REAL_DEPARTMENT_IMAGES.neurology,
    services: ["Stroke Management", "Epilepsy Care", "Headache & Migraine Clinic", "Nerve Conduction Studies"],
    conditionsTreated: ["Stroke", "Epilepsy", "Migraine", "Peripheral Neuropathy", "Parkinson's Disease"],
    procedures: ["EEG", "Nerve Conduction Study", "EMG"],
    faqs: [{ question: "What are the warning signs of a stroke?", answer: "Sudden numbness or weakness (especially one-sided), confusion, trouble speaking, vision problems, or loss of balance — seek emergency care immediately if these occur." }],
    order: 2,
    opdOnly: true,
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics",
    shortDescription: "Trauma care, joint replacement and sports injury treatment by experienced surgeons.",
    description:
      "The Orthopaedics department, led by experienced trauma and joint-replacement surgeons, treats fractures, degenerative joint disease, and sports injuries with both surgical and non-surgical approaches, followed by structured physiotherapy.",
    heroImage: REAL_DEPARTMENT_IMAGES.orthopaedics,
    services: ["Joint Replacement Surgery", "Trauma & Fracture Care", "Arthroscopy", "Sports Injury Clinic", "Physiotherapy"],
    conditionsTreated: ["Fractures", "Osteoarthritis", "Ligament Injuries", "Spine Disorders"],
    procedures: ["Total Knee Replacement", "Hip Replacement", "Arthroscopic Surgery"],
    faqs: [{ question: "How long is recovery after a knee replacement?", answer: "Most patients begin walking with support within 24–48 hours and return to normal daily activity in 6–12 weeks, with physiotherapy throughout." }],
    order: 3,
  },
  {
    slug: "fertility-ivf",
    name: "Fertility & IVF",
    shortDescription: "Advanced fertility treatments including IVF and IUI by our most experienced specialist.",
    description:
      "Konark Hospitals is recognised as one of Hyderabad's leading fertility centres, offering IVF, IUI and comprehensive infertility evaluation under the care of a fertility specialist with close to three decades of experience in obstetrics and gynaecology.",
    heroImage: REAL_DEPARTMENT_IMAGES["fertility-ivf"],
    services: ["IVF (In-Vitro Fertilization)", "IUI (Intrauterine Insemination)", "Fertility Evaluation", "High-risk Pregnancy Care"],
    conditionsTreated: ["Infertility", "PCOS", "Recurrent Miscarriage"],
    procedures: ["IVF Cycle", "IUI", "Ovulation Induction"],
    faqs: [{ question: "How long does one IVF cycle take?", answer: "A typical IVF cycle takes about 4–6 weeks from ovarian stimulation through embryo transfer." }],
    order: 4,
  },
  {
    slug: "gynecology",
    name: "Gynecology & Obstetrics",
    shortDescription: "Complete women's health care from pregnancy through every life stage.",
    description:
      "Our Gynaecology & Obstetrics team manages normal and high-risk pregnancies, deliveries, and gynaecological surgeries, including complex cases such as placenta accreta and broad ligament fibroid removal.",
    heroImage: REAL_DEPARTMENT_IMAGES.gynecology,
    services: ["Antenatal Care", "High-risk Pregnancy Management", "Normal & Caesarean Delivery", "Gynaecological Surgery"],
    conditionsTreated: ["High-risk Pregnancy", "Fibroids", "PCOS", "Menstrual Disorders"],
    procedures: ["Delivery Care", "Laparoscopic Gynae Surgery", "Hysterectomy"],
    faqs: [{ question: "What makes a pregnancy \"high-risk\"?", answer: "Factors like maternal age, pre-existing conditions (diabetes, hypertension), multiple pregnancy, or prior complications can classify a pregnancy as high-risk, requiring closer monitoring." }],
    order: 5,
  },
  {
    slug: "paediatrics",
    name: "Paediatrics & Neonatology",
    shortDescription: "Specialised care for newborns, infants and children.",
    description:
      "The Paediatrics & Neonatology unit provides newborn care, vaccination, growth monitoring and treatment for common and complex childhood illnesses, with neonatal support for high-risk deliveries.",
    heroImage: REAL_DEPARTMENT_IMAGES.paediatrics,
    services: ["Newborn Care", "Vaccination", "Growth & Development Monitoring", "Neonatal Intensive Care"],
    conditionsTreated: ["Neonatal Jaundice", "Respiratory Infections", "Growth Disorders"],
    procedures: ["NICU Care", "Well-baby Checkups"],
    faqs: [{ question: "Do you offer a full childhood vaccination schedule?", answer: "Yes — we follow the recommended national immunisation schedule and can guide you through catch-up vaccinations if needed." }],
    order: 6,
  },
  {
    slug: "urology",
    name: "Urology",
    shortDescription: "Diagnosis and treatment of urinary tract and male reproductive conditions.",
    description:
      "Our Urology & Andrology specialists treat kidney stones, prostate disorders and urinary tract conditions using both minimally invasive and conventional techniques.",
    heroImage: REAL_DEPARTMENT_IMAGES.urology,
    services: ["Kidney Stone Treatment", "Prostate Care", "Andrology", "Urinary Tract Surgery"],
    conditionsTreated: ["Kidney Stones", "Prostate Enlargement", "UTI", "Male Infertility"],
    procedures: ["Endoscopic Stone Removal", "Cystoscopy"],
    faqs: [{ question: "Is kidney stone treatment always surgical?", answer: "No — smaller stones often pass with medication and hydration. Larger or recurrent stones may need endoscopic removal, which our team performs using minimally invasive techniques." }],
    order: 7,
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    shortDescription: "Comprehensive respiratory and lung care for acute and chronic conditions.",
    description:
      "The Pulmonology department diagnoses and manages asthma, COPD, and other respiratory conditions using pulmonary function testing and evidence-based treatment protocols.",
    heroImage: REAL_DEPARTMENT_IMAGES.pulmonology,
    services: ["Pulmonary Function Testing", "Asthma & COPD Clinic", "Sleep Apnea Evaluation"],
    conditionsTreated: ["Asthma", "COPD", "Pneumonia", "Sleep Apnea"],
    procedures: ["Spirometry", "Bronchoscopy"],
    faqs: [{ question: "How is asthma different from COPD?", answer: "Asthma is typically reversible airway inflammation often starting in childhood, while COPD is progressive and most common in long-term smokers — both are managed differently, so an accurate diagnosis matters." }],
    order: 8,
    opdOnly: true,
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    shortDescription: "Outpatient consultation and management of everyday illness and chronic conditions.",
    description:
      "Our General Medicine consultants manage a wide range of everyday health concerns — from fever, infections and diabetes to hypertension and chronic disease follow-up — with a focus on accurate diagnosis and timely referral to specialists when needed.",
    heroImage: REAL_DEPARTMENT_IMAGES["general-medicine"],
    services: ["General Health Consultation", "Diabetes & Hypertension Management", "Chronic Disease Follow-up", "Preventive Health Advice"],
    conditionsTreated: ["Fever & Infections", "Diabetes", "Hypertension", "Thyroid Disorders"],
    procedures: ["Routine Health Screening", "Chronic Disease Monitoring"],
    faqs: [],
    order: 9,
    opdOnly: true,
  },
  {
    slug: "plastic-surgery-cosmetology",
    name: "Plastic Surgery & Cosmetology",
    shortDescription: "Reconstructive and cosmetic surgery for trauma, post-surgical and aesthetic needs.",
    description:
      "Our Plastic & Reconstructive Surgery team performs both reconstructive procedures — following trauma, burns or tumor surgery — and cosmetic procedures, combining surgical precision with an emphasis on natural-looking results.",
    heroImage: REAL_DEPARTMENT_IMAGES["plastic-surgery-cosmetology"],
    services: ["Reconstructive Surgery", "Post-trauma & Post-tumor Reconstruction", "Cosmetic Surgery", "Burn Care"],
    conditionsTreated: ["Post-traumatic Deformities", "Burn Injuries", "Congenital Anomalies"],
    procedures: ["Reconstructive Flap Surgery", "Scar Revision", "Cosmetic Procedures"],
    faqs: [],
    order: 10,
  },
  {
    slug: "ent",
    name: "ENT",
    shortDescription: "Diagnosis and treatment of ear, nose, throat and related head & neck conditions.",
    description:
      "Our ENT (Ear, Nose & Throat) specialists treat conditions ranging from chronic sinus issues and hearing problems to snoring and voice disorders, using both medical and surgical approaches.",
    heroImage: REAL_DEPARTMENT_IMAGES.ent,
    services: ["Sinus & Snoring Surgery", "Hearing Evaluation", "Rhino-Laryngology", "Ear Infection Treatment"],
    conditionsTreated: ["Sinusitis", "Hearing Loss", "Tonsillitis", "Voice Disorders"],
    procedures: ["Endoscopic Sinus Surgery", "Tonsillectomy"],
    faqs: [],
    order: 11,
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    shortDescription: "Rehabilitation and physical therapy for post-surgical and injury recovery.",
    description:
      "Our physiotherapy team supports recovery after surgery, injury or illness with individualised rehabilitation plans, working closely with our Orthopaedics and other specialist departments.",
    heroImage: REAL_DEPARTMENT_IMAGES.physiotherapy,
    services: ["Post-surgical Rehabilitation", "Sports Injury Recovery", "Pain Management Therapy", "Mobility Training"],
    conditionsTreated: ["Post-operative Stiffness", "Back & Joint Pain", "Sports Injuries"],
    procedures: ["Manual Therapy", "Therapeutic Exercise"],
    faqs: [],
    order: 12,
  },
  {
    slug: "vascular-surgery",
    name: "Vascular & Endovascular Surgery",
    shortDescription: "Diagnosis and surgical treatment of blood vessel conditions.",
    description:
      "Our Vascular Surgery team treats conditions affecting arteries and veins using both open surgical and minimally invasive endovascular techniques.",
    heroImage: REAL_DEPARTMENT_IMAGES["vascular-surgery"],
    services: ["Varicose Vein Treatment", "Peripheral Vascular Disease Management", "Endovascular Procedures"],
    conditionsTreated: ["Varicose Veins", "Peripheral Artery Disease", "Deep Vein Thrombosis"],
    procedures: ["Endovascular Surgery", "Vascular Bypass"],
    faqs: [],
    order: 13,
  },
];

const doctors = [
  {
    slug: "dr-t-rajani-ashok",
    name: "Dr. T. Rajani Ashok",
    departmentSlug: "fertility-ivf",
    departmentName: "Fertility & IVF",
    qualifications: "MD (Obs & Gynae)",
    designation: "Senior Fertility Specialist",
    experienceYears: 30,
    specialization: "Fertility, IVF & High-risk Obstetrics",
    bio: "Dr. T. Rajani Ashok brings close to three decades of experience in obstetrics, gynaecology and fertility care, and has led some of Konark Hospitals' most complex deliveries and fertility treatments.",
    languages: ["English", "Telugu", "Hindi"],
    featured: true,
    order: 1,
  },
  {
    slug: "dr-dv-srinivas",
    name: "Dr. D.V. Srinivas",
    departmentSlug: "general-medicine",
    departmentName: "General Medicine",
    qualifications: "MBBS, MD (General Medicine)",
    designation: "Consultant Physician",
    experienceYears: 16,
    specialization: "General Medicine & Cardiac Care",
    bio: "Dr. D.V. Srinivas is a consultant physician with 16 years of experience managing chronic illness, cardiac risk and internal medicine cases.",
    languages: ["English", "Telugu"],
    featured: false,
    order: 2,
  },
  {
    slug: "dr-sakina-kousar",
    name: "Dr. Sakina Kousar",
    departmentSlug: "gynecology",
    departmentName: "Gynecology & Obstetrics",
    qualifications: "DGO",
    designation: "Consultant Obstetrician & Gynaecologist",
    experienceYears: 12,
    specialization: "High-risk Pregnancy & Infertility",
    bio: "Dr. Sakina Kousar focuses on high-risk pregnancy management and infertility treatment, with experience handling complex obstetric emergencies.",
    languages: ["English", "Telugu", "Urdu"],
    featured: false,
    order: 4,
  },
  {
    slug: "dr-deepak",
    name: "Dr. Deepak",
    departmentSlug: "urology",
    departmentName: "Urology",
    qualifications: "MS, MCh (Urology)",
    designation: "Urologist & Andrologist",
    experienceYears: 10,
    specialization: "Urology & Andrology",
    bio: "Dr. Deepak treats a wide range of urological and andrological conditions using minimally invasive techniques.",
    languages: ["English", "Telugu"],
    featured: true,
    order: 5,
  },
  {
    slug: "dr-manjari-singh",
    name: "Dr. Manjari Singh",
    departmentSlug: "gynecology",
    departmentName: "Gynecology & Obstetrics",
    qualifications: "DMRE",
    designation: "Consultant Radiologist",
    experienceYears: 20,
    specialization: "Obstetric & Gynaecological Ultrasound",
    bio: "Dr. Manjari Singh has 20 years of experience in obstetric and gynaecological ultrasound imaging, supporting accurate prenatal diagnosis.",
    languages: ["English", "Hindi"],
    featured: true,
    order: 6,
  },
  {
    slug: "dr-p-ramesh",
    name: "Dr. P. Ramesh",
    departmentSlug: "plastic-surgery-cosmetology",
    departmentName: "Plastic Surgery & Cosmetology",
    qualifications: "MS, MCh (Plastic Surgery)",
    designation: "Plastic & Reconstructive Surgeon",
    experienceYears: 15,
    specialization: "Plastic, Reconstructive & Cosmetic Surgery",
    bio: "Dr. P. Ramesh performs reconstructive and cosmetic procedures, including complex reconstructions following trauma and tumor surgery.",
    languages: ["English", "Telugu"],
    featured: true,
    order: 7,
  },
  {
    slug: "dr-shashikanth",
    name: "Dr. Shashikanth",
    departmentSlug: "ent",
    departmentName: "ENT",
    qualifications: "MS (ENT)",
    designation: "ENT Surgeon",
    experienceYears: 13,
    specialization: "Sinus & Snoring Surgery",
    bio: "Dr. Shashikanth specialises in ENT surgery with a focus on sinus disorders and snoring/sleep-related airway surgery.",
    languages: ["English", "Telugu"],
    featured: true,
    order: 8,
  },
  {
    slug: "dr-b-murali-mohan",
    name: "Dr. B. Murali Mohan",
    departmentSlug: "pulmonology",
    departmentName: "Pulmonology",
    qualifications: "MD (Pulmonology)",
    designation: "Consultant Pulmonologist",
    experienceYears: 11,
    specialization: "Respiratory & Lung Care",
    bio: "Dr. B. Murali Mohan manages acute and chronic respiratory conditions including asthma, COPD and sleep apnea.",
    languages: ["English", "Telugu"],
    featured: false,
    order: 9,
  },
  {
    slug: "dr-c-chandra-sekar",
    name: "Dr. C. Chandra Sekar",
    departmentSlug: "vascular-surgery",
    departmentName: "Vascular & Endovascular Surgery",
    qualifications: "MS, MCh (Vascular Surgery)",
    designation: "Vascular Surgeon",
    experienceYears: 18,
    specialization: "Vascular & Endovascular Surgery",
    bio: "Dr. C. Chandra Sekar treats vascular conditions using both open and endovascular surgical techniques.",
    languages: ["English", "Tamil", "Telugu"],
    featured: false,
    order: 10,
  },
  {
    slug: "dr-g-ramcharan",
    name: "Dr. G. Ramcharan",
    departmentSlug: "physiotherapy",
    departmentName: "Physiotherapy",
    qualifications: "BPT, MPT",
    designation: "Chief Physiotherapist",
    experienceYears: 12,
    specialization: "Orthopaedic Rehabilitation",
    bio: "Dr. G. Ramcharan leads the physiotherapy and rehabilitation program supporting post-surgical and injury recovery.",
    languages: ["English", "Telugu"],
    featured: false,
    order: 11,
  },
  {
    slug: "dr-n-satish-kumar",
    name: "Dr. N. Satish Kumar",
    departmentSlug: "ent",
    departmentName: "ENT",
    qualifications: "MS (ENT)",
    designation: "ENT & Rhino-Laryngology Specialist",
    experienceYears: 14,
    specialization: "Rhino-Laryngology",
    bio: "Dr. N. Satish Kumar specialises in nose, throat and voice-box disorders and related surgical care.",
    languages: ["English", "Telugu"],
    featured: false,
    order: 12,
  },
  {
    // Added per client request — full qualifications/experience/bio pending from the hospital;
    // edit via the admin panel once available.
    slug: "dr-venkat-ram-reddy",
    name: "Dr. Venkat Ram Reddy",
    departmentSlug: "orthopaedics",
    departmentName: "Orthopaedics",
    qualifications: "",
    designation: "Orthopaedic Surgeon",
    experienceYears: 0,
    specialization: "Orthopaedics",
    bio: "",
    languages: ["English", "Telugu"],
    featured: true,
    order: 13,
  },
].map((d) => ({ ...d, photo: REAL_DOCTOR_PHOTOS[d.slug] ?? "", availability: [
  { day: "Mon - Sat", slots: "10:00 AM - 3:00 PM" },
  { day: "Mon - Sat", slots: "6:00 PM - 8:00 PM" },
] }));

// No real patient photos exist for these (illustrative testimonials) — photo is left blank
// intentionally so the frontend renders an initials avatar instead of a fake stock photo.
const testimonials = [
  { patientName: "Lakshmi Reddy", quote: "The maternity team at Konark made a high-risk pregnancy feel safe every step of the way. Forever grateful.", departmentSlug: "gynecology", rating: 5 },
  { patientName: "Ravi Kumar", quote: "Excellent orthopaedic care after my accident — the surgery and physiotherapy team got me walking again.", departmentSlug: "orthopaedics", rating: 5 },
  { patientName: "Fathima Begum", quote: "Our IVF journey finally succeeded thanks to Dr. Rajani Ashok and her team's patience and expertise.", departmentSlug: "fertility-ivf", rating: 5 },
  { patientName: "Srinivas Rao", quote: "Prompt emergency response and attentive cardiac care — couldn't have asked for better treatment for my father.", departmentSlug: "cardiology", rating: 5 },
  { patientName: "Anitha Kumari", quote: "The paediatric team was so patient with my daughter. They explained everything and made her comfortable throughout.", departmentSlug: "paediatrics", rating: 5 },
  { patientName: "Mohammed Ali", quote: "Quick diagnosis and minimally invasive treatment for my kidney stones — back on my feet within days.", departmentSlug: "urology", rating: 4 },
].map((t) => ({ ...t, photo: "" }));

// Editorial content written for this site — the live site's blog had no published posts to
// carry over. Cover images reuse real department/facility photos where topically relevant.
// The video post has no videoUrl until a real one is uploaded via the admin panel.
const articles = [
  { slug: "understanding-high-risk-pregnancy", type: "article", title: "Understanding High-Risk Pregnancy: What Every Mother Should Know", summary: "Signs, causes, and how specialist care improves outcomes for high-risk pregnancies.", content: "A pregnancy is generally classified as \"high-risk\" when there's an increased chance of complications for the mother, the baby, or both. Common factors include maternal age, pre-existing conditions like diabetes or hypertension, carrying multiples, or a history of pregnancy complications. Our Gynaecology & Obstetrics team manages high-risk pregnancies with more frequent check-ups, additional screening, and a clear delivery plan tailored to your specific risk factors.", coverImage: REAL_DEPARTMENT_IMAGES.gynecology, tags: ["pregnancy", "gynecology"] },
  { slug: "managing-diabetes-and-heart-health", type: "article", title: "Managing Diabetes and Heart Health Together", summary: "Why cardiac risk assessment matters for diabetic patients.", content: "Diabetes and heart disease are closely linked — people with diabetes are roughly twice as likely to develop cardiovascular disease. We recommend diabetic patients get a baseline cardiac risk assessment at diagnosis and annually thereafter. Our Cardiology and General Medicine teams coordinate closely for diabetic patients, so heart health and blood sugar management are never treated in isolation.", coverImage: REAL_DEPARTMENT_IMAGES.cardiology, tags: ["cardiology", "diabetes"] },
  { slug: "coronary-artery-disease", type: "disease", title: "Coronary Artery Disease", summary: "Causes, symptoms, diagnosis and treatment of CAD.", content: "Coronary artery disease (CAD) occurs when the blood vessels supplying the heart muscle become narrowed or blocked by plaque buildup, restricting blood flow and increasing the risk of angina, heart attack or heart failure. Diagnosis typically starts with an ECG and may include an echocardiogram or stress test. Treatment ranges from lifestyle changes and medication to procedures that restore blood flow, depending on severity.", coverImage: REAL_DEPARTMENT_IMAGES.cardiology, tags: ["cardiology"] },
  { slug: "osteoarthritis", type: "disease", title: "Osteoarthritis", summary: "Understanding joint degeneration and treatment options.", content: "Osteoarthritis is the most common form of arthritis, occurring when the protective cartilage cushioning the ends of bones gradually wears down. It most often affects the knees, hips, hands and spine. Management usually starts conservatively — weight management, low-impact exercise and physiotherapy — with joint replacement considered when conservative measures no longer provide adequate relief.", coverImage: REAL_DEPARTMENT_IMAGES.orthopaedics, tags: ["orthopaedics"] },
  { slug: "knee-replacement-recovery-guide", type: "treatment-guide", title: "Knee Replacement: A Complete Recovery Guide", summary: "What to expect before, during and after knee replacement surgery.", content: "Most patients begin standing and walking with support within 24–48 hours of knee replacement surgery. Physiotherapy becomes the main focus over the following weeks, rebuilding strength and range of motion. Most patients resume light daily activities within 3–6 weeks, with full recovery typically taking 3–6 months. Our physiotherapy team works alongside our orthopaedic surgeons throughout, so rehabilitation is coordinated from day one.", coverImage: REAL_DEPARTMENT_IMAGES.orthopaedics, tags: ["orthopaedics"] },
  { slug: "ivf-process-explained", type: "treatment-guide", title: "The IVF Process, Step by Step", summary: "A clear walkthrough of the IVF treatment journey.", content: "IVF involves ovarian stimulation (roughly 10–14 days), egg retrieval under sedation, fertilization in the lab (conventional or via ICSI), embryo development over 3–5 days, embryo transfer, and a two-week wait before a blood test confirms the outcome. Every patient's journey looks a little different, and our fertility specialist will walk you through what to expect for your specific case.", coverImage: REAL_DEPARTMENT_IMAGES["fertility-ivf"], tags: ["fertility-ivf"] },
  { slug: "hospital-tour-video", type: "video", title: "Take a Tour of Konark Hospitals", summary: "A walkthrough of our facilities and infrastructure.", content: "A video tour of our operation theatres, ICU, NICU and patient wards will be published here soon.", coverImage: "", videoUrl: "", tags: ["infrastructure"] },
  { slug: "konark-hosts-free-health-camp", type: "news", title: "Konark Hospitals Hosts Free Community Health Camp", summary: "Over 300 residents screened at our latest community outreach event.", content: "Konark Hospitals organised a free health screening camp for residents of Jeedimetla and surrounding areas, offering complimentary blood pressure, blood sugar and BMI checks. Over 300 residents attended, with our physicians on hand to offer guidance on follow-up care where needed. Community outreach remains a core part of our mission, and we plan to hold similar camps regularly.", coverImage: "/images/facilities/general-wards.png", tags: ["events", "community"] },
].map((a) => ({ ...a, author: "Konark Hospitals Editorial Team", publishedAt: new Date().toISOString() }));

const events = [
  { slug: "free-health-checkup-camp-2026", title: "Free Health Checkup Camp", summary: "Join us for free general health screening including BP, sugar and BMI checks.", date: "2026-09-05", location: "Konark Hospitals, Jeedimetla", coverImage: "/images/facilities/general-wards.png" },
  { slug: "world-heart-day-awareness-drive", title: "World Heart Day Awareness Drive", summary: "Free cardiac risk assessment camp in observance of World Heart Day.", date: "2026-09-29", location: "Konark Hospitals, Jeedimetla", coverImage: REAL_DEPARTMENT_IMAGES.cardiology },
];

const careers = [
  { slug: "staff-nurse-icu", title: "Staff Nurse - ICU", department: "Nursing", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "2+ years", description: "We are looking for a dedicated ICU staff nurse to join our critical care team.", responsibilities: ["Monitor critically ill patients", "Administer medications", "Coordinate with physicians"], requirements: ["GNM/B.Sc Nursing", "ICU experience preferred", "Valid nursing registration"], active: true },
  { slug: "front-office-executive", title: "Front Office Executive", department: "Administration", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "1+ years", description: "Manage patient reception, appointment scheduling and front-desk operations.", responsibilities: ["Greet and register patients", "Schedule appointments", "Handle billing queries"], requirements: ["Graduate", "Good communication skills"], active: true },
  { slug: "duty-medical-officer", title: "Duty Medical Officer", department: "Medical", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "0-3 years", description: "MBBS graduate for round-the-clock emergency and inpatient coverage.", responsibilities: ["Attend to emergency cases", "Round on inpatients", "Coordinate with specialists"], requirements: ["MBBS with valid registration"], active: true },
].map((c) => ({ ...c, postedAt: new Date().toISOString() }));

const healthPackages = [
  { slug: "full-body-checkup-essential", name: "Full Body Checkup — Essential", description: "A comprehensive screening covering blood, cardiac and abdominal parameters.", price: 1999, inclusions: ["CBC (Complete Blood Count)", "Lipid Profile", "Blood Sugar (Fasting)", "ECG", "Abdomen Ultrasound", "Doctor Consultation"], image: "/images/facilities/general-wards.png", order: 1 },
  { slug: "womens-wellness-package", name: "Women's Wellness Package", description: "Focused screening for women's health including hormonal and gynae checks.", price: 2999, inclusions: ["CBC", "Thyroid Profile", "Pap Smear", "Pelvic Ultrasound", "Bone Density Screening", "Gynaecologist Consultation"], image: REAL_DEPARTMENT_IMAGES.gynecology, order: 2 },
  { slug: "cardiac-risk-package", name: "Cardiac Risk Package", description: "Assess your heart health with a focused cardiac screening panel.", price: 2499, inclusions: ["ECG", "2D Echo", "Lipid Profile", "TMT (Treadmill Test)", "Cardiologist Consultation"], image: REAL_DEPARTMENT_IMAGES.cardiology, order: 3 },
  { slug: "senior-citizen-checkup", name: "Senior Citizen Checkup", description: "A broader panel designed for comprehensive screening in patients above 55.", price: 3499, inclusions: ["CBC", "Lipid & Sugar Profile", "ECG & 2D Echo", "Kidney & Liver Function Tests", "Bone Density Screening", "Physician Consultation"], image: "/images/facilities/private-rooms.png", order: 4 },
];

async function seedCollection(name: string, items: any[]) {
  // Clear existing docs first so re-running this script updates content instead of
  // duplicating it. Only ever touches the seed collections below — appointments and
  // contactSubmissions (real patient/visitor data) are never part of this list.
  const existing = await db.collection(name).get();
  if (!existing.empty) {
    const deleteBatch = db.batch();
    existing.docs.forEach((doc) => deleteBatch.delete(doc.ref));
    await deleteBatch.commit();
  }

  const batch = db.batch();
  items.forEach((item) => {
    const ref = db.collection(name).doc();
    batch.set(ref, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  });
  await batch.commit();
  console.log(`Seeded ${items.length} documents into "${name}" (cleared ${existing.size} existing)`);
}

async function main() {
  await seedCollection("departments", departments);
  await seedCollection("doctors", doctors);
  await seedCollection("testimonials", testimonials);
  await seedCollection("articles", articles);
  await seedCollection("events", events);
  await seedCollection("careers", careers);
  await seedCollection("healthPackages", healthPackages);
  console.log("Seeding complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
