import Editor from '@uiw/react-textarea-code-editor';
import { Language } from '@/shared/schemas/submission';

interface CodeEditorProps {
    lang?: Language;
    userInput: string;
    handleUserInput: (text: string) => void;
}

export function CodeEditor({ lang, userInput, handleUserInput }: CodeEditorProps) {
    return (
        <Editor
            value={userInput}
            language={lang}
            placeholder={`Paste your code here...`}
            onChange={(e) => handleUserInput(e.target.value)}
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