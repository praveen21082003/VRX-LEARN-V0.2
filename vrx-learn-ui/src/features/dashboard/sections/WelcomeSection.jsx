import React, { useEffect } from 'react'
import { LearningIllustration } from '@/assets'
import { Button } from "@/components/ui";
// import { ProgressBar } from '@/components/ui';
import { useCurrentCourse } from '../hook/useCurrentCourse';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'



import { useNavigate } from 'react-router-dom';


function WelcomeSection({ user }) {
  const navigate = useNavigate();

  const { course, loading, error, fetchCurrentCourse } = useCurrentCourse();

  useEffect(() => {

    fetchCurrentCourse();

  }, [])



  const renderContent = () => {

    if (!course || !course.courseId) {
      return (
        <>
          <p className="text-h3">
            Welcome to VRXLearn
          </p>

          <h3 className="text-h1">
            Your Learning Path Starts Here
          </h3>

          <Button
            buttonName="Browse Courses"
            backIconName="maki:arrow"
            backIconHeight="16"
            backIconWidth="16"
            className="lg:max-w-50 p-3 rounded-lg font-semibold text-sm"
            bgClass="bg-white"
            textClass="text-primary"
            onClick={() => navigate("/courses")}
          />
        </>
      );
    }


    return (
      <>
        <div className="flex flex-col gap-2">
          <p className="text-2xl">
            Continue Learning :
          </p>

          <h3 className="text-h3 truncate">
            {capitalizeFirstLetter(course?.courseName)}
          </h3>
        </div>

        <Button
          buttonName="Resume"
          className="w-full lg:max-w-50 p-3 rounded-lg font-semibold text-sm"
          bgClass="bg-white"
          textClass="text-primary"
          onClick={() => navigate(`/course/${course?.courseId}`)}
        />
      </>
    );
  };


  if (loading) {
    return (
      <div className="w-full bg-brand rounded-xl p-6 md:p-8 animate-pulse">
        <div className="flex flex-col md:flex-row md:justify-between h-full gap-6">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center gap-4 w-md">
            <div className="h-6 w-40 bg-white/20 rounded"></div>
            <div className="h-8 w-64 bg-white/20 rounded"></div>
            <div className="h-9 w-52 bg-white/20 rounded"></div>
            <div className="h-10 w-40 bg-white/20 rounded mt-2"></div>
          </div>

          {/* RIGHT IMAGE PLACEHOLDER */}
          <div className="hidden sm:flex md:flex-1 items-center justify-center md:justify-end">
            <div className="w-[300px] h-[200px] bg-white/10 rounded-lg"></div>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="w-full bg-brand rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between h-full gap-6">

        <div className="flex flex-col justify-center gap-4 text-white w-md">
          <h2 className="text-h3">
            Hello, {user.username}!
          </h2>

          {renderContent()}

        </div>

        <div className="hidden sm:flex md:flex-1 items-center justify-center md:justify-end">
          <img
            src={LearningIllustration}
            alt="Learning illustration"
            className="max-h-100 object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default WelcomeSection
