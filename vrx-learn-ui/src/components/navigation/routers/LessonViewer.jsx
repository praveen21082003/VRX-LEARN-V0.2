import React, { useState } from 'react';
import BackButton from "@/components/navigation/BackButton";
import { Button, Tabs, Icon } from "@/components/ui";
import ContentRenderer from "@/components/content/ContentRenderer";
import { useParams } from "react-router-dom";
import useLesson from '@/features/courses/hooks/useLesson';
import { formatTime } from "@/utils/duration";

import Overview from "./tabs/OverView";
import QuestionAnswers from './tabs/QuestionAnswers';

function LessonViewer({ activeLesson, prevLesson, nextLesson, onNavigate, moduleIndex, currentIndex }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [videoDuration, setVideoDuration] = useState(0);

    const { courseSlug, lessonId } = useParams();


    const id = lessonId || activeLesson?.lessonId
    
    const { lesson, loading, error } = useLesson(id);



    const tabs = [
        { label: "Overview", value: "overview" },
        { label: "Q&A", value: "qa" },
    ];

    if (loading) {
        return (
            <main className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Loading lesson...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-1 flex items-center justify-center">
                <p className="text-red-500">Failed to load lesson</p>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto py-1 px-2 md:py-1 md:px-6 pb-24">

            <div className="block lg:hidden w-full border-b border-default p-1">
                <BackButton
                    to={`/course/${courseSlug}/overview`}
                    iconName="material-symbols:arrow-back-rounded"
                    label="Back"
                />
            </div>


            <h1 className="text-h3">
                {/* {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 1}  */}
                {lesson?.title}
            </h1>

            <div className="flex items-center text-caption -mt-1.5 text-muted-foreground">

                <span>
                    {lesson?.mimeType?.startsWith("video") ? "video" : "application"}
                </span>

                <Icon name="ph:dot-bold" />

                {lesson?.mimeType?.startsWith("video") && (
                    <>
                        <span>{formatTime(videoDuration)}</span>
                        <Icon name="ph:dot-bold" />
                    </>
                )}
            </div>


            <ContentRenderer
                lesson={lesson}
                error={error}
                setVideoDuration={setVideoDuration}
            />

            <div className="hidden md:flex justify-between items-center pt-4">
                <div className="flex gap-4 w-[30%]">

                    <Button
                        buttonName="Previous"
                        frontIconName="stash:arrow-left-large-duotone"
                        frontIconHeight="16"
                        frontIconWidth="16"
                        className="p-1 px-2 rounded font-semibold"
                        onClick={() => onNavigate?.(prevLesson)}
                        disabled={!prevLesson}
                    />

                    <Button
                        buttonName="Next"
                        backIconName="stash:arrow-right-large-duotone"
                        backIconHeight="16"
                        bgClass="bg-primary"
                        textClass="text-white"
                        className="p-2 rounded px-6 font-semibold"
                        onClick={() => onNavigate?.(nextLesson)}
                        disabled={!nextLesson}
                    />

                </div>

                <div>
                    <Button
                        buttonName="Mark as Completed"
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

        </main>
    );
}

export default LessonViewer;