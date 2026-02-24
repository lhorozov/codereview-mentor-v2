import { z } from "zod";

const LANGUAGES = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
] as const;
export const LANGUAGE_OPTIONS = LANGUAGES.map(({ value }) => value);
export type Language = (typeof LANGUAGE_OPTIONS)[number];
export const LanguageSchema = z.enum(LANGUAGE_OPTIONS);
export const LANGUAGE_LABELS: Record<Language, string> = Object.fromEntries(LANGUAGES.map(({ value, label }) => [value, label])) as Record<Language, string>;