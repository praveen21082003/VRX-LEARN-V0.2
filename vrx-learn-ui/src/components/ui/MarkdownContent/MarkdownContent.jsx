import ReactMarkdown from "react-markdown";
import "@/styles/markdown.css";

export default function MarkdownContent({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-content text-main">
      <ReactMarkdown
        components={{
          hr: () => <br />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
