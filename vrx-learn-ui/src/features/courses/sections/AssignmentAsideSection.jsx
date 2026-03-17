import { AnimatePresence, motion } from "motion/react"
import BackButton from "@/components/navigation/BackButton";
import { Icon } from '@/components/ui'
import clsx from "clsx"
import { useParams } from "react-router-dom";


export default function AssignmentAsideSection({ assignments, activeAssignment, setActiveAssignment, openAssignments, setOpenAssignments }) {

    const { courseSlug } = useParams();

    return (
        <aside className="w-full h-full lg:sidebar-sm 2xl:sidebar-lg border-r-2 border-default bg-muted/40 md:block">
            <div className="hidden lg:block p-4 border-b-2 border-default w-full">
                <BackButton to={`/course/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
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
            <AnimatePresence>
                {openAssignments && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenAssignments(false)}
                    >

                        <motion.div
                            className="absolute bottom-0 left-0 right-0
                   bg-white rounded-t-xl max-h-[85vh] overflow-y-auto"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="font-semibold text-lg">Assignments</h2>

                                <button onClick={() => setOpenAssignments(false)}>
                                    <Icon name="mdi:close" width="24" />
                                </button>
                            </div>

                            {assignments.map((assignment, index) => {
                                const isActive = activeAssignment?.assignmentId === assignment.id;

                                return (
                                    <button
                                        key={assignment.id}
                                        onClick={() => {
                                            setActiveAssignment({ assignmentId: assignment.id });
                                            setOpenAssignments(false);
                                        }}
                                        className={clsx(
                                            "flex items-center justify-between w-full p-4 border-b",
                                            isActive
                                                ? "bg-primary/16 text-primary"
                                                : "hover:bg-muted"
                                        )}
                                    >
                                        <span>
                                            Assignment {index + 1} - {assignment.title}
                                        </span>

                                        <Icon name="material-symbols:assignment-outline" width="20" />
                                    </button>
                                );
                            })}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    )
}
