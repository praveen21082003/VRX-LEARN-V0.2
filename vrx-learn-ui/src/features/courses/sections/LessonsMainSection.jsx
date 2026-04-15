
import LessonViewer from '@/components/navigation/routers/LessonViewer'

function LessonsMainSection({ activeLesson, prevLesson, nextLesson, onNavigate }) {

  console.log(activeLesson)

  return (
    <div className="flex-1 overflow-y-auto">
      <LessonViewer
        activeLesson={activeLesson}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default LessonsMainSection;
