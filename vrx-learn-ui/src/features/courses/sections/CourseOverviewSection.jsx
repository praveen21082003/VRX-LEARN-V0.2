

import {CourseTumbnail, Icon} from "@/components/ui";
import { formatMinutes } from "@/utils/duration";
import { Button } from "@/components/ui";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CourseOverviewSection({ course, can }) {
  const { courseSlug } = useParams();

  const totalLessonMinutes =
    course.module_duration +
    course.assignment_duration +
    course.lab_duration +
    course.quiz_duration +
    course.feedback_duration;

  return (
    <div className="flex gap-6 items-start px-10 pt-7">
      <CourseTumbnail name={course.name} image={course.thumbnail} classRounded="rounded-lg" />

      <div className="space-y-3 flex-1">
        <div className="flex justify-between">
          <h2 className="text-[26px] font-semibold">{course.name}</h2>
        </div>


        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Instructor:{" "}
            <span className="text-foreground">
              {course.author}
            </span>
          </p>
          <div className="flex items-center text-sm text-muted-foreground text-dark-gray">
            <span>Course</span>
            <Icon name="ph:dot-bold" />
            <span>{formatMinutes(totalLessonMinutes)}</span>
            <Icon name="ph:dot-bold" />
            <span>{course.progess_status}</span>
          </div>
        </div>


        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {course.short_description}
        </p>
      </div>
    </div>
  );
}
