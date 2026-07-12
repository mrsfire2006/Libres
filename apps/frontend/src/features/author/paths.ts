import type { AllowedApiRoutes } from "@/schemas/api-schema";

export const APIAUTHORROUTES = {
  UPLOAD: "book/upload",
  BOOKBIO: "book/bookbio",
  AUTHORBOOKS: "book/authorbooks",
  EDITAUTHORBOOK: "book/edit",
} satisfies Record<string, AllowedApiRoutes>;

export const AUTHORROUTES = {
  AUTHORDASHBOARD: "/author",
};
