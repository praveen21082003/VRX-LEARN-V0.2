import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonsAsideSection from '../sections/LessonsAsideSection';
import LessonsMainSection from "../sections/LessonsMainSection";
import useCourseContent from "../hooks/useCourseContent";
import { useAuth } from "@/context/AuthContext";

function LessonsPage() {
  const { courseSlug } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  const { fetchCourseContent, courseContent, loading } = useCourseContent();
  const [activeLesson, setActiveLesson] = useState(null);
  const [openPlaylist, setOpenPlaylist] = useState(false);

  useEffect(() => {
    if (courseSlug && role) {
      fetchCourseContent(courseSlug, role);
    }
  }, [courseSlug, role, fetchCourseContent]);

  // Set the first lesson as active once data loads
  useEffect(() => {
    if (courseContent?.modules?.length > 0 && !activeLesson) {
      const firstModule = courseContent.modules[0];
      if (firstModule.lessons?.length > 0) {
        setActiveLesson({
          moduleIndex: 0,
          lessonIndex: 0,
          lessonId: firstModule.lessons[0].id,
        });
      }
    }
  }, [courseContent, activeLesson]);

  // Logic to calculate Prev/Next lessons
  const navigationData = useMemo(() => {
    if (!activeLesson || !courseContent?.modules) return { prev: null, next: null };

    const { moduleIndex, lessonIndex } = activeLesson;
    const modules = courseContent.modules;
    const currentModule = modules[moduleIndex];

    let prev = null;
    let next = null;

    // Next Logic
    if (lessonIndex < currentModule.lessons.length - 1) {
      next = { moduleIndex, lessonIndex: lessonIndex + 1, lessonId: currentModule.lessons[lessonIndex + 1].id };
    } else if (moduleIndex < modules.length - 1) {
      next = { moduleIndex: moduleIndex + 1, lessonIndex: 0, lessonId: modules[moduleIndex + 1].lessons[0].id };
    }

    // Prev Logic
    if (lessonIndex > 0) {
      prev = { moduleIndex, lessonIndex: lessonIndex - 1, lessonId: currentModule.lessons[lessonIndex - 1].id };
    } else if (moduleIndex > 0) {
      const prevModule = modules[moduleIndex - 1];
      prev = { moduleIndex: moduleIndex - 1, lessonIndex: prevModule.lessons.length - 1, lessonId: prevModule.lessons[prevModule.lessons.length - 1].id };
    }

    return { prev, next };
  }, [activeLesson, courseContent]);


  if (!activeLesson) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Initializing lesson...</p>
      </main>
    );
  }

  if (loading || !courseContent) return <div className="p-10 text-center">Loading Course...</div>;

  return (
    <div className="flex h-[calc(100vh-56px)] bg-background text-main">
      <LessonsAsideSection
        modules={courseContent.modules}
        activeLesson={activeLesson}
        setActiveLesson={setActiveLesson}
        openPlaylist={openPlaylist}
        setOpenPlaylist={setOpenPlaylist}
      />

      <LessonsMainSection
        activeLesson={activeLesson}
        prevLesson={navigationData.prev}
        nextLesson={navigationData.next}
        onNavigate={setActiveLesson}
      />
    </div>
  );
}

export default LessonsPage;