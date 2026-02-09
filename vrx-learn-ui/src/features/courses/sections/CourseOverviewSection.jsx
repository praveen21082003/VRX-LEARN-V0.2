import { Dot } from "lucide-react";
import CourseThumbnail from "@/components/ui/CourseTumbnail";
import { formatMinutes } from "@/utils/duration";

export default function CourseOverviewSection({ course }) {

  const totalLessonMinutes = 
    course.module_duration +
    course.assignment_duration +
    course.lab_duration +
    course.quiz_duration+
    course.feedback_duration;

  return (
    <div className="flex gap-6 items-start px-10 pt-7">
      <CourseThumbnail name={course.name} image={course.thumbnail} />

      <div className="space-y-3 flex-1">
        <h2 className="text-[26px] font-semibold">{course.name}</h2>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Instructor:{" "}
            <span className="text-foreground">
              {course.author}
            </span>
          </p>
          <div className="flex items-center text-sm text-muted-foreground text-dark-gray">
            <span>Course</span>
            <Dot />
            <span>{formatMinutes(totalLessonMinutes)}</span>
            <Dot />
            <span>{course.progess_status}</span>
          </div>
        </div>


        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {course.description}
        </p>
      </div>
    </div>
  );
}
