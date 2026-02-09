import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  if (!dateStr) return "";
  // Ensure correct timezone handling if needed, but for display simplicity:
  const date = new Date(dateStr + "T12:00:00"); // Avoid timezone shifts with simple dates
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T12:00:00");
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  }).format(date);
}
