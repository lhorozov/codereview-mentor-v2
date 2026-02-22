import Editor from '@uiw/react-textarea-code-editor';
import { Lang } from "@/app/page";

interface CodeEditorProps {
    lang: Lang;
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>
}

export function CodeEditor({ lang, userInput, setUserInput }: CodeEditorProps) {
    return (
        <Editor
            value={userInput}
            language={lang}
            placeholder={`Paste your code here...`}
            onChange={(e) => setUserInput(e.target.value)}
            padding={15}
            style={{
                borderRadius: '8px',
                width: '100%',
                minHeight: '150px',
                minWidth: '150px',
                backgroundColor: "oklch(98.5% 0 0)",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
        />
    );
}