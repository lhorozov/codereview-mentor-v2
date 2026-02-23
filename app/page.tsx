"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { CodeEditor } from "@/components/code-editor";
import { SelectLang } from "@/components/select-lang";
import { Button } from "@/components/ui/button";
import { Result } from "@/components/result";
import { Language, LANGUAGE_OPTIONS } from "@/shared/schemas/submission";

export default function Page() {
  const [userInput, setUserInput] = useState('');
  const [lang, setLang] = useState<Language>(
    LANGUAGE_OPTIONS[0]
  );
  const [error, setError] = useState('');

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/completion',
    onError: (e) => {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  });

  const onClick = async () => {
    setError('');
    await complete(userInput, {
      body: {
        language: lang
      }
    });
  }

  return <main className="flex flex-col items-center p-4 md:p-16 bg-zinc-200 text-zinc-700">
    <h1 className="text-4xl font-bold text-center">Code Review Mentor</h1>
    <div className='m-6'>
      <SelectLang setLang={setLang} />
    </div>
    <CodeEditor lang={lang} userInput={userInput} setUserInput={setUserInput} />
    <div className='pt-6'>
      <Button className='active:scale-[0.96]' onClick={onClick} disabled={!!!userInput}>
        Review code
      </Button>
    </div>
    <Result isLoading={isLoading} error={error} completion={completion} />
  </main>
}