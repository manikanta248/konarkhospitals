export interface Department {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  services: string[];
  conditionsTreated: string[];
  procedures: string[];
  faqs: { question: string; answer: string }[];
  order: number;
  /** True for departments that are outpatient (OPD) consultation only, with no inpatient/surgical admission at this hospital. */
  opdOnly?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  photo: string;
  departmentSlug: string;
  departmentName: string;
  qualifications: string;
  designation: string;
  experienceYears: number;
  specialization: string;
  bio: string;
  languages: string[];
  availability: { day: string; slots: string }[];
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ArticleType = "article" | "disease" | "treatment-guide" | "video" | "news";

export interface Article {
  id: string;
  slug: string;
  type: ArticleType;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  videoUrl?: string;
  author?: string;
  tags: string[];
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HospitalEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  location: string;
  coverImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  photo: string;
  quote: string;
  departmentSlug?: string;
  rating: number;
  createdAt?: string;
}

export interface HealthPackage {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  inclusions: string[];
  image: string;
  order: number;
}

export interface CareerPosting {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
  active: boolean;
}

export type SubmissionStatus = "new" | "contacted" | "resolved";

export interface AppointmentSubmission {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  departmentSlug?: string;
  doctorSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  type: "appointment" | "consultation" | "second-opinion" | "international";
  status: SubmissionStatus;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  feedback?: "up" | "down";
}

export type ChatOutcome = "active" | "answered" | "booked" | "abandoned" | "emergency";

export interface ChatKnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatbotSettings {
  enabled: boolean;
  quickReplies: string[];
}

export interface ChatLog {
  id: string;
  sessionId: string;
  messages: ChatMessage[];
  outcome: ChatOutcome;
  emergencyTriggered: boolean;
  appointmentId?: string;
  ip?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: "superadmin" | "editor";
}
