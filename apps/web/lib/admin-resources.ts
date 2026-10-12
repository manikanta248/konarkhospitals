import type { FieldConfig } from "@/components/admin/fields";

export const DOCTOR_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true, placeholder: "dr-jane-doe" },
  { type: "text", name: "name", label: "Full Name", required: true },
  { type: "image", name: "photo", label: "Doctor photo", help: "Square or portrait photo works best, JPG or PNG, up to 10 MB." },
  { type: "text", name: "departmentSlug", label: "Department Slug", required: true },
  { type: "text", name: "departmentName", label: "Department Name", required: true },
  { type: "text", name: "qualifications", label: "Qualifications" },
  { type: "text", name: "designation", label: "Designation" },
  { type: "number", name: "experienceYears", label: "Experience (Years)" },
  { type: "text", name: "specialization", label: "Specialization" },
  { type: "textarea", name: "bio", label: "Bio", rows: 4 },
  { type: "list", name: "languages", label: "Languages" },
  { type: "json", name: "availability", label: "Availability", hint: '[{"day":"Mon-Sat","slots":"11 AM - 3 PM"}]', rows: 3 },
  { type: "checkbox", name: "featured", label: "Featured on homepage" },
  { type: "number", name: "order", label: "Display Order" },
];

export const DEPARTMENT_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true },
  { type: "text", name: "name", label: "Name", required: true },
  { type: "text", name: "shortDescription", label: "Short Description" },
  { type: "textarea", name: "description", label: "Full Description", rows: 5 },
  { type: "image", name: "heroImage", label: "Page banner image", help: "Wide landscape photo works best, up to 10 MB." },
  { type: "list", name: "services", label: "Services" },
  { type: "list", name: "conditionsTreated", label: "Conditions Treated" },
  { type: "list", name: "procedures", label: "Procedures" },
  { type: "json", name: "faqs", label: "FAQs", hint: '[{"question":"...","answer":"..."}]', rows: 3 },
  { type: "number", name: "order", label: "Display Order" },
];

export const ARTICLE_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true },
  {
    type: "select",
    name: "type",
    label: "Type",
    options: [
      { value: "article", label: "Health Article" },
      { value: "disease", label: "Disease Information" },
      { value: "treatment-guide", label: "Treatment Guide" },
      { value: "video", label: "Video" },
      { value: "news", label: "News" },
    ],
  },
  { type: "text", name: "title", label: "Title", required: true },
  { type: "text", name: "summary", label: "Summary" },
  { type: "textarea", name: "content", label: "Content", rows: 8 },
  { type: "image", name: "coverImage", label: "Cover image", help: "Landscape 16:9 photo works best, up to 10 MB." },
  { type: "video", name: "videoUrl", label: "Video file (for video type)", help: "MP4 or WebM, up to 200 MB." },
  { type: "text", name: "author", label: "Author" },
  { type: "list", name: "tags", label: "Tags" },
  { type: "text", name: "publishedAt", label: "Published Date", placeholder: "YYYY-MM-DDTHH:mm:ss.000Z" },
];

export const TESTIMONIAL_FIELDS: FieldConfig[] = [
  { type: "text", name: "patientName", label: "Patient Name", required: true },
  { type: "text", name: "photo", label: "Photo URL (leave blank for initials avatar)" },
  { type: "textarea", name: "quote", label: "Quote", rows: 4, required: true },
  { type: "text", name: "departmentSlug", label: "Department Slug" },
  { type: "number", name: "rating", label: "Rating (1-5)" },
];

export const TESTIMONIAL_VIDEO_FIELDS: FieldConfig[] = [
  { type: "text", name: "patientName", label: "Patient Name (optional)" },
  { type: "image", name: "posterUrl", label: "Thumbnail image", required: true, help: "Shown before the video plays. Portrait or square works best." },
  { type: "video", name: "videoUrl", label: "Video file", required: true, help: "MP4 or WebM, up to 200 MB." },
  { type: "number", name: "order", label: "Display Order" },
];

export const EVENT_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true },
  { type: "text", name: "title", label: "Title", required: true },
  { type: "text", name: "summary", label: "Summary" },
  { type: "text", name: "date", label: "Date", placeholder: "YYYY-MM-DD" },
  { type: "text", name: "location", label: "Location" },
  { type: "image", name: "coverImage", label: "Cover image", help: "Landscape 16:9 photo works best, up to 10 MB." },
];

export const CAREER_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true },
  { type: "text", name: "title", label: "Job Title", required: true },
  { type: "text", name: "department", label: "Department" },
  { type: "text", name: "location", label: "Location" },
  { type: "text", name: "type", label: "Employment Type", placeholder: "Full-time" },
  { type: "text", name: "experience", label: "Experience Required" },
  { type: "textarea", name: "description", label: "Description", rows: 4 },
  { type: "list", name: "responsibilities", label: "Responsibilities" },
  { type: "list", name: "requirements", label: "Requirements" },
  { type: "text", name: "postedAt", label: "Posted Date", placeholder: "YYYY-MM-DDTHH:mm:ss.000Z" },
  { type: "checkbox", name: "active", label: "Active (visible on site)" },
];

export const HEALTH_PACKAGE_FIELDS: FieldConfig[] = [
  { type: "text", name: "slug", label: "Slug", required: true },
  { type: "text", name: "name", label: "Package Name", required: true },
  { type: "textarea", name: "description", label: "Description", rows: 3 },
  { type: "number", name: "price", label: "Price (₹)" },
  { type: "list", name: "inclusions", label: "Inclusions" },
  { type: "image", name: "image", label: "Package image" },
  { type: "number", name: "order", label: "Display Order" },
];

export const CHAT_KNOWLEDGE_FIELDS: FieldConfig[] = [
  { type: "text", name: "question", label: "Question / Topic", required: true, placeholder: "Do you accept cashless insurance?" },
  { type: "textarea", name: "answer", label: "Answer", rows: 4, required: true },
  { type: "number", name: "order", label: "Display Order" },
];
