import React, {useEffect} from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Starterkit from '@tiptap/starter-kit'
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Markdown } from "tiptap-markdown"


import EditorMenu from './EditorMenu'
import './tiptap.css'




function EditerBox({ label, value, onChange }) {

    const editor = useEditor({
        extensions: [
            Starterkit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
            }),

            Placeholder.configure({
                placeholder: `Write your description...`
            }),
            Markdown
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            const markdown = editor.storage.markdown.getMarkdown()
            onChange(markdown)
        }
    })

    useEffect(() => {
        if (editor && value !== editor.storage.markdown.getMarkdown()) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);


    if (!editor) return null;


    return (
        <div className='flex flex-col gap-2'>
            {label && (
                <label className="text-sm font-bold">
                    {label}
                </label>
            )}

            <div className="w-full border text-sm border-border rounded overflow-hidden">
                <EditorMenu editor={editor} />
                <div className="min-h-50 p-2 focus:ring-1 focus:ring-primary focus:border-primary">
                    <EditorContent editor={editor} className="tiptap" />
                </div>
            </div>
        </div>
    )
}

export default EditerBox
