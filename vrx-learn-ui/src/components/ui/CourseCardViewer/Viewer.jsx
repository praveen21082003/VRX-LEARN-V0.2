import React from 'react'
import CourseCard from "@/components/ui/CourseCard";

function Viewer({
  title, 
  courses, 
  maxCourses, 
  gridSize = 3 }) {

  const visibleCourses = maxCourses
    ? courses.slice(0, maxCourses)
    : courses;

  return (
    <section className="relative bg-primary/16 noise-overlay p-4 flex-[0_0_40%] rounded-xl">
      <header className="flex justify-between mb-4">
        <h2 className="text-h4 text-main">{title}</h2>
        {!maxCourses && <button className="text-sm underline">View all</button>}
      </header>

      <div className={`grid grid-cols-${gridSize} gap-3`}>
        {visibleCourses.map(course => (
          <CourseCard
            key={course.id}
            name={course.name}
            author={course.author}
            image={course.thumbnail}
            buttonName="View Details"
            bgClass="bg-white"
            textClass="text-black"
          />
        ))}
      </div>
    </section>
  );
}

export default Viewer;