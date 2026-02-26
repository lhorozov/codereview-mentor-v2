'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Language, LANGUAGE_LABELS, LANGUAGE_OPTIONS } from "@/shared/schemas/submission";

interface SelectLangProps {
  setLang: (lang: Language) => void;
}

export function SelectLang({ setLang }: SelectLangProps) {
  return (
    <Select onValueChange={setLang}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {LANGUAGE_OPTIONS.map((value) => (
            <SelectItem key={value} value={value}>
              {LANGUAGE_LABELS[value]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
