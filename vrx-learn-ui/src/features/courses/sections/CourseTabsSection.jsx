import { NavLink, useParams } from "react-router-dom";
import { formatMinutes } from "@/utils/duration";
import sideArrow from "@/assets/images/side_arrow.svg";
import {Icon} from '@/components/ui'

export default function CourseTabsSection({ course }) {
    const { courseSlug } = useParams();


    const moduleCount = course.module_count;
    const totalLessonMinutes = course.module_duration;
    const assignmentMinutes = course.assignment_duration;
    const quizMinutes = course.lab_duration;
    const labMinutes = course.quiz_duration;
    const feedbackMinutes = course.feedback_duration;

    const sections = [
        { key: "lessons", title: "Lessons", duration: formatMinutes(totalLessonMinutes), meta: `${moduleCount} Modules` },
        { key: "assignments", title: "Assignment", duration: formatMinutes(assignmentMinutes) },
        { key: "labs", title: "Lab Credentials", duration: formatMinutes(labMinutes) },
        { key: "quizzes", title: "Quiz", duration: formatMinutes(quizMinutes)},
        { key: "feedback", title: "Feedback", duration: formatMinutes(feedbackMinutes)}
    ];

    return (
        <div className="space-y-1 py-2 px-4 lg:px-10 lg:py-3 text-main">
            {sections.map((section) => (
                <NavLink
                    key={section.key}
                    to={`/learn/${courseSlug}/${section.key}`}
                    className={({ isActive }) =>
                        `flex justify-between items-center rounded-lg px-4 py-1
                    ${isActive ? "bg-active" : "hover:bg-hover-active"}`
                    }
                >
                    <div>
                        <h3 className="text-h3">{section.title}</h3>

                        {(section.duration || section.meta) && (
                            <div className="flex items-center gap-1 text-body text-dark-gray">
                                {section.meta && <span>{section.meta}</span>}
                                {section.meta && section.duration && <Icon name="ph:dot-bold" />}
                                {section.duration && (
                                    <>
                                        <Icon name="mdi:clock-outline" height="16" width="16"/>
                                        <span>{section.duration}</span>
                                        
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <img src={sideArrow} alt="arrow" className="w-4 h-4" />
                </NavLink>
            ))}
        </div>
    );
}
