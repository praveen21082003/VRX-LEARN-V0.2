import React, { useState, useEffect, useRef } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx'


import { Button, Icon, Dropdown, MarkdownContent, Input } from '@/components/ui'
import ReorderList from '@/components/dnd/ReorderList';
import { useToast } from '@/context/ToastProvider';



import useModule from '../../hooks/useModule';
import useUpdateLesson from '../../hooks/useUpdateLesson';
import { editButtons, buttons } from '@/config/DropdownButtons.js'


function LessonsEditor() {

    const isMobile = window.innerWidth < 768;

    const navigate = useNavigate();
    const inputRef = useRef();
    const rowRefs = useRef({});
    const { updateLesson } = useUpdateLesson();
    const { addToast } = useToast();


    const { moduleId, courseSlug } = useParams();
    const { module, loading, error } = useModule(moduleId);
    const [isReorderMode, setIsReorderMode] = useState(false);
    const [orderedLessons, setOrderedLessons] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(null);
    const [renameLessonId, setRenameLessonId] = useState(null);
    const [renameValue, setRenameValue] = useState("");



    useEffect(() => {
        if (module?.lessons) {
            setOrderedLessons(module.lessons);
        }
    }, [module]);

    useEffect(() => {
        if (renameLessonId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // optional → selects text
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

    if (loading) return <p>Loading...</p>

    const handleRename = (lessonId) => {
        const lesson = orderedLessons.find(l => l.id === lessonId);
        setRenameLessonId(lessonId);
        setRenameValue(lesson?.title || "");
        setIsOpenDropdown(null);

    }


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
        } catch (error) {
            console.error(error);
            addToast("Error Occured", "error")
        }
    }




    return (
        <div className="space-y-4">
            <div className='flex justify-between'>
                <h2 className="text-h4 md:text-h3 truncate">{module?.title}</h2>
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
                                    onClick={()=> navigate(`/course/${courseSlug}/content/modules/${moduleId}/edit`)}
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
            <MarkdownContent content={module?.description} />
            {isReorderMode
                ? <ReorderList items={orderedLessons} />
                : <div>
                    {orderedLessons.map((lesson, index) => {
                        const isOpen = isOpenDropdown === lesson.id;
                        return (
                            <div key={lesson.id}
                                ref={(el) => (rowRefs.current[lesson.id] = el)}
                            >
                                <NavLink
                                    className={clsx(
                                        'flex gap-2 items-center p-2 lg:px-5 py-3 rounded text-h45 hover:bg-primary/16 dark:hover:bg-primary cursor-pointer',
                                        isOpenDropdown === lesson.id || renameLessonId === lesson.id && 'bg-active'
                                    )}
                                    onDoubleClick={() => navigate(lesson.id)}
                                    onClick={(e) => {
                                        if (isOpenDropdown === lesson.id) {
                                            e.preventDefault();   // stop navigation
                                            setIsOpenDropdown(null); // close dropdown
                                        }
                                    }}
                                >
                                    <Icon name={`${lesson.type === 'video' ? "ep:video-play" : "basil:document-outline"}`} height="25px" width="25px" />
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
                                                        renameLessonHandler(module.id);
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
                                            className='relative flex justify-center'
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
                                                    buttons={buttons(courseSlug, moduleId,handleRename,lesson.id, navigate)} 
                                                    closeDropdown={() => {
                                                        setIsOpenDropdown(null);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default LessonsEditor
