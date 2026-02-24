"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { SelectLang } from "@/components/select-lang";
import { Button } from "@/components/ui/button";
import { Result } from "@/components/result";
import { Language, LANGUAGE_OPTIONS } from "@/shared/schemas/submission";
import { trpc } from "@/server/services/trpc";
import { errorHandler } from "@/trpc/utils";

export default function Page() {
  const [userInput, setUserInput] = useState('');
  const [lang, setLang] = useState<Language>(
    LANGUAGE_OPTIONS[0]
  );

  const utils = trpc.useUtils();

  const { data, isPending, error, mutate } = trpc.create.useMutation({
    onSuccess: () => utils.getAll.invalidate()
  });

  const onClick = () => {
    mutate({ code: userInput, language: lang });
  }

  return <main className="flex flex-col items-center p-4 md:p-16 bg-zinc-200 text-zinc-700">
    <h1 className="text-4xl font-bold text-center">Code Review Mentor</h1>
    <div className='m-6'>
      <SelectLang setLang={setLang} />
    </div>
    <CodeEditor lang={lang} userInput={userInput} setUserInput={setUserInput} />
    <div className='pt-6'>
      <Button className='active:scale-[0.96]' onClick={onClick} disabled={isPending}>
        {isPending ? 'Reviewing...' : 'Review code'}
      </Button>
    </div>
    <Result isLoading={isPending} error={error && errorHandler(error)} completion={data?.feedback ?? ''} />
  </main>
}