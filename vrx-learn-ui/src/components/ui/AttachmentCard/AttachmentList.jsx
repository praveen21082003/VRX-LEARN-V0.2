import { Icon } from "@/components/ui";

function AttachmentCard({ file }) {
  const extension = file.name.split(".").pop().toLowerCase();

  return (
    <div className="group flex items-center gap-3 p-2 pr-4 bg-surface border border-border/50 rounded-xl hover:shadow-md transition-all duration-200 min-w-52 max-w-2xs">
        
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon
          name={extension === "pdf" ? "ri:file-pdf-2-line" : "line-md:file"}
          className="text-xl"
        />
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate leading-tight">
          {file.name}
        </p>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
          {extension} File
        </p>
      </div>

      {/* Action */}
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 p-1.5 bg-primary/10 hover:bg-primary hover:text-white rounded-full text-primary transition-colors"
        title="View Attachment"
      >
        <Icon name="ri:external-link-line" className="text-lg" />
      </a>
    </div>
  );
}

export default AttachmentCard;
