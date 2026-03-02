import React, { useState, useEffect } from "react";
import { formatMinutes } from "@/utils/duration";
import { Button, Tabs, Icon } from "@/components/ui";
import VideoPlayer from "@/components/content/Video";
import DocumentControls from "./document/DocumentControls";
import ZoomControls from "../ui/FileViewer/ZoomControls";
import PDFViewer from "./document/PDFViewer";
import WordViewer from "./document/WordViewer";

function ContentRenderer({ lesson, error, activeLesson, setButtonAction }) {
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
      <div className="flex justify-center w-full mt-2 rounded overflow-hidden">
        {lesson?.type === "video" ? (

          <VideoPlayer url={lesson?.video_url} key={lesson.id} />

        ) : lesson?.type === "file" ? (


          <DocumentControls title={lesson.title} fileUrl={lesson.file_url} key={lesson.id}/>


          // <ZoomControls
          //   key={lesson.file_url}
          //   title={lesson?.title || "Document"}
          //   totalPages={totalPages}
          //   currentPage={currentPage}
          //   setCurrentPage={setCurrentPage}
          //   fileUrl={lesson.file_url}
          // >
          //   {lesson?.file_type === "pdf" && (
          //     <PDFViewer
          //       key={lesson.id}
          //       url={lesson.file_url}
          //       currentPage={currentPage}
          //       totalPages={totalPages}
          //       setCurrentPage={setCurrentPage}
          //       setTotalPages={setTotalPages}
          //     />
          //   )}

          //   {lesson?.file_type === "word" && (
          //     <WordViewer
          //       url={lesson.file_url}
          //       currentPage={currentPage}
          //       totalPages={totalPages}
          //       setCurrentPage={setCurrentPage}
          //       setTotalPages={setTotalPages}
          //     />
          //   )}
          // </ZoomControls>
        ) : null}
      </div>
    </>
  );
}

export default ContentRenderer;
