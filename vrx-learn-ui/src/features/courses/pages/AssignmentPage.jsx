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

  const { assignments } = useAssignments(courseSlug);
  const { assignment } = useAssignment(assignmentId);


  // Auto select first (desktop)
  useEffect(() => {
    if (!isMobile && assignments?.length > 0 && !assignmentId) {
      navigate(`/course/${courseSlug}/assignments/${assignments[0].id}`, { replace: true });
    }
  }, [assignments, isMobile, assignmentId]);


  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-background text-main">

      {/* desktop always visible */}
      <div className="hidden lg:block">
        <AssignmentAsideSection assignments={assignments} />
      </div>

      {/* mobile */}
      {!assignmentId && isMobile && (
        <AssignmentAsideSection assignments={assignments} />
      )}

      {assignmentId && (
        <AssignmentMainSection
          assignment={assignment}
          courseId={courseSlug}
        />
      )}

    </div>
  )
}

export default AssignmentPage
