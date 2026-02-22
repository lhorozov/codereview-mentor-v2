'use client';

import { Lang } from "@/app/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectLangProps {
  setLang: React.Dispatch<React.SetStateAction<Lang>>
}

export function SelectLang({ setLang }: SelectLangProps) {
  return (
    <Select onValueChange={(lang: Lang) => setLang(lang)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
