import { AnimatePresence, motion } from "motion/react"
import BackButton from "@/components/navigation/BackButton";
import clsx from "clsx"


export default function AssignmentAsideSection({ assignments, activeAssignment, setActiveAssignment }) {

    return (
        <aside className="hidden w-90 2xl:w-120 border-r-2 border-[#D9D9D9] bg-muted/40 py-1 md:block">
            <div className="p-1"><BackButton to=".." /></div>
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
                                        "flex h-16 w-full border-primary items-center gap-4 font-semibold",
                                        isActive ? "bg-[#D9D9D9] text-primary border-x-8 p-2" : "hover:bg-primary/5 p-4"
                                    )}
                                >

                                    <span className="material-symbols-outlined text-[22px]">
                                        assignment
                                    </span>
                                    <p className="text-sm truncate">
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
