// Static fallback content shown until the API/Firestore is seeded and reachable, so pages
// render fully during local development. Slugs match the seed data in apps/api exactly,
// so once the backend is live this fallback is simply superseded — no page code changes.
// Image paths point to real assets recovered from konarkhospitals.com (apps/web/public/images);
// anything missing is left "" so the UI falls back to a branded placeholder, never a random photo.
import type { Article, CareerPosting, Department, Doctor, HealthPackage, HospitalEvent, Testimonial } from "@konark/shared";
import { DOCTOR_PHOTOS } from "./doctor-photos";

export const FALLBACK_DEPARTMENTS: Department[] = [
  {
    id: "d1", slug: "cardiology", name: "Cardiology", order: 1, opdOnly: true,
    shortDescription: "Comprehensive heart care from diagnostics to advanced cardiac procedures.",
    description: "Konark Hospitals' Cardiology department delivers complete cardiac care — from routine screening and ECG/echo diagnostics to management of coronary artery disease, hypertension, arrhythmia and heart failure. Our physicians work closely with the emergency and critical care teams to ensure rapid response for cardiac emergencies.",
    heroImage: "/images/departments/cardiology.jpg",
    services: ["ECG & Echocardiography", "Cardiac Risk Screening", "Hypertension Management", "Arrhythmia Care", "Post-cardiac Rehabilitation"],
    conditionsTreated: ["Coronary Artery Disease", "Hypertension", "Arrhythmia", "Heart Failure", "Angina"],
    procedures: ["ECG", "2D Echo", "TMT (Treadmill Test)", "Holter Monitoring"],
    faqs: [
      { question: "When should I get a cardiac screening done?", answer: "We recommend a baseline screening from age 30 onward, or earlier if you have a family history of heart disease, diabetes, or hypertension." },
      { question: "Is emergency cardiac care available 24/7?", answer: "Yes — our emergency and critical care teams work alongside the cardiology department around the clock." },
    ],
  },
  {
    id: "d2", slug: "neurology", name: "Neurology", order: 2, opdOnly: true,
    shortDescription: "Expert diagnosis and treatment for disorders of the brain, spine and nervous system.",
    description: "Our Neurology team manages the full spectrum of neurological conditions including stroke, epilepsy, headaches, and neuromuscular disorders, supported by round-the-clock emergency neurology care and rehabilitation services.",
    heroImage: "/images/departments/neurology.jpg",
    services: ["Stroke Management", "Epilepsy Care", "Headache & Migraine Clinic", "Nerve Conduction Studies"],
    conditionsTreated: ["Stroke", "Epilepsy", "Migraine", "Peripheral Neuropathy", "Parkinson's Disease"],
    procedures: ["EEG", "Nerve Conduction Study", "EMG"],
    faqs: [
      { question: "What are the warning signs of a stroke?", answer: "Sudden numbness or weakness (especially one-sided), confusion, trouble speaking, vision problems, or loss of balance — seek emergency care immediately if these occur." },
    ],
  },
  {
    id: "d3", slug: "orthopaedics", name: "Orthopaedics", order: 3,
    shortDescription: "Trauma care, joint replacement and sports injury treatment by experienced surgeons.",
    description: "The Orthopaedics department, led by experienced trauma and joint-replacement surgeons, treats fractures, degenerative joint disease, and sports injuries with both surgical and non-surgical approaches, followed by structured physiotherapy.",
    heroImage: "/images/departments/orthopaedics.jpg",
    services: ["Joint Replacement Surgery", "Trauma & Fracture Care", "Arthroscopy", "Sports Injury Clinic", "Physiotherapy"],
    conditionsTreated: ["Fractures", "Osteoarthritis", "Ligament Injuries", "Spine Disorders"],
    procedures: ["Total Knee Replacement", "Hip Replacement", "Arthroscopic Surgery"],
    faqs: [
      { question: "How long is recovery after a knee replacement?", answer: "Most patients begin walking with support within 24–48 hours and return to normal daily activity in 6–12 weeks, with physiotherapy throughout." },
    ],
  },
  {
    id: "d4", slug: "fertility-ivf", name: "Fertility & IVF", order: 4,
    shortDescription: "Advanced fertility treatments including IVF and IUI by our most experienced specialist.",
    description: "Konark Hospitals is recognised as one of Hyderabad's leading fertility centres, offering IVF, IUI and comprehensive infertility evaluation under the care of a fertility specialist with close to three decades of experience in obstetrics and gynaecology.",
    heroImage: "/images/departments/fertility-ivf.jpg",
    services: ["IVF (In-Vitro Fertilization)", "IUI (Intrauterine Insemination)", "Fertility Evaluation", "High-risk Pregnancy Care"],
    conditionsTreated: ["Infertility", "PCOS", "Recurrent Miscarriage"],
    procedures: ["IVF Cycle", "IUI", "Ovulation Induction"],
    faqs: [
      { question: "How successful is IVF at Konark Hospitals?", answer: "Success rates vary by age and individual diagnosis — our fertility specialist will walk you through realistic expectations at your first consultation." },
      { question: "How long does one IVF cycle take?", answer: "A typical IVF cycle takes about 4–6 weeks from ovarian stimulation through embryo transfer." },
    ],
  },
  {
    id: "d5", slug: "gynecology", name: "Gynecology & Obstetrics", order: 5,
    shortDescription: "Complete women's health care from pregnancy through every life stage.",
    description: "Our Gynaecology & Obstetrics team manages normal and high-risk pregnancies, deliveries, and gynaecological surgeries, including complex cases such as placenta accreta and broad ligament fibroid removal.",
    heroImage: "/images/departments/gynecology.jpg",
    services: ["Antenatal Care", "High-risk Pregnancy Management", "Normal & Caesarean Delivery", "Gynaecological Surgery"],
    conditionsTreated: ["High-risk Pregnancy", "Fibroids", "PCOS", "Menstrual Disorders"],
    procedures: ["Delivery Care", "Laparoscopic Gynae Surgery", "Hysterectomy"],
    faqs: [
      { question: "What makes a pregnancy \"high-risk\"?", answer: "Factors like maternal age, pre-existing conditions (diabetes, hypertension), multiple pregnancy, or prior complications can classify a pregnancy as high-risk, requiring closer monitoring." },
    ],
  },
  {
    id: "d6", slug: "paediatrics", name: "Paediatrics & Neonatology", order: 6,
    shortDescription: "Specialised care for newborns, infants and children.",
    description: "The Paediatrics & Neonatology unit provides newborn care, vaccination, growth monitoring and treatment for common and complex childhood illnesses, with neonatal support for high-risk deliveries.",
    heroImage: "/images/departments/paediatrics.jpg",
    services: ["Newborn Care", "Vaccination", "Growth & Development Monitoring", "Neonatal Intensive Care"],
    conditionsTreated: ["Neonatal Jaundice", "Respiratory Infections", "Growth Disorders"],
    procedures: ["NICU Care", "Well-baby Checkups"],
    faqs: [
      { question: "Do you offer a full childhood vaccination schedule?", answer: "Yes — we follow the recommended national immunisation schedule and can guide you through catch-up vaccinations if needed." },
    ],
  },
  {
    id: "d7", slug: "urology", name: "Urology", order: 7,
    shortDescription: "Diagnosis and treatment of urinary tract and male reproductive conditions.",
    description: "Our Urology & Andrology specialists treat kidney stones, prostate disorders and urinary tract conditions using both minimally invasive and conventional techniques.",
    heroImage: "/images/departments/urology.jpg",
    services: ["Kidney Stone Treatment", "Prostate Care", "Andrology", "Urinary Tract Surgery"],
    conditionsTreated: ["Kidney Stones", "Prostate Enlargement", "UTI", "Male Infertility"],
    procedures: ["Endoscopic Stone Removal", "Cystoscopy"],
    faqs: [
      { question: "Is kidney stone treatment always surgical?", answer: "No — smaller stones often pass with medication and hydration. Larger or recurrent stones may need endoscopic removal, which our team performs using minimally invasive techniques." },
    ],
  },
  {
    id: "d8", slug: "pulmonology", name: "Pulmonology", order: 8, opdOnly: true,
    shortDescription: "Comprehensive respiratory and lung care for acute and chronic conditions.",
    description: "The Pulmonology department diagnoses and manages asthma, COPD, and other respiratory conditions using pulmonary function testing and evidence-based treatment protocols.",
    heroImage: "/images/departments/pulmonology.jpg",
    services: ["Pulmonary Function Testing", "Asthma & COPD Clinic", "Sleep Apnea Evaluation"],
    conditionsTreated: ["Asthma", "COPD", "Pneumonia", "Sleep Apnea"],
    procedures: ["Spirometry", "Bronchoscopy"],
    faqs: [
      { question: "How is asthma different from COPD?", answer: "Asthma is typically reversible airway inflammation often starting in childhood, while COPD is progressive and most common in long-term smokers — both are managed differently, so an accurate diagnosis matters." },
    ],
  },
  {
    id: "d9", slug: "general-medicine", name: "General Medicine", order: 9, opdOnly: true,
    shortDescription: "Outpatient consultation and management of everyday illness and chronic conditions.",
    description: "Our General Medicine consultants manage a wide range of everyday health concerns — from fever, infections and diabetes to hypertension and chronic disease follow-up — with a focus on accurate diagnosis and timely referral to specialists when needed.",
    heroImage: "/images/departments/general-medicine.jpg",
    services: ["General Health Consultation", "Diabetes & Hypertension Management", "Chronic Disease Follow-up", "Preventive Health Advice"],
    conditionsTreated: ["Fever & Infections", "Diabetes", "Hypertension", "Thyroid Disorders"],
    procedures: ["Routine Health Screening", "Chronic Disease Monitoring"],
    faqs: [],
  },
  {
    id: "d10", slug: "plastic-surgery-cosmetology", name: "Plastic Surgery & Cosmetology", order: 10,
    shortDescription: "Reconstructive and cosmetic surgery for trauma, post-surgical and aesthetic needs.",
    description: "Our Plastic & Reconstructive Surgery team performs both reconstructive procedures — following trauma, burns or tumor surgery — and cosmetic procedures, combining surgical precision with an emphasis on natural-looking results.",
    heroImage: "/images/departments/plastic-surgery-cosmetology.jpg",
    services: ["Reconstructive Surgery", "Post-trauma & Post-tumor Reconstruction", "Cosmetic Surgery", "Burn Care"],
    conditionsTreated: ["Post-traumatic Deformities", "Burn Injuries", "Congenital Anomalies"],
    procedures: ["Reconstructive Flap Surgery", "Scar Revision", "Cosmetic Procedures"],
    faqs: [],
  },
  {
    id: "d11", slug: "ent", name: "ENT", order: 11,
    shortDescription: "Diagnosis and treatment of ear, nose, throat and related head & neck conditions.",
    description: "Our ENT (Ear, Nose & Throat) specialists treat conditions ranging from chronic sinus issues and hearing problems to snoring and voice disorders, using both medical and surgical approaches.",
    heroImage: "/images/departments/ent.jpg",
    services: ["Sinus & Snoring Surgery", "Hearing Evaluation", "Rhino-Laryngology", "Ear Infection Treatment"],
    conditionsTreated: ["Sinusitis", "Hearing Loss", "Tonsillitis", "Voice Disorders"],
    procedures: ["Endoscopic Sinus Surgery", "Tonsillectomy"],
    faqs: [],
  },
  {
    id: "d12", slug: "physiotherapy", name: "Physiotherapy", order: 12,
    shortDescription: "Rehabilitation and physical therapy for post-surgical and injury recovery.",
    description: "Our physiotherapy team supports recovery after surgery, injury or illness with individualised rehabilitation plans, working closely with our Orthopaedics and other specialist departments.",
    heroImage: "/images/departments/physiotherapy.jpg",
    services: ["Post-surgical Rehabilitation", "Sports Injury Recovery", "Pain Management Therapy", "Mobility Training"],
    conditionsTreated: ["Post-operative Stiffness", "Back & Joint Pain", "Sports Injuries"],
    procedures: ["Manual Therapy", "Therapeutic Exercise"],
    faqs: [],
  },
  {
    id: "d13", slug: "vascular-surgery", name: "Vascular & Endovascular Surgery", order: 13,
    shortDescription: "Diagnosis and surgical treatment of blood vessel conditions.",
    description: "Our Vascular Surgery team treats conditions affecting arteries and veins using both open surgical and minimally invasive endovascular techniques.",
    heroImage: "/images/departments/vascular-surgery.jpg",
    services: ["Varicose Vein Treatment", "Peripheral Vascular Disease Management", "Endovascular Procedures"],
    conditionsTreated: ["Varicose Veins", "Peripheral Artery Disease", "Deep Vein Thrombosis"],
    procedures: ["Endovascular Surgery", "Vascular Bypass"],
    faqs: [],
  },
];

const OPD_SLOTS = [
  { day: "Mon – Sat", slots: "10:00 AM – 3:00 PM" },
  { day: "Mon – Sat", slots: "6:00 PM – 8:00 PM" },
];

// featured = true is reserved for doctors we have a real recovered photo for (see
// lib/doctor-photos.ts), so the homepage doesn't mix real headshots with placeholders.
export const FALLBACK_DOCTORS: Doctor[] = [
  { id: "doc1", slug: "dr-t-rajani-ashok", name: "Dr. T. Rajani Ashok", photo: DOCTOR_PHOTOS["dr-t-rajani-ashok"] ?? "", departmentSlug: "fertility-ivf", departmentName: "Fertility & IVF", qualifications: "MD (Obs & Gynae)", designation: "Senior Fertility Specialist", experienceYears: 30, specialization: "Fertility, IVF & High-risk Obstetrics", bio: "Dr. T. Rajani Ashok brings close to three decades of experience in obstetrics, gynaecology and fertility care, and has led some of Konark Hospitals' most complex deliveries and fertility treatments.", languages: ["English", "Telugu", "Hindi"], availability: OPD_SLOTS, featured: true, order: 1 },
  { id: "doc2", slug: "dr-dv-srinivas", name: "Dr. D.V. Srinivas", photo: "", departmentSlug: "general-medicine", departmentName: "General Medicine", qualifications: "MBBS, MD (General Medicine)", designation: "Consultant Physician", experienceYears: 16, specialization: "General Medicine & Cardiac Care", bio: "Dr. D.V. Srinivas is a consultant physician with 16 years of experience managing chronic illness, cardiac risk and internal medicine cases.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: false, order: 2 },
  { id: "doc4", slug: "dr-sakina-kousar", name: "Dr. Sakina Kousar", photo: "", departmentSlug: "gynecology", departmentName: "Gynecology & Obstetrics", qualifications: "DGO", designation: "Consultant Obstetrician & Gynaecologist", experienceYears: 12, specialization: "High-risk Pregnancy & Infertility", bio: "Dr. Sakina Kousar focuses on high-risk pregnancy management and infertility treatment, with experience handling complex obstetric emergencies.", languages: ["English", "Telugu", "Urdu"], availability: OPD_SLOTS, featured: false, order: 4 },
  { id: "doc5", slug: "dr-deepak", name: "Dr. Deepak", photo: DOCTOR_PHOTOS["dr-deepak"] ?? "", departmentSlug: "urology", departmentName: "Urology", qualifications: "MS, MCh (Urology)", designation: "Urologist & Andrologist", experienceYears: 10, specialization: "Urology & Andrology", bio: "Dr. Deepak treats a wide range of urological and andrological conditions using minimally invasive techniques.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: true, order: 5 },
  { id: "doc6", slug: "dr-manjari-singh", name: "Dr. Manjari Singh", photo: DOCTOR_PHOTOS["dr-manjari-singh"] ?? "", departmentSlug: "gynecology", departmentName: "Gynecology & Obstetrics", qualifications: "DMRE", designation: "Consultant Radiologist", experienceYears: 20, specialization: "Obstetric & Gynaecological Ultrasound", bio: "Dr. Manjari Singh has 20 years of experience in obstetric and gynaecological ultrasound imaging, supporting accurate prenatal diagnosis.", languages: ["English", "Hindi"], availability: OPD_SLOTS, featured: true, order: 6 },
  { id: "doc7", slug: "dr-p-ramesh", name: "Dr. P. Ramesh", photo: DOCTOR_PHOTOS["dr-p-ramesh"] ?? "", departmentSlug: "plastic-surgery-cosmetology", departmentName: "Plastic Surgery & Cosmetology", qualifications: "MS, MCh (Plastic Surgery)", designation: "Plastic & Reconstructive Surgeon", experienceYears: 15, specialization: "Plastic, Reconstructive & Cosmetic Surgery", bio: "Dr. P. Ramesh performs reconstructive and cosmetic procedures, including complex reconstructions following trauma and tumor surgery.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: true, order: 7 },
  { id: "doc8", slug: "dr-shashikanth", name: "Dr. Shashikanth", photo: "", departmentSlug: "ent", departmentName: "ENT", qualifications: "MS (ENT)", designation: "ENT Surgeon", experienceYears: 13, specialization: "Sinus & Snoring Surgery", bio: "Dr. Shashikanth specialises in ENT surgery with a focus on sinus disorders and snoring/sleep-related airway surgery.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: true, order: 8 },
  { id: "doc9", slug: "dr-b-murali-mohan", name: "Dr. B. Murali Mohan", photo: "", departmentSlug: "pulmonology", departmentName: "Pulmonology", qualifications: "MD (Pulmonology)", designation: "Consultant Pulmonologist", experienceYears: 11, specialization: "Respiratory & Lung Care", bio: "Dr. B. Murali Mohan manages acute and chronic respiratory conditions including asthma, COPD and sleep apnea.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: false, order: 9 },
  { id: "doc10", slug: "dr-c-chandra-sekar", name: "Dr. C. Chandra Sekar", photo: "", departmentSlug: "vascular-surgery", departmentName: "Vascular & Endovascular Surgery", qualifications: "MS, MCh (Vascular Surgery)", designation: "Vascular Surgeon", experienceYears: 18, specialization: "Vascular & Endovascular Surgery", bio: "Dr. C. Chandra Sekar treats vascular conditions using both open and endovascular surgical techniques.", languages: ["English", "Tamil", "Telugu"], availability: OPD_SLOTS, featured: false, order: 10 },
  { id: "doc11", slug: "dr-g-ramcharan", name: "Dr. G. Ramcharan", photo: DOCTOR_PHOTOS["dr-g-ramcharan"] ?? "", departmentSlug: "physiotherapy", departmentName: "Physiotherapy", qualifications: "BPT, MPT", designation: "Chief Physiotherapist", experienceYears: 12, specialization: "Orthopaedic Rehabilitation", bio: "Dr. G. Ramcharan leads the physiotherapy and rehabilitation program supporting post-surgical and injury recovery.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: false, order: 11 },
  { id: "doc12", slug: "dr-n-satish-kumar", name: "Dr. N. Satish Kumar", photo: "", departmentSlug: "ent", departmentName: "ENT", qualifications: "MS (ENT)", designation: "ENT & Rhino-Laryngology Specialist", experienceYears: 14, specialization: "Rhino-Laryngology", bio: "Dr. N. Satish Kumar specialises in nose, throat and voice-box disorders and related surgical care.", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: false, order: 12 },
  // Added per client request — full qualifications/experience/bio pending from the hospital; edit via the admin panel once available.
  { id: "doc13", slug: "dr-venkat-ram-reddy", name: "Dr. Venkat Ram Reddy", photo: "", departmentSlug: "orthopaedics", departmentName: "Orthopaedics", qualifications: "", designation: "Orthopaedic Surgeon", experienceYears: 0, specialization: "Orthopaedics", bio: "", languages: ["English", "Telugu"], availability: OPD_SLOTS, featured: true, order: 13 },
];

// No real patient photos exist for these (illustrative testimonials) — TestimonialsSection
// renders initials avatars, so `photo` is left blank intentionally.
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: "t1", patientName: "Lakshmi Reddy", photo: "", quote: "The maternity team at Konark made a high-risk pregnancy feel safe every step of the way. Forever grateful.", departmentSlug: "gynecology", rating: 5 },
  { id: "t2", patientName: "Ravi Kumar", photo: "", quote: "Excellent orthopaedic care after my accident — the surgery and physiotherapy team got me walking again.", departmentSlug: "orthopaedics", rating: 5 },
  { id: "t3", patientName: "Fathima Begum", photo: "", quote: "Our IVF journey finally succeeded thanks to Dr. Rajani Ashok and her team's patience and expertise.", departmentSlug: "fertility-ivf", rating: 5 },
  { id: "t4", patientName: "Srinivas Rao", photo: "", quote: "Prompt emergency response and attentive cardiac care — couldn't have asked for better treatment for my father.", departmentSlug: "cardiology", rating: 5 },
  { id: "t5", patientName: "Anitha Kumari", photo: "", quote: "The paediatric team was so patient with my daughter. They explained everything and made her comfortable throughout.", departmentSlug: "paediatrics", rating: 5 },
  { id: "t6", patientName: "Mohammed Ali", photo: "", quote: "Quick diagnosis and minimally invasive treatment for my kidney stones — back on my feet within days.", departmentSlug: "urology", rating: 4 },
];

// Editorial content written for this site (the live site's blog had no published posts to
// carry over). Cover images reuse real department/facility photos where topically relevant,
// rather than unrelated stock photography — video posts have no videoUrl until a real one
// is uploaded, so the page shows a "coming soon" placeholder instead of embedding anything.
export const FALLBACK_ARTICLES: Article[] = [
  {
    id: "a1", slug: "understanding-high-risk-pregnancy", type: "article",
    title: "Understanding High-Risk Pregnancy: What Every Mother Should Know",
    summary: "Signs, causes, and how specialist care improves outcomes for high-risk pregnancies.",
    content:
      "A pregnancy is generally classified as \"high-risk\" when there's an increased chance of complications for the mother, the baby, or both. Common factors include maternal age (under 17 or over 35), pre-existing conditions like diabetes or hypertension, carrying multiples, or a history of pregnancy complications.\n\nThe good news is that being classified as high-risk doesn't mean something will go wrong — it means your care team will monitor you more closely. At Konark Hospitals, high-risk pregnancies are managed with more frequent check-ups, additional screening (like detailed ultrasounds and blood work), and a clear plan for delivery that accounts for your specific risk factors.\n\nWhat can you do? Attend every scheduled antenatal visit, even when you're feeling well — many high-risk indicators are only caught through routine screening. Keep your care team informed of any new symptoms, however minor they seem. And don't hesitate to ask questions; understanding your own risk factors is one of the best ways to feel in control of your pregnancy journey.\n\nOur Gynaecology & Obstetrics team has managed a wide range of high-risk cases, including complex deliveries, and works closely with neonatology to ensure both mother and baby receive coordinated care from day one.",
    coverImage: "/images/departments/gynecology.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["pregnancy", "gynecology"],
    publishedAt: "2026-06-12T00:00:00.000Z",
  },
  {
    id: "a2", slug: "managing-diabetes-and-heart-health", type: "article",
    title: "Managing Diabetes and Heart Health Together",
    summary: "Why cardiac risk assessment matters for diabetic patients.",
    content:
      "Diabetes and heart disease are closely linked — people with diabetes are roughly twice as likely to develop cardiovascular disease compared to those without it. High blood sugar over time can damage blood vessels and the nerves that control the heart, making regular cardiac screening an important part of diabetes management.\n\nAt Konark Hospitals, we recommend that diabetic patients get a baseline cardiac risk assessment (including blood pressure, cholesterol and an ECG) at diagnosis, and then annually thereafter, or more frequently if risk factors are present.\n\nSimple daily habits go a long way: consistent blood sugar monitoring, a diet low in processed sugar and sodium, regular physical activity, and staying on top of prescribed medications. If you notice symptoms like unusual fatigue, shortness of breath, or chest discomfort, don't wait for your next scheduled visit — these warrant prompt evaluation.\n\nOur Cardiology and General Medicine teams coordinate closely for diabetic patients, so your heart health and blood sugar management are never treated in isolation.",
    coverImage: "/images/departments/cardiology.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["cardiology", "diabetes"],
    publishedAt: "2026-05-28T00:00:00.000Z",
  },
  {
    id: "a3", slug: "coronary-artery-disease", type: "disease",
    title: "Coronary Artery Disease",
    summary: "Causes, symptoms, diagnosis and treatment of CAD.",
    content:
      "Coronary artery disease (CAD) occurs when the blood vessels supplying the heart muscle become narrowed or blocked, usually due to a buildup of fatty deposits called plaque. Over time, this restricts blood flow to the heart and can lead to chest pain (angina), heart attack, or heart failure.\n\nCommon risk factors include high blood pressure, high cholesterol, smoking, diabetes, obesity, a sedentary lifestyle, and a family history of heart disease. Symptoms can include chest pain or tightness, shortness of breath, fatigue, and discomfort in the arms, neck, jaw or back — though some people, particularly those with diabetes, may have few or no obvious symptoms until a serious event occurs.\n\nDiagnosis typically starts with an ECG and may include an echocardiogram, treadmill stress test, or more advanced imaging depending on findings. Treatment ranges from lifestyle changes and medication to procedures that restore blood flow, depending on the severity and location of blockages.\n\nEarly detection makes a significant difference in outcomes, which is why we recommend regular cardiac screening for anyone with risk factors, even in the absence of symptoms.",
    coverImage: "/images/departments/cardiology.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["cardiology"],
    publishedAt: "2026-04-15T00:00:00.000Z",
  },
  {
    id: "a4", slug: "osteoarthritis", type: "disease",
    title: "Osteoarthritis",
    summary: "Understanding joint degeneration and treatment options.",
    content:
      "Osteoarthritis is the most common form of arthritis, occurring when the protective cartilage that cushions the ends of bones gradually wears down over time. It most often affects the knees, hips, hands and spine, and becomes more common with age — though injury, obesity and repetitive joint stress can accelerate it.\n\nSymptoms typically develop gradually and include joint pain that worsens with activity, stiffness (especially after rest or first thing in the morning), swelling, and a reduced range of motion. Unlike some other forms of arthritis, osteoarthritis isn't an autoimmune condition — it's primarily mechanical wear-and-tear, though genetics also play a role.\n\nManagement usually starts conservatively: weight management, low-impact exercise to strengthen supporting muscles, physiotherapy, and anti-inflammatory medication for flare-ups. When conservative measures no longer provide adequate relief, surgical options like joint replacement can restore mobility and significantly improve quality of life.\n\nOur Orthopaedics team assesses each case individually — there's rarely a one-size-fits-all answer, and treatment plans are tailored to your activity level, overall health and the severity of joint damage.",
    coverImage: "/images/departments/orthopaedics.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["orthopaedics"],
    publishedAt: "2026-03-20T00:00:00.000Z",
  },
  {
    id: "a5", slug: "knee-replacement-recovery-guide", type: "treatment-guide",
    title: "Knee Replacement: A Complete Recovery Guide",
    summary: "What to expect before, during and after knee replacement surgery.",
    content:
      "Knee replacement surgery replaces damaged joint surfaces with an artificial implant, most commonly to relieve pain from advanced osteoarthritis. Here's what the journey typically looks like.\n\nBefore surgery: your surgeon will review imaging, discuss anaesthesia options, and may recommend pre-surgical physiotherapy to strengthen the muscles around your knee, which can improve recovery outcomes.\n\nImmediately after surgery: most patients begin standing and walking with support within 24–48 hours — early mobilisation is one of the most important factors in a smooth recovery. You'll typically stay in hospital for a few days while pain is managed and your care team monitors for complications.\n\nThe first 6 weeks: physiotherapy becomes your main focus, with exercises to rebuild strength and range of motion. Some swelling and discomfort is normal during this period. Most patients can resume light daily activities within 3–6 weeks.\n\nLong-term recovery: full recovery, including a return to more demanding activities, typically takes 3–6 months. Most patients report significantly reduced pain and improved mobility compared to before surgery.\n\nOur physiotherapy team works alongside our orthopaedic surgeons throughout this journey, so your rehabilitation plan is coordinated from day one, not handed off after discharge.",
    coverImage: "/images/departments/orthopaedics.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["orthopaedics"],
    publishedAt: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "a6", slug: "ivf-process-explained", type: "treatment-guide",
    title: "The IVF Process, Step by Step",
    summary: "A clear walkthrough of the IVF treatment journey.",
    content:
      "In-vitro fertilization (IVF) can feel overwhelming to someone approaching it for the first time. Here's a clear breakdown of what the process typically involves.\n\nStep 1 — Ovarian stimulation: medication is used to stimulate the ovaries to produce multiple eggs (rather than the single egg released in a natural cycle), monitored through blood tests and ultrasounds over roughly 10–14 days.\n\nStep 2 — Egg retrieval: once eggs are mature, they're retrieved in a short outpatient procedure under sedation, typically taking 20–30 minutes.\n\nStep 3 — Fertilization: retrieved eggs are fertilized with sperm in the lab, either through conventional insemination or ICSI (a single sperm is injected directly into an egg), depending on your specific situation.\n\nStep 4 — Embryo development: fertilized eggs are monitored as they develop over 3–5 days, with our embryology team assessing quality to identify the strongest candidates for transfer.\n\nStep 5 — Embryo transfer: one or more embryos are placed into the uterus in a quick, generally painless procedure — no anaesthesia is usually required.\n\nStep 6 — The two-week wait: roughly two weeks after transfer, a blood test confirms whether the cycle has resulted in pregnancy.\n\nEvery patient's journey looks a little different, and our fertility specialist will walk you through what to expect for your specific case at your first consultation.",
    coverImage: "/images/departments/fertility-ivf.jpg",
    author: "Konark Hospitals Editorial Team",
    tags: ["fertility-ivf"],
    publishedAt: "2026-01-22T00:00:00.000Z",
  },
  {
    id: "a7", slug: "hospital-tour-video", type: "video",
    title: "Take a Tour of Konark Hospitals",
    summary: "A walkthrough of our facilities and infrastructure.",
    content: "A video tour of our operation theatres, ICU, NICU and patient wards will be published here soon.",
    coverImage: "",
    videoUrl: "",
    author: "Konark Hospitals Editorial Team",
    tags: ["infrastructure"],
    publishedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: "a8", slug: "konark-hosts-free-health-camp", type: "news",
    title: "Konark Hospitals Hosts Free Community Health Camp",
    summary: "Over 300 residents screened at our latest community outreach event.",
    content:
      "Konark Hospitals organised a free health screening camp for residents of Jeedimetla and surrounding areas, offering complimentary blood pressure, blood sugar and BMI checks. Over 300 residents attended, with our physicians on hand to offer guidance on follow-up care where needed.\n\nCommunity outreach remains a core part of our mission, in keeping with the founding trust's motto of serving the needy. We plan to hold similar camps regularly — keep an eye on this page for upcoming dates.",
    coverImage: "/images/facilities/general-wards.png",
    author: "Konark Hospitals Editorial Team",
    tags: ["events", "community"],
    publishedAt: "2026-07-10T00:00:00.000Z",
  },
];

export const FALLBACK_EVENTS: HospitalEvent[] = [
  { id: "e1", slug: "free-health-checkup-camp-2026", title: "Free Health Checkup Camp", summary: "Join us for free general health screening including BP, sugar and BMI checks.", date: "2026-09-05", location: "Konark Hospitals, Jeedimetla", coverImage: "/images/facilities/general-wards.png" },
  { id: "e2", slug: "world-heart-day-awareness-drive", title: "World Heart Day Awareness Drive", summary: "Free cardiac risk assessment camp in observance of World Heart Day.", date: "2026-09-29", location: "Konark Hospitals, Jeedimetla", coverImage: "/images/departments/cardiology.jpg" },
];

export const FALLBACK_CAREERS: CareerPosting[] = [
  {
    id: "c1", slug: "staff-nurse-icu", title: "Staff Nurse - ICU", department: "Nursing", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "2+ years",
    description: "We are looking for a dedicated ICU staff nurse to join our critical care team.",
    responsibilities: ["Monitor critically ill patients", "Administer medications", "Coordinate with physicians"],
    requirements: ["GNM/B.Sc Nursing", "ICU experience preferred", "Valid nursing registration"],
    postedAt: "2026-07-01T00:00:00.000Z", active: true,
  },
  {
    id: "c2", slug: "front-office-executive", title: "Front Office Executive", department: "Administration", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "1+ years",
    description: "Manage patient reception, appointment scheduling and front-desk operations.",
    responsibilities: ["Greet and register patients", "Schedule appointments", "Handle billing queries"],
    requirements: ["Graduate", "Good communication skills"],
    postedAt: "2026-06-20T00:00:00.000Z", active: true,
  },
  {
    id: "c3", slug: "duty-medical-officer", title: "Duty Medical Officer", department: "Medical", location: "Jeedimetla, Hyderabad", type: "Full-time", experience: "0-3 years",
    description: "MBBS graduate for round-the-clock emergency and inpatient coverage.",
    responsibilities: ["Attend to emergency cases", "Round on inpatients", "Coordinate with specialists"],
    requirements: ["MBBS with valid registration"],
    postedAt: "2026-07-15T00:00:00.000Z", active: true,
  },
];

export const FALLBACK_HEALTH_PACKAGES: HealthPackage[] = [
  { id: "p1", slug: "full-body-checkup-essential", name: "Full Body Checkup — Essential", description: "A comprehensive screening covering blood, cardiac and abdominal parameters.", price: 1999, inclusions: ["CBC (Complete Blood Count)", "Lipid Profile", "Blood Sugar (Fasting)", "ECG", "Abdomen Ultrasound", "Doctor Consultation"], image: "/images/facilities/general-wards.png", order: 1 },
  { id: "p2", slug: "womens-wellness-package", name: "Women's Wellness Package", description: "Focused screening for women's health including hormonal and gynae checks.", price: 2999, inclusions: ["CBC", "Thyroid Profile", "Pap Smear", "Pelvic Ultrasound", "Bone Density Screening", "Gynaecologist Consultation"], image: "/images/departments/gynecology.jpg", order: 2 },
  { id: "p3", slug: "cardiac-risk-package", name: "Cardiac Risk Package", description: "Assess your heart health with a focused cardiac screening panel.", price: 2499, inclusions: ["ECG", "2D Echo", "Lipid Profile", "TMT (Treadmill Test)", "Cardiologist Consultation"], image: "/images/departments/cardiology.jpg", order: 3 },
  { id: "p4", slug: "senior-citizen-checkup", name: "Senior Citizen Checkup", description: "A broader panel designed for comprehensive screening in patients above 55.", price: 3499, inclusions: ["CBC", "Lipid & Sugar Profile", "ECG & 2D Echo", "Kidney & Liver Function Tests", "Bone Density Screening", "Physician Consultation"], image: "/images/facilities/private-rooms.png", order: 4 },
];
