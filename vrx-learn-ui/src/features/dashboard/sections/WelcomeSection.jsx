import React from 'react'
import { LearningIllustration } from '@/assets'
import { Button } from "@/components/ui";
import { ProgressBar } from '@/components/ui';
import { usePermission } from "@/hooks/usePermission"


import { useNavigate } from 'react-router-dom';


function WelcomeSection({ user }) {
  const navigate = useNavigate();
  const courseId = 34;
  const { can } = usePermission();



  if (!user) return null;


  return (
    <div className="w-full bg-primary rounded-xl p-6 md:p-8">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="flex flex-col justify-center gap-5 text-white max-w-xl">
          <h2 className="text-h3">
            Hello, {user.name}!
          </h2>

          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base 2xl:text-xl font-light opacity-90">
              Continue Learning
            </p>

            <h3 className="text-h3 truncate">
              {user.current_learing_course}
            </h3>

            <ProgressBar percent={user.status_percent} />
          </div>



          <Button
            buttonName={can("UPDATE_COURSE") ? "Edit Course" : "Resume"}
            className="max-w-50 2xl:max-w-70 p-3 rounded-lg font-semibold text-sm"
            bgClass="bg-white"
            textClass="text-primary"
            onClick={() => {
              can("UPDATE_COURSE")
                ? navigate(`/courses/${courseId}/edit`)
                : navigate(`/learn/${courseId}`)
            }}
          />

        </div>

        <div className="hidden lg:flex items-center justify-end">
          <img
            src={LearningIllustration}
            alt="Learning illustration"
            className="max-h-56 2xl:max-h-100 object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default WelcomeSection
