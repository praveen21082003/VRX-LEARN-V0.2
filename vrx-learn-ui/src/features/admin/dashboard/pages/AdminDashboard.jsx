import React from 'react'
import { Icon } from '@/components/ui'

function AdminDashboard() {


  const quickAction = [
    {
      icon: "mdi:users",
      title: "New User",
      caption: "Create account",
      bgClass: "bg-primary"
    },
    {
      icon: "mdi:book-education-outline",
      title: "New Course",
      caption: "Publish content"
    },
    {
      icon: "mdi:book-account",
      title: "Enroll Trainee",
      caption: "Assign to course"
    }
  ]


  const data = [
    {
      "id": 1,
      "title": "Advanced Web Development",
      "description": "The z/OS System Programming course provides an in-depth understanding of IBM mainframe operating systems.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 130,
      "date": "2026-01-02"
    },
    {
      "id": 2,
      "title": "Advanced UI/UX Design: Prototyping in Figma",
      "description": "Master the principles of user-centric design, from initial wireframing to high-fidelity prototyping.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 78,
      "date": "2026-01-02"
    },
    {
      "id": 3,
      "title": "Modern React: Component Architecture and State Management",
      "description": "Build dynamic, scalable web applications from the ground up using advanced React concepts.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 12,
      "date": "2026-01-02"
    },
    {
      "id": 4,
      "title": "Modern React: Component Architecture and State Management",
      "description": "Build dynamic, scalable web applications from the ground up. Explore advanced React patterns and state management.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 56,
      "date": "2026-01-02"
    },
    {
      "id": 5,
      "title": "Applied Large Language Models (LLMs) in Python",
      "description": "Dive into practical applications of open-source and commercial LLMs. Learn how to leverage models like GPT in Python.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 80,
      "date": "2026-01-02"
    }
  ]


  return (
    <div className="space-y-4 text-main py-4 px-6">

      <div className='space-y-4'>
        <h4 className="text-h4">Quick Actions</h4>

        <div className="grid grid-cols-3 gap-4">
          {quickAction.map((action, index) => {
            const isPrimary = action.bgClass;

            return (
              <div
                key={index}
                className={`flex items-center gap-4 border-2 rounded px-4 py-3 cursor-pointer
        ${isPrimary ? `${action.bgClass} text-white border-primary` : "border-primary hover:bg-primary/10"}`}
              >
                <Icon
                  name={action.icon}
                  width="36"
                  height="36"
                  className={`${isPrimary ? "text-white" : "text-primary dark:text-white"} w-[10%]`}
                />

                <div className="flex justify-center items-center w-[90%] flex-col">
                  <span className="text-h4">{action.title}</span>

                  <span className={`text-caption ${isPrimary ? "text-white/80" : "text-muted"}`}>
                    {action.caption}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 border-2 border-default rounded">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="text-h4">Top Courses</h4>
            <span className="text-caption text-muted">By Enrollment</span>
          </div>

          <button className="text-muted text-body hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {data.slice(0, 5).map((course, index) => (
            <div
              key={course.id}
              className="flex justify-between items-center border-b border-default pb-3 last:border-none"
            >

              <div className="flex gap-3 items-center">
                <span className="text-caption text-muted w-6">
                  #{index + 1}
                </span>

                <div>
                  <p className="text-body font-medium">
                    {course.title}
                  </p>

                  <p className="text-caption text-muted">
                    {course.trainers.join(", ")}
                  </p>
                </div>
              </div>


              <div className="text-right">
                <p className="text-primary dark:text-white font-semibold">
                  {course.students}
                </p>
                <p className="text-caption text-muted">
                  Trainees
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard
