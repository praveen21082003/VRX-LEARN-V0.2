import React from 'react'
import CourseCard from "@/components/ui/CourseCard";
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

function Viewer({
  title,
  courses,
  maxCourses,
  getButtonName,
  gridSize = 3 }) {

  const navigate = useNavigate();


  const getButtonStyle = (course) => {
    if (course.progress > 0 && getButtonName) {
      return {
        name: "Resume",
        bg: "bg-primary",
        text: "text-white",
        route: `/course/${course.id}`
      };
    }

    if (course.progress === 0 && getButtonName) {
      return {
        name: "Start Learning",
        bg: "bg-transparent border",
        text: "text-main",
        route: `/course/${course.id}`
      };
    }

    return {
      name: "View Details",
      bg: "bg-transparent border",
      text: "text-main",
      route: `/course/${course.id}`
    };
  };



  const visibleCourses = maxCourses
    ? courses.slice(0, maxCourses)
    : courses;

  return (
    <section className="relative bg-primary/16 noise-overlay p-4 flex-[0_0_40%] rounded-xl">
      <header className="flex justify-between mb-4">
        <h2 className="text-h4 text-main">{title}</h2>
        {maxCourses && <button className="text-sm text-main underline">View all</button>}
      </header>

      <div
        className={clsx(
          "grid gap-3",
          gridSize === 1 && "grid-cols-1",
          gridSize === 2 && "grid-cols-2",
          gridSize === 3 && "grid-cols-3",
          gridSize === 4 && "grid-cols-4"
        )}
      >
        {visibleCourses.map(course => {
          const btn = getButtonStyle(course);

          return (
            <CourseCard
              key={course.id}
              name={course.name}
              author={course.author}
              image={course.thumbnail}
              buttonName={btn.name}
              bgClass={btn.bg}
              textClass={btn.text}
              onClick={() => navigate(btn.route)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Viewer;