import React, { useState } from "react";
import { formatMinutes } from "@/utils/duration";
import { Button, Tabs, Icon } from "@/components/ui";
import Overview from "./Overview";
import QuestionAnswers from "./QuestionAnswers";
import ContentRenderer from "@/components/content/ContentRenderer";

function LessonsMainSection({ lesson, error, activeLesson, setButtonAction }) {
  const [activeTab, setActiveTab] = useState("overview");

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
    <main className="flex-1 overflow-y-auto py-3 px-6">

      <h1 className="text-xl font-semibold leading-tight">
        {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 1}{" "}
        {lesson?.title}
      </h1>

      <div className="flex items-center text-xs text-inner-shadow -mt-1.5 text-muted-foreground text-dark-gray">
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

      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-4 w-[30%]">
          <Button
            buttonName="Previous"
            frontIconName="stash:arrow-left-large-duotone"
            frontIconHeight="16"
            frontIconWidth="16"
            bgClass="bg-white"
            textClass="text-black"
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
            bgClass="bg-white"
            textClass="text-black"
            className="p-2 rounded px-5 font-semibold"
          />
        </div>
      </div>
      <div className="mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="py-5">
          {activeTab === "overview" && <Overview lesson={lesson} />}
          {activeTab === "qa" && <QuestionAnswers />}
        </div>
      </div>
    </main>
  );
}

export default LessonsMainSection;
