"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CodeEditor } from "@/components/code-editor";
import { SelectLang } from "@/components/select-lang";
import { Button } from "@/components/ui/button";
import { Result } from "@/components/result";
import { Language } from "@/shared/schemas/submission";
import { trpc } from "@/server/services/trpc";
import { errorHandler } from "@/trpc/utils";

export default function Page() {
  const [userInput, setUserInput] = useState('');
  const [lang, setLang] = useState<Language | undefined>();
  const [errors, setErrors] = useState({
    dropdown: ''
  });
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const utils = trpc.useUtils();

  const { data, isPending, error: mutationError, mutate, reset } = trpc.create.useMutation({
    onSuccess: () => utils.getAll.invalidate()
  });

  const { data: history, isPending: isLoadingHistory, error: getAllError } = trpc.getAll.useQuery();

  const onSubmit = () => {
    if (!lang) {
      setErrors(prev => ({ ...prev, dropdown: 'Please select a language' }))
      return;
    }
    mutate({ code: userInput, language: lang });
    setHistoryId(null);
  }

  const handleSetLang = (lang: Language) => {
    setLang(lang);
    setErrors((prev) => ({ ...prev, dropdown: '' }))
  };

  const handleUserInput = (text: string) => {
    setUserInput(text);
    reset();
  };

  const historyClick = (id: string) => {
    const chat = history?.find(e => e.id === id);
    if (!chat) return;

    setHistoryId(id);
    setUserInput(chat.code);
  };

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  }

  const backgroundColor = (lang: Language) => {
    switch (lang) {
      case "javascript":
        return 'bg-amber-100'
      case "typescript":
        return 'bg-green-100'
      case "python":
        return 'bg-blue-100'
    }
  }

  return <main className="flex flex-col p-4 md:p-8 bg-zinc-200 text-zinc-700">
    <div className='grid grid-cols-12 gap-4 md:gap-8'>
      <Menu className='md:hidden cursor-pointer' onClick={toggleHistory} />
      <aside className={`absolute md:relative ${showHistory ? 'block' : 'hidden'} md:block max-w-50 md:max-w-none z-10 px-4 py-2 h-fit col-span-12 sm:col-span-6 md:col-span-3 rounded-lg bg-zinc-50 whitespace-pre-wrap order-2 md:order-1`}>
        <div className='flex items-center justify-between'>
          <p className='text-xs text-zinc-400'>Your chats:</p>
          <X className='cursor-pointer md:hidden' onClick={toggleHistory} />
        </div>
        {history?.map(chat =>
          <div key={chat.id} className={`cursor-pointer border rounded-lg my-2 p-2 hover:bg-zinc-100 ${chat.id === historyId ? 'border-zinc-400' : ''}`} onClick={() => historyClick(chat.id)}>
            <p className={`rounded-full w-fit text-[10px] px-2 py-px ${backgroundColor(chat.language as Language)}`}>{chat.language}</p>
            <p className='overflow-hidden mt-1 text-ellipsis text-nowrap max-h-6'>{chat.code}</p>
            <p className='text-xs text-zinc-400 mt-1'>{chat.createdAt.toLocaleDateString()}</p>
          </div>
        )}
      </aside>
      <div className='col-span-12 md:col-span-9 order-1 md:order-2'>
        <h1 className="text-4xl font-bold text-center">Code Review Mentor</h1>
        <div className='flex justify-center m-6 flex-col items-center'>
          <div className={`w-fit ${errors.dropdown ? 'border border-destructive rounded-lg' : ''}`}>
            <SelectLang setLang={handleSetLang} />
          </div>
          {errors.dropdown ? <p className='text-xs text-destructive w-fit'>Please select a language (required)</p> : null}
        </div>
        <CodeEditor lang={lang} userInput={userInput} handleUserInput={handleUserInput} />
        {userInput.length > 0 && <p className="self-start flex items-center gap-1 mt-1">
          <span className="text-xs text-muted-foreground">Chars:</span>
          <span className={`text-xs ${userInput.length < 30 || userInput.length > 500 ? 'text-destructive' : ''}`}>{userInput.length}</span>
        </p>}
        <div className='flex justify-center pt-6'>
          <Button className='active:scale-[0.96]' onClick={onSubmit} disabled={isPending}>
            {isPending ? 'Reviewing...' : 'Review code'}
          </Button>
        </div>
        <Result isLoading={isPending} error={mutationError && errorHandler(mutationError)} completion={historyId ? history?.find(e => e.id === historyId)?.feedback ?? '' : data?.feedback ?? ''} />
      </div>
    </div>
  </main>
}