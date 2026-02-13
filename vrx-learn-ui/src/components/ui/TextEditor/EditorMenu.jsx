import React from "react"
import { Button } from "@/components/ui"
import { EDITOR_TOOLBAR_MENU } from "@/config/editorToolBar"
import { useEditorState } from "@tiptap/react"

function EditorMenu({ editor }) {

    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            h1: editor.isActive("heading", { level: 1 }),
            h2: editor.isActive("heading", { level: 2 }),
            h3: editor.isActive("heading", { level: 3 }),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            codeBlock: editor.isActive("codeBlock"),
            link: editor.isActive("link"),
        }),
    })


    if (!editor) return null

    return (
        <header className="flex border-b-2 border-primary-border bg-[#F8F9FA] p-2">
            {EDITOR_TOOLBAR_MENU.map((group, groupIndex) => (
                <div
                    key={groupIndex}
                    className={`flex px-2 ${groupIndex !== 0 ? "border-l border-primary-border" : ""
                        }`}
                >
                    {group.map((item, index) => (
                        <Button
                            key={index}
                            frontIconHeight="24px"
                            frontIconWidth="24px"
                            bgClass="bg-none"
                            frontIconName={item.icon}
                            onClick={() => item.action(editor)}
                            textClass={editorState[item.key]? "text-blue-600" : "text-border"}
                        />
                    ))}
                </div>
            ))}
        </header>
    )
}

export default EditorMenu
