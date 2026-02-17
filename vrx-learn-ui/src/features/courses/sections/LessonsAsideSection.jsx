import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Icon } from '@/components/ui'
import { motion, AnimatePresence } from "motion/react";
import BackButton from "@/components/navigation/BackButton";




function LessonsAsideSection({ modules, activeLesson, setActiveLesson }) {
    const [openModuleId, setOpenModuleId] = useState(null);

    useEffect(() => {
        if (modules?.length && openModuleId === null) {
            setOpenModuleId(modules[0].id)
        }
    }, [modules, openModuleId])


    const toggleModule = (id) => {
        setOpenModuleId((prev) => (prev === id ? null : id));
    };



    return (
        <aside className="hidden w-90 2xl:w-120 border-r-2 border-primary-border bg-muted/40 py-1 md:block">
            <div className="p-1"><BackButton to=".." /></div>
            {modules.map((module, moduleIndex) => {
                const isOpen = openModuleId === module.id;

                return (
                    <div key={module.id}>
                        <button
                            onClick={() => toggleModule(module.id)}
                            className={clsx(
                                "flex h-16 w-full border-primary items-center justify-between font-semibold",
                                isOpen ? "bg-primary-border border-x-8 p-2" : "hover:bg-primary/5 p-4"
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
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
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
                                                        "flex w-full items-center justify-between p-4 text-left font-semibold transition",
                                                        isActive
                                                            ? "bg-primary-border text-primary"
                                                            : "hover:bg-primary/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        {lesson.type === "video" ?
                                                            <Icon
                                                                name="ep:video-play"
                                                                height="26"
                                                                width="26"
                                                            />
                                                            :
                                                            <Icon
                                                                name="basil:document-outline"
                                                                height="26"
                                                                width="26"
                                                            />
                                                        }

                                                        <p className="text-sm truncate">
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
