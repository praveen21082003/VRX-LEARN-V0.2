import React, { useState } from 'react'
import { Icon, Modal } from '@/components/ui'
import CreateUser from '../../dialogs/CreateUser';
import NewCourses from '../../dialogs/NewCourses';
import NewEnrollment from '../../dialogs/NewEnrollment';
import { StatCard } from '@/components/ui';
import useAdminKpis from "../../hooks/useAdminKpis"
import useAdminTopCourses from "../../hooks/useAdminTopCourses";
import { useNavigate } from 'react-router-dom';



function AdminDashboard() {

  const navigate = useNavigate();

  const { kpis, setKpis, isLoading, error } = useAdminKpis();
  const { topCourses, loading, error: topCoursesError } = useAdminTopCourses();

  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState();

  const [editingUser, setEditingUser] = useState(null);

  const allRoles = ["admin", "subadmin", "trainer", "trainee"];
  // const allStatuses = ["ACTIVE", "INACTIVE", "PENDING"];


  const statcardData = [
    {
      key: "totalUsers",
      label: "Total Users",
      Icon: "mdi:users",
      value: kpis.totalUsers
    },
    {
      key: "totalCourses",
      label: "Total Courses",
      Icon: "mdi:book-education-outline",
      value: kpis.totalCourses
    },
    {
      key: "totalEnrollments",
      label: "Total Enrollments",
      Icon: "mdi:book-account",
      value: kpis.totalEnrollments
    },
    {
      key: "averageCompletion",
      label: "Average Completion",
      Icon: "nrk:media-completed",
      value: kpis.averageCompletion
    }
  ]


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
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
        {statcardData.map((kpi) => (
          <StatCard
            key={kpi.key}
            icon={kpi.Icon}
            label={kpi.label}
            value={kpi.value}
            loading={isLoading}
          />
        ))}
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

          <button className="text-muted text-body hover:underline cursor-pointer"
            onClick={() => navigate('/courses')}
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-default pb-3 animate-pulse"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-6 h-4 bg-gray-600 rounded" />

                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-600 rounded" />
                    <div className="w-20 h-3 bg-gray-500 rounded" />
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="w-10 h-4 bg-gray-600 rounded ml-auto" />
                  <div className="w-16 h-3 bg-gray-500 rounded ml-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
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
              onClose={() => setOpen(false)}
              roles={allRoles}
              setKpis={setKpis}
            />
          )}

          {activeAction === "course" && (
            <NewCourses
              setKpis={setKpis}
              onClose={() => setOpen(false)}
            />
          )}

          {activeAction === "enroll" && (
            <NewEnrollment
              onSuccess={
                setKpis((prev) => ({
                  ...prev,
                  totalEnrollments: (prev.totalEnrollments || 0) + 1
                }))}
              onClose={() => setOpen(false)}
            />
          )}

        </Modal>
      )}
    </div>
  )
}

export default AdminDashboard
