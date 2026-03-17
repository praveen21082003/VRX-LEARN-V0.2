import { useEffect, useState, useRef } from "react";
import { formatMinutes } from "@/utils/duration";
import { Button, Tabs, Icon } from "@/components/ui";
import Overview from "./Overview";
import QuestionAnswers from "./QuestionAnswers";
import ContentRenderer from "@/components/content/ContentRenderer";
import { motion } from "motion/react";

function LessonsMainSection({ lesson, error, activeLesson, setActiveLesson, setButtonAction, setOpenPlaylist, nextLessonData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showButton, setShowButton] = useState(true);
  const lastScrollY = useRef(0);

  const scrollRef = useRef(null);
  // console.log(nextLessonData);


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY > lastScrollY.current) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }

      lastScrollY.current = currentScrollY;
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Q&A", value: "qa" },
  ];

  if (error) return <p>Failed to load course</p>;

  if (!activeLesson || !lesson) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Loading lesson...</p>
      </main>
    );
  }

  return (
    <main
      ref={scrollRef}
      className="flex-1 overflow-y-auto py-1 px-2 md:py-3 md:px-6 pb-24"
    >

      <h1 className="text-h3">
        {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 1}{" "}
        {lesson?.title}
      </h1>

      <div className="flex items-center text-caption text-inner-shadow -mt-1.5 text-muted-foreground text-dark-gray">
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

      <ContentRenderer lesson={lesson} error={error} activeLesson={activeLesson} setButtonAction={setButtonAction} />

      <div className="hidden md:flex justify-between items-center pt-4">
        <div className="flex gap-4 w-[30%]">
          <Button
            buttonName="Previous"
            frontIconName="stash:arrow-left-large-duotone"
            frontIconHeight="16"
            frontIconWidth="16"
            bgClass=""
            textClass=""
            className="p-1 rounded font-semibold"
            onClick={() => setButtonAction("previous")}
          />
          <Button
            buttonName="Next"
            backIconName="stash:arrow-right-large-duotone"
            backIconHeight="16"
            bgClass="bg-primary"
            textClass="text-white"
            className="p-2 rounded px-5 font-semibold"
            onClick={() => setButtonAction("next")}
          />
        </div>
        <div>
          <Button
            buttonName="Mark as Completed"
            bgClass=""
            textClass=""
            className="p-2 rounded px-5 font-semibold"
          />
        </div>
      </div>
      <div className="mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="py-5">
          {activeTab === "overview" && <Overview lesson={lesson} />}
          {activeTab === "qa" && <QuestionAnswers />}
        </div>
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
        <Icon name="nrk:media-playlist-add-next" width="24" height="24"/>

        <div className="flex justify-between items-center w-full text-left overflow-hidden">
          {nextLessonData ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                if (nextLessonData) {
                  setActiveLesson({
                    moduleIndex: nextLessonData.moduleIndex,
                    lessonIndex: nextLessonData.lessonIndex,
                    lessonId: nextLessonData.lesson.id,
                  });
                } else {
                  setOpenPlaylist(true);
                }
              }}
              className="flex flex-col"
            >
              <span className="text-body opacity-80">Next : {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 2}{" "} {nextLessonData?.lesson.title}</span>
              <span className="text-caption font-medium truncate">
                {nextLessonData?.lesson?.type}
              </span>
            </div>
          ) : (
            <span>Contents</span>
          )}
          <Icon name="mingcute:up-fill" width="24" height="24"/>
        </div>
      </motion.button>
    </main>
  );
}

export default LessonsMainSection;
