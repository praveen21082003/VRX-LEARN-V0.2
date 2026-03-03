

// In courseInfo page create button
export const getCreateButtons = ({
  navigate,
  courseSlug
}) => [
    { key: "module", title: "Module", icon: "codicon:file-submodule", onClick: () => navigate(`/courses/${courseSlug}/edit/modules/create`), permission: "CREATE_MODULES" },
    { key: "assignment", title: "Assignment", icon: "material-symbols:assignment-outline", onClick: () => navigate(`/courses/${courseSlug}/edit/assignments/create`), permission: "CREATE_ASSIGNMENTS" },
    { key: "lab_credential", title: "Lab Credential", icon: "ooui:lab-flask", onClick: () => navigate(`/courses/${courseSlug}/labs/create`), permission: "CREATE_LABS" },
    { key: "quiz", title: "Quiz", icon: "hugeicons:quiz-05", onClick: () => navigate(`/courses/${courseSlug}/quiz/create`), permission: "CREATE_QUIZ" }
  ]


// LessonEditor buttons
export const editButtons = (handleReorder) => [
  { key: "reorder", title: "Reorder", icon: "ix:reorder", onClick: () => handleReorder() },
  { key: "delete", title: "Delete", icon: "ic:baseline-delete", onClick: () => alert("delete clicked") },
];

export const buttons = (handleRename, lessonId) => [
  { key: "view", title: "View", icon: "material-symbols:view-cozy-sharp", onClick: () => navigate(`/learn/${courseSlug}/lessons`) },
  { key: "edit", title: "Edit", icon: "mingcute:pencil-line", onClick: () => alert("edit clicked") },
  { key: "rename", title: "Rename", icon: "ix:rename", onClick: () => handleRename(lessonId) },
  { key: "delete", title: "Delete", icon: "ic:baseline-delete", onClick: () => alert("delete clicked") }
]


export const getButtons = (Id, handleRename, handleDelete) => [
  {
    key: "view", title: "View", icon: "material-symbols:view-cozy-sharp", onClick: () => alert("edit clicked")
  },
  { key: "edit", title: "Edit", icon: "mingcute:pencil-line", onClick: () => alert("edit clicked"), permission: "UPDATE_MODULES" },
  {
    key: "rename",
    title: "Rename",
    icon: "ix:rename",
    onClick: () => handleRename(Id),
    permission: "UPDATE_MODULES"
  },
  { key: "delete", title: "Delete", icon: "ic:baseline-delete", onClick: () => handleDelete(Id), permission: "DELETE_MODULES" }
]


export const getProfileDropdown = ({
  mode,
  handleMode,
  navigate
}) => [
    {
      key: "profile",
      title: "Profile",
      icon: "mingcute:user-4-fill",
    },
    {
      key: "theme",
      title: mode ? "Light Mode" : "Dark Mode",
      icon:
        mode
          ? "line-md:sunny-filled-loop-to-moon-filled-loop-transition"
          : "line-md:moon-filled-alt-to-sunny-filled-loop-transition",
      onClick: handleMode,
    },
    {
      key: "logout",
      title: "Log out",
      icon: "mdi:logout",
      onClick: () => navigate("/"),
    },
  ];