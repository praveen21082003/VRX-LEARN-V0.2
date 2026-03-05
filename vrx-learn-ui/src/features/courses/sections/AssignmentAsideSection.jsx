import { AnimatePresence, motion } from "motion/react"
import BackButton from "@/components/navigation/BackButton";
import { Icon } from '@/components/ui'
import clsx from "clsx"
import { useParams } from "react-router-dom";


export default function AssignmentAsideSection({ assignments, activeAssignment, setActiveAssignment }) {

    const { courseSlug } = useParams();

    return (
        <aside className="hidden sidebar-sm 2xl:sidebar-lg border-r-2 border-default bg-muted/40 md:block">
            <div className="p-4 border-b-2 border-default w-full">
                <BackButton to={`/learn/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
            </div>
            <AnimatePresence>
                <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='space-y-1 overflow-hidden'
                >
                    {assignments?.map((assignment, assignmentIndex) => {
                        const isActive = activeAssignment?.assignmentId === assignment.id;

                        return (
                            <li key={assignment.id} >
                                <button
                                    type="button"
                                    onClick={() => setActiveAssignment({ assignmentId: assignment.id })}
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
                </motion.ul>
            </AnimatePresence>
        </aside>
    )
}
