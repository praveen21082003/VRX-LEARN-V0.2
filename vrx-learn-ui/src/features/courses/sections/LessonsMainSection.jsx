import React, { useState } from 'react'
import { Dot } from 'lucide-react'
import { formatMinutes } from "@/utils/duration";
import { Button } from '@/components/ui'
import Overview from './Overview';
import QuestionAnswers from './QuestionAnswers';
// import { Video } from '../../../components/content';


function LessonsMainSection({ lesson,error, activeLesson, setButtonAction }) {
    const [activeTab, setActiveTab] = useState("overview");

    if (error) return <p>Failed to load course</p>;


    if (!activeLesson || !lesson) {
        return (
            <main className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Loading lesson...</p>
            </main>
        );
    }


    return (
        <main className="flex-1 overflow-y-auto p-3">
            <h1 className="text-xl font-semibold">
                {activeLesson.moduleIndex + 1}.{activeLesson.lessonIndex + 1}{" "}
                {lesson?.title}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground text-dark-gray">
                <span>{lesson?.type}</span>
                <Dot />
                <span>{formatMinutes(lesson?.duration_minutes)}</span>
                <Dot />
                <span>{lesson?.status}</span>
            </div>
            <div className='flex justify-center'>
                {lesson?.type === "video" && (
                    // <Video url={lesson.video_url}/>
                    <video
                        className="h-110 w-full min-h-100 rounded-lg"
                        src={lesson.video_url}
                        controls
                    />
                )}
            </div>
            <div className="flex justify-between items-center pt-4">
                <div className='flex gap-4 w-[30%]'>
                    <Button
                        buttonName="Previous"
                        bgClass="bg-white"
                        textClass="text-black"
                        className="p-2 rounded px-5 font-semibold"
                        onClick={() => setButtonAction("previous")}
                    />
                    <Button
                        buttonName="Next"
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
                <div className="flex gap-6 border-b">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`pb-2 font-semibold ${activeTab === "overview"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Overview
                    </button>

                    <button
                        onClick={() => setActiveTab("qa")}
                        className={`pb-2 font-semibold ${activeTab === "qa"
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground"
                            }`}
                    >
                        Q&amp;A
                    </button>
                </div>

                <div className="py-5">
                    {activeTab === "overview" && <Overview lesson={lesson} />}
                    {activeTab === "qa" && <QuestionAnswers />}
                </div>
            </div>

        </main>
    )
}

export default LessonsMainSection
