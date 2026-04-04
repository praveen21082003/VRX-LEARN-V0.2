import React from 'react'
import CourseCard from "@/components/ui/Cards";
import { IconContainer } from "@/components/ui"
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { CourseCardLoading } from "./CourseCardLoading";

function Viewer({
  myCourses = false,
  loading,
  title,
  courses,
  maxCourses,
  getButtonName,
  vertical = false,
  gridSize = 3 }) {


  console.log(courses);

  const navigate = useNavigate();

  const isEmpty = !loading && (!courses || courses.length === 0);


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
      route: `/course/${course.courseId}`
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

      {isEmpty && myCourses ? (
        <div className='flex justify-center my-16 w-full h-full'>

          <div className='flex flex-col gap-4 justify-center items-center w-[364px] h-[188px]'>

            <IconContainer icon="uil:book-open" />

            <div className='flex flex-col gap-2 text-center'>
              <h4 className='text-h4 font-bold text-main'>No Courses enrolled yet</h4>
              <p className='text-body text-muted max-w-[320px]'>
                You aren't enrolled in any courses yet. Explore the courses to get started.
              </p>
            </div>

          </div>
        </div>
      )
        : (
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

            {loading ? (
              [...Array(maxCourses || 3)].map((_, i) => (
                <CourseCardLoading key={i} />
              ))
            ) : (
              visibleCourses.map(course => {
                const btn = getButtonStyle(course);

                return (
                  <CourseCard
                    key={course.courseId}
                    name={course.courseName}
                    author={course.trainerName}
                    image={course.thumbnail}
                    buttonName={btn.name}
                    bgClass={btn.bg}
                    textClass={btn.text}
                    onClick={() => navigate(btn.route)}
                    vertical={vertical}
                  />
                );
              })
            )}
          </div>
        )}

    </section>
  );
}

export default Viewer;