import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Button, Icon, Dropdown, MarkdownContent } from '@/components/ui'
import ReorderList from '@/components/dnd/ReorderList';
import { NavLink } from 'react-router-dom';



import { useParams } from 'react-router-dom';
import useModule from '../../hooks/useModule';

function LessonsEditor() {
    const { moduleId, courseSlug } = useParams();
    const { module, loading, error } = useModule(moduleId);
    const [isReorderMode, setIsReorderMode] = useState(false);
    const [orderedLessons, setOrderedLessons] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);

    const buttons = [
        { key: "rename", title: "Rename", icon: "ix:rename", onClick: () => alert("rename clicked") },
        { key: "reorder", title: "Reorder", icon: "ix:reorder", onClick: () => setIsReorderMode(true) },
        { key: "delete", title: "Delete", icon: "ic:baseline-delete", onClick: () => alert("delete clicked") },
    ];

    useEffect(() => {
        if (module?.lessons) {
            setOrderedLessons(module.lessons);
        }
    }, [module]);

    if (loading) return <p>Loading...</p>

    return (
        <div className="space-y-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold flex items-center gap-3">{module?.title}</h2>
                <div className='flex gap-px'>
                    <span className=' flex gap-3'>
                        <NavLink to={`/admin/courses/${courseSlug}/create/lesson`}>
                            <Button buttonName="Add New Lesson" frontIconName='ic:baseline-plus' frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="text-primary" />
                        </NavLink>
                        {isReorderMode
                            ? <Button buttonName='Done' frontIconWidth="24px" frontIconHeght="24px" frontIconName='material-symbols:done-rounded' className="p-1 px-4 rounded" onClick={() => setIsReorderMode(false)} />
                            : <div className='relative flex gap-px'>
                                <Button buttonName="Edit Details" frontIconName='mingcute:pencil-line' frontIconWidth="24px" frontIconHeght="24px" className="p-1 rounded font-semibold text-md" bgClass="bg-white" textClass="text-primary" />
                                <Button frontIconName="subway:down-2" frontIconWidth="16px" frontIconHeght="16px" className="p-2 px-2 rounded" onClick={() => setOpenDropDown((prve) => !prve)} />
                                {openDropDown && <Dropdown buttons={buttons} closeDropdown={() => setOpenDropDown(false)} />}
                            </div>
                        }
                    </span>
                </div>
            </div>
            <MarkdownContent content={module?.description} />
            {isReorderMode
                ? <ReorderList items={orderedLessons} />
                : <div>
                    {orderedLessons.map((lesson, index) => (
                        <div key={lesson.id} className='flex gap-2 items-center px-3 py-3 rounded font-semibold hover:text-primary  hover:bg-active'>
                            <Icon name={`${lesson.type === 'video' ? "ep:video-play" : "basil:document-outline"}`} height="25px" width="25px" />
                            <div className='flex justify-between w-full items-center'>
                                <span className="py-1">
                                    {index + 1}.{lesson.title}
                                </span>
                                <Icon name="pepicons-pencil:dots-x" height="25px" width="25px" />
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default LessonsEditor
