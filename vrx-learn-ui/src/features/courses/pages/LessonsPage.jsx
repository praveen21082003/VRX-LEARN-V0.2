import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LessonsAsideSection from '../sections/LessonsAsideSection';
import LessonsMainSection from "../sections/LessonsMainSection";
import useCourseContent from "../hooks/useCourseContent";
import { useAuth } from "@/context/AuthContext";
import { Icon } from '@/components/ui'
import { motion, AnimatePresence } from "motion/react";


function LessonsPage() {
  const { courseSlug } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();

  const { fetchCourseContent, courseContent, loading } = useCourseContent();
  console.log(courseContent);
  const [showButton, setShowButton] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openPlaylist, setOpenPlaylist] = useState(false);

  useEffect(() => {
    if (courseSlug && role) {
      fetchCourseContent(courseSlug, role);
    }
  }, [courseSlug, role, fetchCourseContent]);

  console.log(courseContent);


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


  const navigationData = useMemo(() => {
    if (!activeLesson || !courseContent?.modules) return { prev: null, next: null };

    const { moduleIndex, lessonIndex } = activeLesson;
    const modules = courseContent.modules;
    const currentModule = modules[moduleIndex];

    if (!currentModule?.lessons) return { prev: null, next: null };


    let prev = null;
    let next = null;


    if (lessonIndex > 0) {
      prev = {
        moduleIndex,
        lessonIndex: lessonIndex - 1,
        lessonId: currentModule.lessons[lessonIndex - 1]?.id
      };
    } else if (
      moduleIndex > 0 &&
      modules[moduleIndex - 1]?.lessons?.length > 0
    ) {
      const prevModule = modules[moduleIndex - 1];

      prev = {
        moduleIndex: moduleIndex - 1,
        lessonIndex: prevModule.lessons.length - 1,
        lessonId: prevModule.lessons[prevModule.lessons.length - 1]?.id
      };
    }

    if (lessonIndex < currentModule.lessons.length - 1) {
      next = {
        moduleIndex,
        lessonIndex: lessonIndex + 1,
        lessonId: currentModule.lessons[lessonIndex + 1]?.id
      };
    } else if (
      moduleIndex < modules.length - 1 &&
      modules[moduleIndex + 1]?.lessons?.length > 0
    ) {
      next = {
        moduleIndex: moduleIndex + 1,
        lessonIndex: 0,
        lessonId: modules[moduleIndex + 1].lessons[0]?.id
      };
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

  const nextLessonData = navigationData.next
    ? courseContent.modules[navigationData.next.moduleIndex]
      .lessons[navigationData.next.lessonIndex]
    : null;

  if (loading || !courseContent) return <div className="p-10 text-center">Loading Course...</div>;


  return (
    <>
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
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

      <motion.button
        initial={{ y: 0 }}
        animate={{ y: showButton ? 0 : 120 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden fixed bottom-4 left-4 right-4
                    flex bg-primary text-white items-center gap-3
                    p-3 rounded-lg shadow-lg z-40"
        onClick={() => setOpenPlaylist(true)}
      >
        <Icon name="nrk:media-playlist-add-next" width="24" height="24" />

        <div className="flex justify-between items-center w-full text-left overflow-hidden">
          {navigationData.next ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                setActiveLesson(navigationData.next);
              }}
              className="flex flex-col"
            >
              <span className="text-body opacity-80">Next : {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 2}{" "} {nextLessonData?.title}</span>
              <span className="text-caption font-medium truncate">
                {nextLessonData?.type}
              </span>
            </div>
          ) : (
            <span>Contents</span>
          )}
          <Icon name="mingcute:up-fill" width="24" height="24" />
        </div>
      </motion.button>
    </>

  );
}

export default LessonsPage;