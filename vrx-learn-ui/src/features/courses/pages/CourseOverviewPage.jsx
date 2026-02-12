import { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useCourseContent from "@/features/courses/hooks/useCourseContent";
import CourseOverviewSection from "../sections/CourseOverviewSection";
import CourseTabsSection from "../sections/CourseTabsSection";
import {usePermission} from "@/hooks/usePermission"

export default function CourseOverviewPage() {
    const { courseSlug } = useParams();
    const { courseContent, loading, error } = useCourseContent(courseSlug);
    const { setCourseBreadcrumb } = useOutletContext();

    const {can} = usePermission();

    useEffect(() => {
        if (!courseContent?.name) return;

        setCourseBreadcrumb(courseContent.name);
    }, [courseContent?.name]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Failed to load course</p>;
    if (!courseContent) return null;



    return (
        <>
            <CourseOverviewSection course={courseContent} can={can}/>
            <CourseTabsSection course={courseContent} error={error} />
        </>
    );
}
