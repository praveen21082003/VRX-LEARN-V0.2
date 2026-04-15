import { useEffect } from "react";
import { useParams, useOutletContext, NavLink } from "react-router-dom";

import useCourseContent from "@/features/courses/hooks/useCourseContent";
import { usePermission } from "@/hooks/usePermission"
import { CourseTumbnail, Icon, FloatingMenu, FillPageLoading } from "@/components/ui";
import { formatTime } from "@/utils/duration";
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

import { TRAINEE_SECTIONS } from "@/config/courseOverview";
import { TRAINER_SECTIONS } from "@/config/courseOverview";
import { useAuth } from "@/context/AuthContext"

import CourseContentPlaceholder from "@/features/courses/components/CourseContentPlaceholder";


function CourseOverView() {
    const { viewRole, role } = useAuth();
    const { courseSlug } = useParams();
    const { fetchCourseOverview, courseOverview, loading, error } = useCourseContent();

    const effectiveRole = viewRole || role

    useEffect(() => {
        fetchCourseOverview(courseSlug, effectiveRole);
    }, [courseSlug, effectiveRole, fetchCourseOverview]);

    const title = capitalizeFirstLetter(courseOverview?.title)


    const { setCourseBreadcrumb } = useOutletContext();

    const { can } = usePermission();

    useEffect(() => {
        if (!courseOverview?.title) return;

        setCourseBreadcrumb(title);
    }, [courseOverview?.title]);


    if (loading) {
        return <FillPageLoading />;
    }
    if (error) return <p>Failed to load course</p>;
    if (!courseOverview) return null;


    const totalLessonMinutes =
        courseOverview.module_duration +
        courseOverview.assignment_duration +
        courseOverview.lab_duration +
        courseOverview.quiz_duration +
        courseOverview.feedback_duration;




    // const sections =
    //     can("UPDATE_COURSE")
    //         ? TRAINER_SECTIONS
    //         : TRAINEE_SECTIONS;

    const baseSections =
        can("UPDATE_COURSE")
            ? TRAINER_SECTIONS
            : TRAINEE_SECTIONS;

    const sections = baseSections.map((section) => {
        if (section.key === "assignments") {
            return {
                ...section,
            };
        }
        return section;
    });


    const renderCourseOverview = () => {

        const hasContent = (courseOverview?.noOfModules || 0) > 0 || (courseOverview?.noOfAssignments || 0) > 0;

        if (!hasContent && !can("UPDATE_COURSE")) {
            return (
                <div className="w-full flex justify-center">
                    <CourseContentPlaceholder />
                </div>
            );
        }   

        return (
            <div className="space-y-1 py-4 px-4 lg:px-6 lg:py-2 text-main">
                {sections.map((section) => {

                    const description =
                        typeof section.MetaData === "function"
                            ? section.MetaData(courseOverview)
                            : null;

                    return (
                        <NavLink
                            key={section.key}
                            to={`/course/${courseSlug}/${section.key}`}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-2 transition-colors
                                ${isActive ? "bg-primary-16" : "hover:bg-primary/16"}`
                            }
                        >
                            {section.icon && (
                                <Icon name={section.icon} height="32" width="32" />
                            )}
                            <div className="flex justify-between w-full items-center">
                                <div className="space-y-0">


                                    <h3 className="text-h4">{section.title}</h3>

                                    {/* Trainer Description */}
                                    {description && (
                                        <p className="text-body text-muted">
                                            {description}
                                        </p>
                                    )}

                                    {/* Trainee Meta + Duration
                                    {!description && (meta || duration) && (
                                        <div className="flex items-center gap-1 text-body text-dark-gray">
                                            {meta && <span>{meta}</span>}
                                            {meta && duration && <Icon name="ph:dot-bold" />}
                                            {duration && (
                                                <>
                                                    <Icon name="mdi:clock-outline" height="16" width="16" />
                                                    <span>{duration}</span>
                                                </>
                                            )}
                                        </div>
                                    )} */}
                                </div>

                                <span className="text-xl font-bold">{">"}</span>
                            </div>
                        </NavLink>
                    );
                })}
            </div>
        )
    }




    return (
        <div className="space-y-6 p-4">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start text-main min-w-0">
                <div className="w-full md:w-[320px]">
                    <CourseTumbnail name={title} image={courseOverview.thumbnail} classRounded="rounded-lg" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="hidden lg:flex justify-between">
                        <h2 className="text-h2">{title}</h2>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Instructor:{" "}
                            <span className="text-foreground">
                                {courseOverview.trainerName}
                            </span>
                        </p>
                        <div className="flex flex-wrap items-center gap-1 text-body text-muted">
                            <span>Course</span>
                            <Icon name="ph:dot-bold" />
                            <span>{totalLessonMinutes ? formatTime(totalLessonMinutes) : "Duration TBD"}</span>
                            <Icon name="ph:dot-bold" />
                            <span>{courseOverview?.progess_status || "Not Started"}</span>
                        </div>
                    </div>


                    <p className="text-body text-muted-foreground line-clamp-3">
                        {courseOverview?.shortDescription || <span className="italic">No description available.</span>}
                    </p>

                </div>
            </div>


            {renderCourseOverview()}



            <div>
                {can("UPDATE_COURSE")
                    && <FloatingMenu
                        actions={[
                            { label: "Module", icon: "codicon:file-submodule", path: "modules" },
                            { label: "Assignments", icon: "material-symbols:assignment-outline", path: "assignments" },
                            // { label: "Lab Credentials", icon: "ooui:lab-flask", path: "lab" },
                            // { label: "Quiz", icon: "hugeicons:quiz-05", path: "quiz" },
                        ]}
                    />
                }
            </div>
        </div>
    )
}

export default CourseOverView
