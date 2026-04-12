
import LessonViewer from '@/components/navigation/routers/LessonViewer'

function LessonsMainSection({ activeLesson, prevLesson, nextLesson, onNavigate }) {

  console.log(activeLesson)

  return (
    <LessonViewer
      activeLesson={activeLesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      onNavigate={onNavigate}
    />
  );
}

export default LessonsMainSection;
