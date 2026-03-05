import React, { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'

import useAssignments from '../hooks/useAssignments'
import useAssignment from '../hooks/useAssingment'

import AssignmentAsideSection from '../sections/AssignmentAsideSection'
import AssignmentMainSection from '../sections/AssignmentMainSection'


function AssignmentPage() {
  const { courseSlug } = useParams();
  const { setSectionBreadcrumb } = useOutletContext()
  const [activeAssignment, setActiveAssignment] = useState({ assignmentId: "1" });

  const assignmentId = activeAssignment?.assignmentId

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
      <AssignmentAsideSection assignments={assignments} activeAssignment={activeAssignment} setActiveAssignment={setActiveAssignment} />
      <AssignmentMainSection assignment={assignment} />
    </div>
  )
}

export default AssignmentPage
