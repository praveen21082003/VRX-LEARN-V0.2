import LessonViewer from "@/components/navigation/routers/LessonViewer";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

export default function LessonView() {
    const { lessons, courseContent } = useOutletContext();
    const { lessonId, courseSlug, moduleId } = useParams();
    const navigate = useNavigate();

    if (!lessons || lessons.length === 0) {
        return <p>Loading...</p>;
    }
    

    const moduleIndex = courseContent?.modules?.findIndex(
        (m) => String(m.id) === String(moduleId)
    );

    const currentIndex = lessons.findIndex(
        (l) => String(l.id) === String(lessonId)
    );



    const prevLesson = lessons[currentIndex - 1];
    const nextLesson = lessons[currentIndex + 1];

    const goToLesson = (lesson) => {
        if (!lesson) return;

        navigate(
            `/course/${courseSlug}/content/modules/${moduleId}/lesson/${lesson.id}/view`
        );
    };

    return (
        <LessonViewer
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            onNavigate={goToLesson}
            moduleIndex={moduleIndex}
            currentIndex={currentIndex}
        />
    );
}