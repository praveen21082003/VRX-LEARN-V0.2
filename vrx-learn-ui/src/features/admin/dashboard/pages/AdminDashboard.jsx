import React, { useState } from 'react'
import { Icon, Modal } from '@/components/ui'
import CreateUser from '../../dialogs/CreateUser';
import NewCourses from '../../dialogs/NewCourses';
import NewEnrollment from '../../dialogs/NewEnrollment';
import { StatCard } from '@/components/ui';
import useAdminKpis from "@/features/courses/hooks/useAdminKpis";
import useAdminTopCourses from "@/features/courses/hooks/useAdminTopCourses";



function AdminDashboard() {

    const { kpis, isLoading, error } = useAdminKpis();  
    const { topCourses, loading, error: topCoursesError } = useAdminTopCourses();
    console.log("KPIS:", kpis);
    console.log("Top Courses:", topCourses);
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState();

  const [editingUser, setEditingUser] = useState(null);

  const allRoles = ["ADMIN", "SUB_ADMIN", "TRAINER", "TRAINEE"];
  // const allStatuses = ["ACTIVE", "INACTIVE", "PENDING"];


  const quickAction = [
    {
      key: "user",
      icon: "mdi:users",
      title: "New User",
      caption: "Create account",
      bgClass: "bg-primary"
    },
    {
      key: "course",
      icon: "mdi:book-education-outline",
      title: "New Course",
      caption: "Publish content"
    },
    {
      key: "enroll",
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


  const allTrainers = [...new Set(data.flatMap((course) => course.trainers))];

  const allTitles = [...new Set(data.map((course) => course.title))];

  const allDescription = [...new Set(data.map((course) => course.description))];


  const handleOnClick = (actionKey) => {
    setActiveAction(actionKey);
    setOpen(true);
  };

  const avgTrainees =
  kpis?.totalCourses
    ? Math.round(kpis.totalEnrollments / kpis.totalCourses)
    : 0;


  return (
    <div className="space-y-4 text-main py-4 px-6">

                  <h2 className='text-h2 mb-1'>Welcome Admin!</h2>
                  <p className='mb-1 '>Here's what's happening across your learning platform.</p>
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 gap-4 py-4'>
                      <StatCard
                          icon="mdi:users"
                          label="Total Users"
                          value={kpis.totalUsers}
                      />
      
                      <StatCard
                          icon="mdi:book-education-outline"
                          label="Total Courses"
                          value={kpis.totalCourses}
                      />
      
                      <StatCard
                          icon="mdi:book-account"
                          label="Total Enrollments"
                          value={kpis.totalEnrollments}
                      />
      
                      {/* <StatCard
                          icon="nrk:media-completed"
                          label="Average Completion"
                          // value="78%"
                            value={kpis?.avgCompletion ? `${kpis.avgCompletion}%` : "78%"}

                      /> */}
{/* {
  "totalTrainees": 100,
  "completedTrainees": 78
} */}
{/* const completion = (course.completedTrainees / course.totalTrainees) * 100; */}

                  <StatCard
                  icon="mdi:account-group"
                  label="Avg Trainees / Course"
                  value={avgTrainees}
                  />
                  </div>

      <div className='space-y-4'>
        <h4 className="text-h4">Quick Actions</h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {quickAction.map((action, index) => {
            const isPrimary = action.bgClass;

            return (
              <button
                key={index}
                className={`flex items-center gap-4 border-2 rounded px-4 py-3 cursor-pointer
                ${isPrimary ? `${action.bgClass} text-white border-primary` : "border-primary hover:bg-primary/10"}`}
                onClick={() => handleOnClick(action.key)}
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
              </button>
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
          {topCourses.map((course, index) => (
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
                    {course.courseName}
                  </p>

                  <p className="text-caption text-muted">
                    {course.trainerName}
                  </p>
                </div>
              </div>


              <div className="text-right">
                <p className="text-primary dark:text-white font-semibold">
                  {course.totalTrainees}
                </p>
                <p className="text-caption text-muted">
                  Trainees
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={
            activeAction === "user"
              ? "Create New User"
              : activeAction === "course"
                ? "Create Course"
                : "Enroll Trainee"
          }
        >

          {activeAction === "user" && (
            <CreateUser
              isEdit={!!editingUser}
              userData={editingUser}
              onClose={() => setOpen(false)}
              roles={allRoles}
            />
          )}

          {activeAction === "course" && (
            <NewCourses
              trainers={allTrainers}
              courseTitles={allTitles}
              description={allDescription}
            />
          )}

          {activeAction === "enroll" && (
            <NewEnrollment
              isEdit={!!editingUser}
              userData={editingUser}
              onClose={() => setOpen(false)}
              courses={allCourses}
              Names={allNames}
              Status={allStatus}
            />
          )}

        </Modal>
      )}
    </div>
  )
}

export default AdminDashboard
