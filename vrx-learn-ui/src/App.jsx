import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import LearningLayout from "@/layouts/LearningLayout"

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import CoursesPage from "@/features/courses/pages/CoursesPage";
import CourseOverviewPage from "@/features/courses/pages/CourseOverviewPage";
import LessonsPage from "@/features/courses/pages/LessonsPage";
import AssignmentPage from "@/features/courses/pages/AssignmentPage";
import LabPage from "@/features/courses/pages/LabPage";
import QuizPage from "@/features/courses/pages/QuizPage";
import FeedbackPage from "@/features/courses/pages/FeedbackPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
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


      </Routes>
    </BrowserRouter>
  );
}

export default App;
