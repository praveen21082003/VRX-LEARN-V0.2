import React, { useState } from "react";
import CheckboxIcon from "@/components/icons/CheckboxIcon";
import DropdownIcon from "@/components/icons/DropdownIcon";
import clsx from "clsx";

function LessonsAsideSection({ modules }) {
    const [openModuleId, setOpenModuleId] = useState(modules?.[0]?.id);
    const [activeLessonId, setActiveLessonId] = useState(101); // default active

    const toggleModule = (id) => {
        setOpenModuleId((prev) => (prev === id ? null : id));
    };

    return (
        <aside className="hidden w-72 border-r bg-muted/40 p-4 md:block">
            {modules.map((module, moduleIndex) => {
                const isOpen = openModuleId === module.id;

                return (
                    <div key={module.id} className="space-y-2 py-4">
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="flex w-full items-center justify-between rounded px-3 py-2 font-semibold text-primary"
                        >
                            <span>{module.title}</span>
                            <DropdownIcon
                                className={clsx(
                                    "h-5 w-5 transition-transform duration-200",
                                    isOpen && "rotate-180"
                                )}
                            />
                        </button>

                        {/* Lessons */}
                        {isOpen && (
                            <ul className="space-y-1">
                                {module.lessons.map((lesson, lessonIndex) => {
                                    const isActive = activeLessonId === lesson.id;

                                    return (
                                        <li
                                            key={lesson.id}
                                            onClick={() => setActiveLessonId(lesson.id)}
                                            className={clsx(
                                                "flex cursor-pointer items-center justify-between gap-4 rounded px-3 py-2 text-sm transition",
                                                isActive
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-primary/5 text-foreground"
                                            )}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="">
                                                    {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                                                </p>
                                                <CheckboxIcon
                                                    checked={lesson.status === "completed"}
                                                    className={clsx(
                                                        "h-5 w-5",
                                                        lesson.status === "completed"
                                                            ? "text-green-600"
                                                            : "text-muted-foreground"
                                                    )}
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </aside>
    );
}

export default LessonsAsideSection;
