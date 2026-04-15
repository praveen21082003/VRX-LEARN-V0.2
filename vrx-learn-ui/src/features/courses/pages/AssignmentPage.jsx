import React, { useState, useEffect } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'

import useAssignments from '../hooks/useAssignments'
import useAssignment from '../hooks/useAssingment'

import AssignmentAsideSection from '../sections/AssignmentAsideSection'
import AssignmentMainSection from '../sections/AssignmentMainSection'


function AssignmentPage() {
  const { courseSlug, assignmentId } = useParams();

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { assignments, refresh, loading: listLoading } = useAssignments(courseSlug);
  const { assignment, loading: assignmentLoading } = useAssignment(assignmentId);



  useEffect(() => {
    if (!isMobile && assignments?.length > 0 && !assignmentId) {
      navigate(`/course/${courseSlug}/assignments/${assignments[0].id}`, { replace: true });
    }
  }, [assignments, isMobile, assignmentId]);


  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-background text-main">


      <div className="hidden lg:block">
        <AssignmentAsideSection assignments={assignments} loading={listLoading} />
      </div>


      {!assignmentId && isMobile && (
        <AssignmentAsideSection assignments={assignments} />
      )}

      {assignmentId && (
        <AssignmentMainSection
          assignment={assignment}
          courseId={courseSlug}
          loading={assignmentLoading}
          onRefresh={refresh}
        />
      )}

    </div>
  )
}

export default AssignmentPage
