import { AnimatePresence, motion } from "motion/react"
import BackButton from "@/components/navigation/BackButton";
import { Icon } from '@/components/ui'
import clsx from "clsx"
import { useParams, useNavigate } from "react-router-dom";


export default function AssignmentAsideSection({ assignments }) {

    const { courseSlug, assignmentId } = useParams();


    const navigate = useNavigate();

    return (
        <aside className="w-full h-full lg:sidebar-sm 2xl:sidebar-lg border-r-2 border-default bg-muted/40">
            <div className="hidden lg:block p-4 border-b-2 border-default w-full">
                <BackButton to={`/course/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
            </div>

            <ul
                className='space-y-1 overflow-hidden'
            >
                {assignments?.map((assignment, assignmentIndex) => {
                    const isActive = assignmentId === assignment.id;

                    return (
                        <li key={assignment.id} >
                            <button
                                type="button"
                                onClick={() => navigate(`/course/${courseSlug}/assignments/${assignment.id}`)}
                                className={clsx(
                                    "flex h-16 w-full border-primary items-center gap-4 text-dark-gray",
                                    isActive ? "bg-primary/16 dark:bg-primary text-primary dark:text-background border-x-8 p-2" : "hover:bg-primary/16 text-muted p-4"
                                )}
                            >
                                <Icon name="material-symbols:assignment-outline" height="26" width="26" />
                                <p className="text-h5 truncate">
                                    Assignment {assignmentIndex + 1} - {assignment.title}
                                </p>

                            </button>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}
