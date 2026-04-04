export const TRAINER_SECTIONS = [
  {
    key: "content",
    title: "Course Content",
    description: (course) =>
      `${course.module_count} Modules • ${course.lab_count} Labs • ${course.assignment_count} Assignment • ${course.quiz_count} Quiz`,
    icon: "tabler:layout-dashboard-filled",
  },
  {
    key: "roster",
    title: "Trainee Roster",
    description: (course) => `${course.trainee_count} Trainees Enrolled`,
    icon: "mdi:users",
  },
  {
    key: "discussion",
    title: "Discussion Forum",
    description: (course) => `${course.discussion_count} Total Discussions`,
    icon: "lucide:message-square-text"
  },
];

export const TRAINEE_SECTIONS = [
  {
    key: "lessons",
    title: "Lessons",
    getMeta: (data) => {
      const moduleCount = data?.modules?.length || 0;
      const lessonCount =
        data?.modules?.reduce(
          (t, m) => t + (m.lessons?.length || 0),
          0
        ) || 0;

      return `${moduleCount} Modules · ${lessonCount} Lessons`;
    }
  },
  {
    key: "assignments",
    title: "Assignment",
    durationKey: "assignment_duration",
  },
  // {
  //   key: "quizzes",
  //   title: "Quiz",
  //   durationKey: "quiz_duration",
  // },

  // {
  //   key: "labs",
  //   title: "Lab Credentials",
  //   durationKey: "lab_duration",
  // },
  // {
  //   key: "feedback",
  //   title: "Feedback",
  //   durationKey: "feedback_duration",
  // },
];