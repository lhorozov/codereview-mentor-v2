"use client"

import CodeEditor from "@/components/code-editor";
import { SelectLang } from "@/components/select-lang";
import { Button } from "@/components/ui/button";

export default function Page() {
  return <main className="flex flex-col items-center p-6 bg-zinc-200 text-zinc-700">
    <h1 className="text-4xl font-bold">Code Review Mentor</h1>
    <div className='m-6'>
      <SelectLang />
    </div>
    <CodeEditor />
    <div className='pt-6'>
      <Button className='active:scale-[0.96]'>
        Review code
      </Button>
    </div>
  </main>
}