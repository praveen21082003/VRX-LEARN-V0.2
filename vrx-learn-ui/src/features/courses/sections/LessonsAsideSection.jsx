import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Icon } from '@/components/ui'
import { motion, AnimatePresence } from "motion/react";
import BackButton from "@/components/navigation/BackButton";
import { useParams } from "react-router-dom";



function LessonsAsideSection({ modules, activeLesson, setActiveLesson }) {
    const [openModuleId, setOpenModuleId] = useState(null);
    const {courseSlug} = useParams();

    useEffect(() => {
        if (modules?.length && openModuleId === null) {
            setOpenModuleId(modules[0].id)
        }
    }, [modules, openModuleId])


    const toggleModule = (id) => {
        setOpenModuleId((prev) => (prev === id ? null : id));
    };



    return (
        <aside className="hidden sidebar-sm 2xl:sidebar-lg border-r-2 text-sm border-default bg-muted/40 md:block">
            <div className="p-4 border-b-2 border-default w-full">
                <BackButton to={`/learn/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
            </div>
            {modules.map((module, moduleIndex) => {
                const isOpen = openModuleId === module.id;

                return (
                    <div key={module.id}>
                        <button
                            onClick={() => toggleModule(module.id)}
                            className={clsx(
                                "flex h-16 w-full border-primary items-center justify-between text-dark-gray text-h45",
                                isOpen ? "bg-primary-border text-primary border-x-8 p-2" : "hover:bg-primary/5 p-4"
                            )}
                        >
                            <span>{module.title}</span>
                            <Icon
                                name="iconamoon:arrow-down-2"
                                height="20"
                                width="20"
                                className={clsx(
                                    "transition-transform duration-200",
                                    isOpen && "rotate-180"
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className='space-y-1 overflow-hidden'
                                >
                                    {module.lessons.map((lesson, lessonIndex) => {
                                        const isActive = activeLesson?.lessonId === lesson.id;

                                        const lessonId = lesson.id

                                        return (
                                            <li key={lesson.id}>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveLesson({ moduleIndex, lessonIndex, lessonId })}
                                                    className={clsx(
                                                        "flex w-full items-center justify-between p-4 text-dark-gray transition",
                                                        isActive
                                                            ? "bg-primary/16 dark:bg-primary text-primary dark:text-background"
                                                            : "hover:bg-primary/16 text-muted"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4 min-w-0">

                                                        <Icon name={lesson.type === "video" ? "ep:video-play" : "basil:document-outline"} height="26" width="26" />

                                                        <p className="text-h5 truncate">
                                                            {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                                                        </p>
                                                    </div>

                                                    <Icon
                                                        name={lesson.status === "completed" ? "mdi:checkbox-marked-circle" : "mdi:checkbox-blank-circle-outline"}
                                                        height="26px"
                                                        width="26px"
                                                    />
                                                </button>
                                            </li>
                                        );
                                    })}
                                </motion.ul>
                            )}
                        </AnimatePresence>

                    </div>
                );
            })}
        </aside>
    );
}

export default LessonsAsideSection;
