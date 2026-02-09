import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LessonsAsideSection from '../sections/LessonsAsideSection'
import LessonsMainSection from "../sections/LessonsMainSection";
import { useOutletContext } from "react-router-dom";
import useModules from "../hooks/useModules"
import useLessons from "../hooks/useLessons";

function LessonsPage() {
  const { courseSlug  } = useParams();
  const { modules, moduleLoading, moduleError } = useModules(courseSlug);
  
  
  const [activeLesson, setActiveLesson] = useState(null);
  const [buttonAction, setButtonAction] = useState("");

  const lessonId = activeLesson?.lessonId;
  // console.log(lessonId)

  const { lesson, loading: lessonLoading, error: lessonError } = useLessons(lessonId);
  // console.log(lesson);


  useEffect(() => {
    if (!modules?.length) return;

    const firstModule = modules[0];
    if (!firstModule?.lessons?.length) return;

    setActiveLesson({
      moduleIndex: 0,
      lessonIndex: 0,
      lessonId: firstModule.lessons[0].id,
    });
    
  }, [modules]);


  const { setSectionBreadcrumb } = useOutletContext();
  useEffect(() => {
    if (lesson?.title) {
      setSectionBreadcrumb(lesson.title);
    }
  }, [lesson, setSectionBreadcrumb]);


  useEffect(() => {
    if (!buttonAction || !activeLesson || !modules?.length) return;

    const { moduleIndex, lessonIndex } = activeLesson;

    if (buttonAction === "previous") {
      // Case 1: previous lesson in same module
      if (lessonIndex > 0) {
        const prevLesson = modules[moduleIndex].lessons[lessonIndex - 1];

        setActiveLesson({
          moduleIndex,
          lessonIndex: lessonIndex - 1,
          lessonId: prevLesson.id,
        });
      }
      // Case 2: go to last lesson of previous module
      else if (moduleIndex > 0) {
        const prevModule = modules[moduleIndex - 1];
        const lastLessonIndex = prevModule.lessons.length - 1;
        const prevLesson = prevModule.lessons[lastLessonIndex];

        setActiveLesson({
          moduleIndex: moduleIndex - 1,
          lessonIndex: lastLessonIndex,
          lessonId: prevLesson.id,
        });
      }
    }

    if (buttonAction === "next") {
      const currentModule = modules[moduleIndex];

      // Case 1: next lesson in same module
      if (lessonIndex < currentModule.lessons.length - 1) {
        const nextLesson = currentModule.lessons[lessonIndex + 1];

        setActiveLesson({
          moduleIndex,
          lessonIndex: lessonIndex + 1,
          lessonId: nextLesson.id,
        });
      }
      // Case 2: first lesson of next module
      else if (moduleIndex < modules.length - 1) {
        const nextModule = modules[moduleIndex + 1];
        const nextLesson = nextModule.lessons[0];

        setActiveLesson({
          moduleIndex: moduleIndex + 1,
          lessonIndex: 0,
          lessonId: nextLesson.id,
        });
      }
    }

    setButtonAction("");

  }, [buttonAction, activeLesson, modules]);



  return (
    <div className="flex h-[calc(100vh-56px)] bg-background">
      

      <LessonsAsideSection modules={modules} activeLesson={activeLesson} setActiveLesson={setActiveLesson} />


      <LessonsMainSection lesson={lesson} activeLesson={activeLesson} setButtonAction={setButtonAction} />
    </div>
  );
}

export default LessonsPage;
