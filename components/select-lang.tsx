import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectLang() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="js">JavaScript</SelectItem>
          <SelectItem value="ts">TypeScript</SelectItem>
          <SelectItem value="py">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
