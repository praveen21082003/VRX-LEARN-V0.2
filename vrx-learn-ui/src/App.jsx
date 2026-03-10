import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { ToastProvider } from "./context/ToastProvider";

import AppLayout from "@/layouts/AppLayout";
import LearningLayout from "@/layouts/LearningLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Layout from "./features/auth/layout/Layout";

import DashboardRouter from "@/components/navigation/routers/DashboardRouter";
import CourseOverView from "@/components/navigation/routers/CourseOverView";
import UsersManagement from "@/features/admin/dashboard/pages/UsersManagement";

import CoursesPage from "@/features/courses/pages/CoursesPage";
import LessonsPage from "@/features/courses/pages/LessonsPage";
import AssignmentPage from "@/features/courses/pages/AssignmentPage";
import LabPage from "@/features/courses/pages/LabPage";
import QuizPage from "@/features/courses/pages/QuizPage";
import FeedbackPage from "@/features/courses/pages/FeedbackPage";

import EditCourseLayout from "./features/admin/layout/EditCourseLaout";
import CourseInfo from "@/features/admin/pages/CourseInfo";
import TraineeRoster from "@/features/admin/layout/TraineeRoster";

import ModulesEditor from "@/features/admin/pages/ModulesEditor";
import LessonsEditor from "@/features/admin/pages/subPages/LessonsEditor";
import QuizEditor from '@/features/admin/pages/QuizEditor';
import AssignmentsEditor from "./features/admin/pages/AssignmentsEditor";
import LabEditor from "@/features/admin/pages/LabEditor";
import FeedbackEditor from "@/features/admin/pages/FeedbackEditor";

import CreateModule from "@/features/admin/pages/subPages/CreateModule";
import CreateAssignment from "@/features/admin/pages/subPages/CreateAssignment";
import CreateLesson from "@/features/admin/pages/subPages/CreateLesson";


import Assignment from "@/features/admin/pages/subPages/Assignment";

function App() {
  return (
    <ToastProvider>


      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Layout />} />

          {/* Trainee */}
          <Route element={<ProtectedRoute allowedRoles={["TRAINEE"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="/courses" element={<CoursesPage />} />
            </Route>

            <Route path="/course/:courseSlug" element={<LearningLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<CourseOverView />} />
              <Route path="lessons" element={<LessonsPage />} />
              <Route path="lessons/:lessonId" element={<LessonsPage />} />
              <Route path="assignments" element={<AssignmentPage />} />
              <Route path="labs" element={<LabPage />} />
              <Route path="quizzes" element={<QuizPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
            </Route>
          </Route>

          {/* ADMIN / TRAINER / SUBADMIN */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUBADMIN", "TRAINER"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardRouter />} />
              <Route path="/users" element={< UsersManagement/>} />
              <Route path="/enrollments" element={<p>enrollments</p>} />
              <Route path="/courses" element={<p>courses</p>} />
            </Route>

            <Route path="/course/:courseSlug" element={<AdminLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<CourseOverView />} />
              <Route path="content" element={<EditCourseLayout />}>

                <Route index element={<Navigate to="info" replace />} />

                <Route path="info" element={<CourseInfo />} />

                <Route path="modules">
                  <Route index element={<ModulesEditor />} />
                  <Route path=":moduleId" element={<LessonsEditor />} />
                  <Route path="create" element={<CreateModule />} />
                  <Route path=":moduleId/lesson/create" element={<CreateLesson />} />
                </Route>

                <Route path="assignments">
                  <Route index element={<AssignmentsEditor />} />
                  <Route path=":assignmentId" element={<Assignment />} />
                  <Route path="create" element={<CreateAssignment />} />
                </Route>

                <Route path="quiz" element={<QuizEditor />} />
                <Route path="lab" element={<LabEditor />} />
                <Route path="feedback" element={<FeedbackEditor />} />


              </Route>
              <Route path="roster" element={<TraineeRoster />} />
            </Route>



          </Route>
        </Routes>
      </BrowserRouter >
    </ToastProvider>
  );
}

export default App;

// # This is my CSSFontFeatureValuesRule.