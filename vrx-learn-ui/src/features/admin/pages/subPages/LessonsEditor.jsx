import React, { useState, useEffect, useRef } from 'react'
import { useParams, NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import clsx from 'clsx'


import { Button, Icon, Dropdown, MarkdownContent, Input, Modal, DeleteConfirmContent, ContentLoading, EmptyStateUI } from '@/components/ui'
import ReorderList from '@/components/dnd/ReorderList';
import { useToast } from '@/context/ToastProvider';



import useUpdateLesson from '../../hooks/useUpdateLesson';
import { editButtons, buttons } from '@/config/DropdownButtons.js'

import { useReorder } from '../../hooks/useReorder';


function LessonsEditor() {

    const isMobile = window.innerWidth < 768;

    const navigate = useNavigate();
    const inputRef = useRef();
    const rowRefs = useRef({});
    const { updateLesson, loading, deleteLesson, isDeleteingLesson } = useUpdateLesson();
    const { addToast } = useToast();

    const { reorderLessons, isUpdating } = useReorder();


    const { moduleId, courseSlug, courseContent, lessons, lessonLoading, lessonsError } = useOutletContext();

    const [isReorderMode, setIsReorderMode] = useState(false);
    const [orderedLessons, setOrderedLessons] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameLessonId, setRenameLessonId] = useState(null);
    const [renameValue, setRenameValue] = useState("");


    const [deleteLessonId, setDeleteLessonId] = useState(null);



    const selectedModule = courseContent?.modules?.find(
        (m) => m.id === moduleId
    );



    useEffect(() => {
        if (lessons) {
            setOrderedLessons(lessons);
        }
    }, [lessons]);

    useEffect(() => {
        if (renameLessonId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameLessonId]);






    const handleReorder = () => {
        setIsReorderMode(true);

    }
    useEffect(() => {
        function handleClickOutside(e) {
            if (!isOpenDropdown) return;

            const currentRow = rowRefs.current[isOpenDropdown];

            if (currentRow && !currentRow.contains(e.target)) {
                setIsOpenDropdown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenDropdown]);

    if (lessonsError) return <div className="p-10 text-red-500">Error loading lessons.</div>;

    const handleRename = (lessonId) => {
        const lesson = orderedLessons.find(l => l.id === lessonId);
        setRenameLessonId(lessonId);
        setRenameValue(lesson?.title || "");
        setIsOpenDropdown(null);

    }

    const handleDeleteLesson = async (lessonId) => {


        if (!lessonId) return;

        try {
            await deleteLesson(lessonId);

            addToast("Lesson deleted successfully.", "success");

            setOrderedLessons(prev =>
                prev.filter(lesson => lesson.id !== lessonId)
            );

        } catch (error) {
            console.error("Delete Lesson Error:", error);

            const status = error?.response?.status;

            let message = "Failed to delete lesson. Please try again.";

            if (status === 400) {
                message = "Invalid request. Unable to delete lesson.";
            } else if (status === 401) {
                message = "Session expired. Please login again.";
            } else if (status === 403) {
                message = "You are not allowed to delete this lesson.";
            } else if (status === 404) {
                message = "Lesson not found or already deleted.";
            } else if (status === 409) {
                message = "Lesson cannot be deleted due to dependencies.";
            } else if (status >= 500) {
                message = "Server error. Please try again later.";
            }

            addToast(message, "error");
        }
    };


    async function renameLessonHandler(lessonId) {
        const newTitle = renameValue.trim();

        if (!newTitle) return;

        try {
            await updateLesson(lessonId, { title: newTitle });

            setOrderedLessons(prev =>
                prev.map(l =>
                    l.id === lessonId ? { ...l, title: newTitle } : l
                )
            );
            addToast("Lesson Renamed", "success")

            setRenameLessonId(null);
        } catch (err) {
            console.error(err);

            const status = err?.response?.status;

            let message = "Failed to update lesson. Please try again.";

            if (status === 400) {
                message = "Invalid input. Please check the lesson details.";
            } else if (status === 401) {
                message = "Session expired. Please login again.";
            } else if (status === 403) {
                message = "You are not allowed to update this lesson.";
            } else if (status === 404) {
                message = "Lesson not found.";
            } else if (status === 409) {
                message = "A lesson with this title already exists. Please use a different name.";
            } else if (status === 422) {
                message = "Please provide valid lesson information.";
            } else if (status >= 500) {
                message = "Server error. Please try again later.";
            }

            addToast(message, "error");
        }
    }




    return (
        <div className="space-y-4">
            <div className='flex justify-between'>
                <h2 className="text-h4 md:text-h3 truncate">{selectedModule?.title}</h2>
                <div className='flex gap-px'>
                    <span className=' flex gap-3'>

                        {isReorderMode
                            ? <Button buttonName='Done' frontIconWidth="24px" frontIconHeght="24px" frontIconName='material-symbols:done-rounded' className="p-1 px-4 rounded" onClick={() => setIsReorderMode(false)} />
                            : <div className='relative flex flex-row gap-px'>
                                <Button
                                    buttonName="Edit Details"
                                    frontIconName='mingcute:pencil-line'
                                    frontIconWidth="24px"
                                    frontIconHeght="24px"
                                    className="p-1 rounded-r-none rounded font-semibold text-md"
                                    bgClass=""
                                    textClass=""
                                    isMobile={isMobile}
                                    onClick={() => navigate(`/course/${courseSlug}/content/modules/${moduleId}/edit`)}
                                />
                                <Button
                                    frontIconName="subway:down-2"
                                    frontIconWidth="16px"
                                    frontIconHeght="16px"
                                    className="p-2 px-2 rounded-l-none rounded"
                                    onClick={() => setOpenDropDown((prve) => !prve)}
                                />
                                {openDropDown && <Dropdown buttons={editButtons(handleReorder)} closeDropdown={() => setOpenDropDown(false)} />}
                            </div>
                        }
                        <NavLink to={`/course/${courseSlug}/content/modules/${moduleId}/lesson/create`}>
                            <Button
                                buttonName="Add New Lesson"
                                frontIconName='ic:baseline-plus'
                                frontIconWidth="24px"
                                frontIconHeght="24px"
                                className="p-1 rounded font-semibold text-md"
                                bgClass=""
                                textClass=""
                                isMobile={isMobile}
                            />
                        </NavLink>
                    </span>
                </div>
            </div>
            <MarkdownContent content={selectedModule?.description} />
            {isReorderMode
                ? <ReorderList
                    items={orderedLessons}
                    reorder={reorderLessons}
                    isUpdating={isUpdating}
                    addToast={addToast}
                />
                : lessonLoading ? (
                    <div className="h-full w-full">
                        <ContentLoading count={7} />
                    </div>
                ) : !lessonLoading && orderedLessons.length > 0 ? (
                    <div>
                        {orderedLessons.map((lesson, index) => {
                            const isOpen = isOpenDropdown === lesson.id;
                            return (
                                <div key={lesson.id}
                                    ref={(el) => (rowRefs.current[lesson.id] = el)}
                                >
                                    <div
                                        className={clsx(
                                            'flex gap-2 items-center p-2 lg:px-5 py-3 rounded text-h45 hover:bg-primary/16 dark:hover:bg-primary', loading ? "cursor-progress" : "cursor-pointer",
                                            (isOpenDropdown === lesson.id || renameLessonId === lesson.id) && 'bg-primary/16'
                                        )}
                                        onDoubleClick={() => navigate(`/course/${courseSlug}/content/modules/${moduleId}/lesson/${lesson.id}/view`)}
                                        onClick={(e) => {
                                            if (isOpenDropdown === lesson.id) {
                                                e.preventDefault();   // stop navigation
                                                setIsOpenDropdown(null); // close dropdown
                                            }
                                        }}
                                    >
                                        <Icon name={`${lesson.mimeType === 'video/mp4' ? "ep:video-play" : "basil:document-outline"}`} height="25px" width="25px" />
                                        <div className='flex items-center gap-2 w-full min-w-0'>
                                            <span className="py-1 mr-2">
                                                {index + 1}.
                                            </span>
                                            {renameLessonId === lesson.id ? (
                                                <Input
                                                    ref={inputRef}
                                                    value={renameValue}
                                                    onChange={(e) => setRenameValue(e.target.value)}
                                                    autoFocus
                                                    className="text-sm"
                                                    bgClass="bg-primary-border"
                                                    onBlur={() => setRenameLessonId(null)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setRenameLessonId(null);
                                                            renameLessonHandler(lesson.id);
                                                        }

                                                        if (e.key === "Escape") {
                                                            setRenameLessonId(null);
                                                        }
                                                    }}
                                                />
                                            )
                                                : (
                                                    <span className="truncate flex-1">
                                                        {lesson.title}
                                                    </span>
                                                )}
                                            <div
                                                className='relative flex justify-center  mr-5'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setIsOpenDropdown(prev =>
                                                        prev === lesson.id ? null : lesson.id
                                                    );
                                                }}
                                            >
                                                <Icon name="iconamoon:menu-kebab-horizontal" height="32px" width="32px" className="cursor-help" />
                                                {isOpen && (
                                                    <Dropdown
                                                        buttons={buttons(courseSlug, moduleId, handleRename, lesson.id, navigate, setDeleteLessonId)}
                                                        closeDropdown={() => {
                                                            setIsOpenDropdown(null);
                                                        }}
                                                    />
                                                )}
                                                {deleteLessonId === lesson.id && (
                                                    <Modal
                                                        isOpen={true}
                                                        onClose={() => setDeleteLessonId(null)}
                                                        title="Are you absolutely sure?"
                                                    >
                                                        <DeleteConfirmContent
                                                            onClose={() => setDeleteLessonId(null)}
                                                            onConfirm={() => handleDeleteLesson(lesson.id)}
                                                            loading={isDeleteingLesson}
                                                            confirmText={lesson.title}
                                                            entityName="module"
                                                            message={`You are about to permanently delete the ${lesson.title} lesson. All associated materials, student progress, and data tied to this lesson will be permanently erased from the system.`}
                                                        />
                                                    </Modal>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>)
                    : <div className="h-full w-full">
                        <EmptyStateUI
                            title="No Lessons Found"
                            description="You have not added any lessons to this Module yet, Start building your course by adding Lessons."
                            buttonText="Add New Lesson"
                            onButtonClick={() => navigate(`/course/${courseSlug}/content/modules/${moduleId}/lesson/create`)}
                        />
                    </div>
            }
        </div>
    )
}

export default LessonsEditor
