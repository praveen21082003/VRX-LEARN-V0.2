import React, { useState, useEffect } from "react";
import { formatMinutes } from "@/utils/duration";
import { Button, Tabs, Icon } from "@/components/ui";
import ZoomControls from "../../ui/FileViewer/ZoomControls";
import PDFViewer from "../viewers/PDFViewer";
import WordViewer from "../viewers/WordViewer";

function Viewer({ lesson, error, activeLesson, setButtonAction }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Add this inside your component
  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
  }, [lesson?.file_url]); // Runs whenever the file changes


  if (!activeLesson || !lesson) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading lesson...</p>
      </main>
    );
  }

  return (
    <>
      <div className="flex items-center text-sm text-muted-foreground text-dark-gray">
        <span>{lesson?.type}</span>
       <Icon name="ph:dot-bold" />
        {lesson?.type === "video" && (
          <>
            <span>{formatMinutes(lesson?.duration_minutes)}</span>
            <Icon name="ph:dot-bold" />
          </>
        )}

        <span>{lesson?.status}</span>
      </div>

      <div className="flex justify-center h-[700px] w-full mt-4 border rounded-lg overflow-hidden">
        {lesson?.type === "video" ? (
          <video
            className="h-full w-full rounded-lg"
            src={lesson.video_url}
            controls
          />
        ) : lesson?.type === "file" ? (
          <ZoomControls
            key={lesson.file_url}
            title={lesson?.title || "Document"}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fileUrl={lesson.file_url}
          >
            {lesson?.file_type === "pdf" && (
              <PDFViewer
                url={lesson.file_url}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
              />
            )}

            {lesson?.file_type === "word" && (
              <WordViewer
                url={lesson.file_url}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
              />
            )}
          </ZoomControls>
        ) : null}
      </div>
    </>
  );
}

export default Viewer;
