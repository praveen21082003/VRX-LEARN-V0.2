import React, { useState, useEffect } from "react";

import { Button, Tabs, Icon } from "@/components/ui";
import VideoPlayer from "@/components/content/Video";
import DocumentControls from "./document/DocumentControls";
import ZoomControls from "../ui/FileViewer/ZoomControls";
import PDFViewer from "./document/PDFViewer";
import WordViewer from "./document/WordViewer";
import useMedia from '@/features/courses/hooks/useMedia';

function ContentRenderer({ lesson, error, setVideoDuration }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const mediaId = lesson?.mediaId;
  const { url, loading: mediaLoading } = useMedia(mediaId);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
  }, [lesson?.mediaId]);

  if (mediaLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon name="mingcute:loading-3-fill" className="animate-spin" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading lesson...</p>
      </main>
    );
  }

  const isVideo = lesson?.mimeType?.startsWith("video");
  const isPDF = lesson?.mimeType === "application/pdf";

  return (
    <>
      <div className="flex justify-center w-full mt-1 lg:px-10 2xl:px-0 rounded overflow-hidden">

        {isVideo ? (
          <VideoPlayer
            url={url}
            key={lesson.id}
            setVideoDuration={setVideoDuration}
          />
        ) : isPDF ? (
          <DocumentControls
            title={lesson.title}
            fileUrl={url}
            key={lesson.id}
          />
        ) : (
          <p className="text-muted-foreground">Unsupported file type</p>
        )}

      </div>
    </>
  );
}

export default ContentRenderer;