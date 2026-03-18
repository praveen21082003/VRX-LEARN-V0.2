import React, { useState, useEffect } from "react";
import { formatMinutes } from "@/utils/duration";
import { Button, Tabs, Icon } from "@/components/ui";
import VideoPlayer from "@/components/content/Video";
import DocumentControls from "./document/DocumentControls";
import ZoomControls from "../ui/FileViewer/ZoomControls";
import PDFViewer from "./document/PDFViewer";
import WordViewer from "./document/WordViewer";

function ContentRenderer({ lesson, error, activeLesson, setButtonAction, setVideoDuration }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
  }, [lesson?.file_url]); 


  if (!activeLesson || !lesson) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading lesson...</p>
      </main>
    );
  }

  return (
    <>
      <div className="flex justify-center w-full mt-1 lg:px-10 2xl:px-0  rounded overflow-hidden">
        {lesson?.type === "video" ? (

          <VideoPlayer url={lesson?.video_url} key={lesson.id}  setVideoDuration={setVideoDuration}/>

        ) : lesson?.type === "file" ? (


          <DocumentControls title={lesson.title} fileUrl={lesson.file_url} key={lesson.id}/>

        ) : null}
      </div>
    </>
  );
}

export default ContentRenderer;
