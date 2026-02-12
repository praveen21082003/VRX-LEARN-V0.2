import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute";

import AppLayout from "@/layouts/AppLayout";
import LearningLayout from "@/layouts/LearningLayout";
import AdminLayout from "@/layouts/AdminLayout";
import Layout from "./features/auth/pages/Layout";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import CourseOverviewPage from "@/features/courses/pages/CourseOverviewPage";
import LessonsPage from "@/features/courses/pages/LessonsPage";
import AssignmentPage from "@/features/courses/pages/AssignmentPage";
import LabPage from "@/features/courses/pages/LabPage";
import QuizPage from "@/features/courses/pages/QuizPage";
import FeedbackPage from "@/features/courses/pages/FeedbackPage";

import CourseInfoPage from "@/features/admin/layout/CourseInfoPage";
import EditCoursePage from "@/features/admin/layout/EditCoursePage";
import CourseInfo from "@/features/admin/pages/CourseInfo";
import ModulesEditor from "@/features/admin/pages/ModulesEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Layout />} />

        {/* STUDENT */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
          </Route>

          <Route path="/learn/:courseSlug" element={<LearningLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<CourseOverviewPage />} />
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="courses" element={<CourseInfoPage />} />
            <Route path="courses/:courseSlug/edit" element={<EditCoursePage />}>
              <Route index element={<Navigate to="info" replace />} />
              <Route path="info" element={<CourseInfo />} />
              <Route path="modules" element={<ModulesEditor />} />
              {/* <Route path="quiz" element={<QuizEditor />} />
              <Route path="assignment" element={<AssignmentEditor />} />
              <Route path="lab" element={<LabEditor />} />
              <Route path="feedback" element={<FeedbackEditor />} /> */}
            </Route>

          </Route>

          <Route path="/admin/learn/:courseSlug" element={<LearningLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<CourseOverviewPage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="lessons/:lessonId" element={<LessonsPage />} />
            <Route path="assignments" element={<AssignmentPage />} />
            <Route path="labs" element={<LabPage />} />
            <Route path="quizzes" element={<QuizPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>
        </Route>


      </Routes>
    </BrowserRouter >
  );
}

export default App;
