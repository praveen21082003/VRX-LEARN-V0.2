import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Icon } from '@/components/ui'
import { motion, AnimatePresence } from "motion/react";
import BackButton from "@/components/navigation/BackButton";
import { useParams } from "react-router-dom";



function LessonsAsideSection({ modules, activeLesson, setActiveLesson, openPlaylist, setOpenPlaylist }) {
    const [openModuleId, setOpenModuleId] = useState(null);
    const { courseSlug } = useParams();

    useEffect(() => {
        if (modules?.length && openModuleId === null) {
            setOpenModuleId(modules[0].id)
        }
    }, [modules, openModuleId])


    const toggleModule = (id) => {
        setOpenModuleId((prev) => (prev === id ? null : id));
    };




    function PlaylistContent({
        modules,
        activeLesson,
        setActiveLesson,
        openModuleId,
        toggleModule
    }) {
        return modules.map((module, moduleIndex) => {
            const isOpen = openModuleId === module.id;

            return (
                <div key={module.id}>
                    <button
                        onClick={() => toggleModule(module.id)}
                        className={clsx(
                            "flex h-14 w-full border-primary items-center justify-between text-dark-gray text-h45 truncate",
                            isOpen ? "bg-primary/16 dark:bg-primary text-primary dark:text-background border-x-8 p-2" : "hover:bg-primary/16 p-4"
                        )}
                    >
                        {module.title}

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
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >

                                {module.lessons.map((lesson, lessonIndex) => {
                                    const isActive = activeLesson?.lessonId === lesson.id;

                                    const lessonId = lesson.id

                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() =>
                                                setActiveLesson({
                                                    moduleIndex,
                                                    lessonIndex,
                                                    lessonId: lesson.id
                                                })
                                            }
                                            className={clsx(
                                                "flex w-full items-center justify-between p-4 text-dark-gray transition",
                                                isActive
                                                    ? "bg-primary/16 dark:bg-primary text-primary dark:text-background"
                                                    : "hover:bg-primary/16 text-muted"
                                            )}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">

                                                <Icon name={lesson?.mimeType?.startsWith("video") ? "ep:video-play" : "basil:document-outline"} height="26" width="26" />

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
                                    );
                                })}
                            </motion.ul>
                        )}
                    </AnimatePresence>

                </div>
            );
        });
    }



    return (
        <>

            <aside className="hidden sidebar-sm 2xl:sidebar-lg border-r-2 border-default bg-muted/40 lg:block overflow-y-hide overflow-scroll-hide">
                <div className="p-4 border-b-2 border-default ">
                    <BackButton
                        to={`/course/${courseSlug}/overview`}
                        iconName="material-symbols:arrow-back-rounded"
                        label="Back to Overview"
                    />
                </div>

                <PlaylistContent
                    modules={modules}
                    activeLesson={activeLesson}
                    setActiveLesson={setActiveLesson}
                    openModuleId={openModuleId}
                    toggleModule={toggleModule}
                />
            </aside>
            <AnimatePresence>
                {openPlaylist && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50 lg:hidden"
                        onClick={() => setOpenPlaylist(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl max-h-[85vh] overflow-y-auto"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between p-4 border-b-2 border-default">
                                <h2 className="font-semibold">Contents</h2>

                                <button onClick={() => setOpenPlaylist(false)}>
                                    <Icon name="mdi:close" width="24" />
                                </button>
                            </div>

                            <PlaylistContent
                                modules={modules}
                                activeLesson={activeLesson}
                                setActiveLesson={(data) => {
                                    setActiveLesson(data);
                                    setOpenPlaylist(false);
                                }}
                                openModuleId={openModuleId}
                                toggleModule={toggleModule}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default LessonsAsideSection;
