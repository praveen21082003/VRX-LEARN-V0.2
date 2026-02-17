import { MarkdownContent, AttachmentCard } from "@/components/ui"
export default function InstructionsTab({ description, attachments }) {
    if (!attachments || attachments.length === 0) {
        return (
            <>
                <MarkdownContent content={description} />
            </>
        );
    }

    return (
        <>
            <MarkdownContent content={description} />
            <h1 className="text-xl font-semibold mt-6">Attachments</h1>

            <div className="flex flex-wrap gap-3 mt-2">
                <ul className="flex gap-2">
                    {attachments.map((file) => (
                        <li key={file.url}>
                            <AttachmentCard file={file} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
