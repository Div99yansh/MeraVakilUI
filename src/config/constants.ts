export const APP_NAME = import.meta.env.VITE_APP_NAME || "LegalDraft";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  plaint: "Plaint",
  "written-statement": "Written Statement",
  notice: "Notice",
  affidavit: "Affidavit",
};

export const NATURE_OF_DISPUTE_OPTIONS = [
  { value: "civil", label: "Civil" },
  { value: "criminal", label: "Criminal" },
  { value: "commercial", label: "Commercial" },
  { value: "property", label: "Property" },
  { value: "family", label: "Family" },
  { value: "labour", label: "Labour" },
  { value: "other", label: "Other" },
];

export const NOTICE_TYPE_OPTIONS = [
  { value: "legal", label: "Legal Notice" },
  { value: "termination", label: "Termination Notice" },
  { value: "demand", label: "Demand Notice" },
  { value: "eviction", label: "Eviction Notice" },
  { value: "other", label: "Other" },
];

export const AFFIDAVIT_PURPOSE_OPTIONS = [
  { value: "general", label: "General Affidavit" },
  { value: "verification", label: "Verification of Facts" },
  { value: "identity", label: "Identity Proof" },
  { value: "support", label: "Support Document" },
  { value: "other", label: "Other" },
];

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
};
