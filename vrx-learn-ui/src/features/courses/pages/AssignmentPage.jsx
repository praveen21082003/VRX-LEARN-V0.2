import React, { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

import useAssignments from '../hooks/useAssignments'
import useAssignment from '../hooks/useAssingment'

import AssignmentAsideSection from '../sections/AssignmentAsideSection'
import AssignmentMainSection from '../sections/AssignmentMainSection'


function AssignmentPage() {
  const { courseSlug } = useParams();
  const { setSectionBreadcrumb } = useOutletContext()
  const isMobile = window.innerWidth < 768;

  const [activeAssignment, setActiveAssignment] = useState(
    isMobile ? null : { assignmentId: "1" }
  );

  const assignmentId = activeAssignment?.assignmentId;

  const { assignments, error, loading } = useAssignments(courseSlug)
  const { assignment, assignmentError, assignmentLoading } = useAssignment(assignmentId);

  useEffect(() => {
    if (assignment?.title) {
      setSectionBreadcrumb(assignment.title);
    }
  }, [assignment, setSectionBreadcrumb]);

  if (!assignments) return null;


  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden bg-background text-main">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen">
        <AssignmentAsideSection
          assignments={assignments}
          activeAssignment={activeAssignment}
          setActiveAssignment={setActiveAssignment}
        />
      </div>

      {/* Mobile List View */}
      {!activeAssignment && (
        <div className="lg:hidden w-full h-screen">
          <AssignmentAsideSection
            assignments={assignments}
            activeAssignment={activeAssignment}
            setActiveAssignment={setActiveAssignment}
          />
        </div>
      )}

      {/* Assignment Detail */}
      {activeAssignment && (
        <AssignmentMainSection
          assignment={assignment}
          onBack={() => setActiveAssignment(null)}
        />
      )}

    </div>
  )
}

export default AssignmentPage
