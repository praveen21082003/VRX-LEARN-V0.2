import React from 'react'
import CourseCard from "@/components/ui/Cards";
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

function Viewer({
  title,
  courses,
  maxCourses,
  getButtonName,
  vertical = false,
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
    <section className="relative bg-primary/16 noise-overlay p-4 rounded-xl">
      <header className="flex justify-between mb-4">
        <h2 className="text-h4 text-main">{title}</h2>
        {maxCourses && <button className="text-sm text-main underline cursor-pointer" onClick={() => navigate('/courses')}>View all</button>}
      </header>

      <div
        className={clsx(
          vertical
            ? [
              "flex flex-col gap-4 items-center overflow-y-auto",   // mobile
              "md:grid md:overflow-visible",          // tablet+
              gridSize === 1 && "md:grid-cols-1",
              gridSize === 2 && "md:grid-cols-2",
              gridSize === 3 && "md:grid-cols-3",
              gridSize === 4 && "sm:grid-cols-2 lg:grid-cols-4"
            ]
            : [
              "flex gap-4 overflow-x-auto snap-x snap-mandatory", // mobile scroll
              "md:grid md:overflow-visible",
              gridSize === 1 && "md:grid-cols-1",
              gridSize === 2 && "md:grid-cols-2",
              gridSize === 3 && "md:grid-cols-3",
              gridSize === 4 && "md:grid-cols-4"
            ]
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
              vertical={vertical}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Viewer;