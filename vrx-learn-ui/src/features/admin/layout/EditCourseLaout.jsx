import { Outlet, NavLink, useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Button, Icon, Dropdown } from "@/components/ui";
import BackButton from "@/components/navigation/BackButton";

import useCourseContent from '@/features/courses/hooks/useCourseContent';

import { COURSE_EDIT_SECTIONS } from "@/config/courseEditConfig";
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import useModules from "@/features/courses/hooks/useModules";
import useAssignment from '../hooks/useAssignment'

import { getCreateButtons } from "@/config/DropdownButtons";
import { useToast } from '@/context/ToastProvider'
import { useAuth } from "@/context/AuthContext";



import { useLessons } from '../hooks/useLessons';

import useAssignmentContent from '../hooks/useAssignmentContent'




function EditCourseLayout() {

  const { role } = useAuth();

  const { addToast } = useToast();
  const { moduleId, courseSlug, assignmentId } = useParams();
  const location = useLocation();
  const ref = useRef(null);

  const { courseContent,setCourseContent, fetchCourseContent, loading, error } = useCourseContent(courseSlug);
  const { lessons,setLessons, lessonLoading, lessonsError, fecthLesssons } = useLessons();
  const { assignment, detailsLoading, fetchAssignmentDetails } = useAssignmentContent();

  const { setCourseBreadcrumb } = useOutletContext();


  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { modules, fetchModules, updateModule, isUpdating, moduleLoading, moduleError } = useModules();


  useEffect(() => {
    if (moduleId) {
      fecthLesssons(moduleId);
    }
  }, [moduleId]);



  // const {
  //   assignment,
  //   assignmentLoading,
  //   assignmentError,
  //   fetchAssignment,
  // } = useAssignment();


  const [asideWidth, setAsideWidth] = useState(() => {
    if (window.innerWidth >= 1536) return 480; // 2xl
    return 360; // normal
  })
  const isResizing = useRef(false);


  const createButtons = getCreateButtons({
    navigate,
    courseSlug
  });


  useEffect(() => {
    fetchModules();
  }, [])


  useEffect(() => {
    if (courseSlug && role) {
      fetchCourseContent(courseSlug, role);
    }
  }, [courseSlug, role, fetchCourseContent]);



  useEffect(() => {

    if (!assignmentId) return;

    fetchAssignmentDetails(assignmentId);
  }, [assignmentId, fetchAssignmentDetails]);


  const courseEditData = {

    modules: courseContent?.modules,
    moduleId,
    updateModule,
    addToast,
    moduleLoading,
    isUpdating,
    moduleError,
    courseSlug,
    assignments: courseContent?.assignments,

    lessons,
    setLessons,
    lessonLoading,
    lessonsError,

    courseContent,
    setCourseContent,
    loading,
    fetchCourseContent,

    fetchModules,

    assignment, detailsLoading, fetchAssignmentDetails

  };

  console.log(courseContent);

  const sectionChildrenMap = {
    modules: courseContent?.modules,
    assignments: courseContent?.assignments,
    // lab: [],
    // quiz: [],
    // feedback: [],
  };

  const toggleSection = (key) => {
    setOpen((prev) => (prev === key ? null : key));
  };


  useEffect(() => {
    if (!courseContent?.course?.title) return;

    const pathParts = location.pathname.split("/");
    const editIndex = pathParts.indexOf("edit");

    let currentSection = null;

    if (editIndex !== -1 && pathParts.length > editIndex + 1) {
      currentSection = pathParts[editIndex + 1];
    }

    const SECTION_LABELS = {
      info: "Info",
      modules: "Modules",
      assignments: "Assignments",
      quiz: "Quiz",
    };

    const sectionLabel = SECTION_LABELS[currentSection];

    setCourseBreadcrumb([
      { label: "Dashboard", to: "/dashboard" },
      { label: courseContent.course?.title, to: `/courses/${courseSlug}/edit/info` },
      ...(sectionLabel ? [{ label: sectionLabel }] : []),
    ]);

  }, [courseContent?.course?.title, location.pathname]);


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return null;
      const newWidth = e.clientX

      // limit 
      if (newWidth < 280) return;
      if (newWidth > 500) return;

      setAsideWidth(newWidth);
    };


    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.userSelect = "auto";
    };

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);






  return (
    <div className="flex h-[calc(100vh-56px)]">

      <aside style={{ width: asideWidth }} className=" relative hidden border-r-2 border-default bg-muted/40 py-1 lg:block overflow-y-auto scrollbar-hide">

        <div className="p-2 w-full">
          <BackButton to={`/course/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
        </div>

        <div className="flex justify-center border-y-2 border-default p-4">
          <div className="relative">
            <Button
              buttonName="Create"
              frontIconName="ic:baseline-plus"
              backIconName="teenyicons:down-solid"
              backIconHeight="16px"
              backIconWidth="16px"
              frontIconHeight="26px"
              frontIconWidth="26px"
              className="py-3 px-15 rounded-lg"
              onClick={() => setIsOpenDropdown((prev) => !prev)}
            />
            {isOpenDropdown && (
              <Dropdown
                buttons={createButtons}
                closeDropdown={() => setIsOpenDropdown((prev) => !prev)}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          <motion.ul
            key="content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {COURSE_EDIT_SECTIONS.map((section) => {
              const isOpen = open === section.key;
              const children = sectionChildrenMap[section.key];
              const hasChildren = children && children.length > 0;

              return (
                <div key={section.key}>


                  <NavLink
                    to={`/course/${courseSlug}/content/${section.path}`}
                    onClick={() => toggleSection(section.key)}
                  >
                    {({ isActive }) => (
                      <div
                        className={clsx(
                          "group flex h-13 w-full items-center text-h45 border-primary dark:border-background",
                          isActive
                            ? "bg-primary/16 dark:bg-primary text-primary dark:text-background border-l-8 px-1"
                            : "hover:bg-primary/16 dark:hover:bg-surface-primary-dark text-muted px-1"
                        )}
                      >

                        <Icon
                          name="iconamoon:arrow-right-2"
                          height="26px"
                          width="26px"
                          className={clsx(
                            "transition-transform duration-500",
                            isActive
                              ? "text-primary dark:text-background"
                              : "text-white dark:text-background-dark group-hover:text-primary group-hover:dark:text-background",
                            hasChildren && isOpen && "rotate-90"
                          )}
                        />

                        <div className="flex justify-between w-full">
                          {section.label}

                          {hasChildren && (
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/course/${courseSlug}/content/${section.key}/create`);
                              }}
                            >
                              <Icon
                                name="ic:baseline-plus"
                                height="26px"
                                width="26px"
                                className={clsx(
                                  "transition-colors",
                                  isActive
                                    ? "text-primary dark:text-background"
                                    : "text-white dark:text-background-dark group-hover:text-primary group-hover:dark:text-background"
                                )}
                              />

                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </NavLink>

                  {hasChildren && isOpen && (
                    <AnimatePresence>
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className='space-y-1 overflow-hidden'
                      >
                        {children.map((child) => (
                          <li key={child.id}>
                            <NavLink
                              to={`/course/${courseSlug}/content/${section.key}/${child.id}`}
                              className={({ isActive }) =>
                                clsx(
                                  "group flex items-center justify-between pl-10 px-2 py-3 text-h5",
                                  isActive
                                    ? "bg-primary/16 dark:bg-primary text-primary dark:text-background"
                                    : "text-muted hover:bg-primary/16 dark:hover:bg-surface-primary-dark"
                                )
                              }
                            >
                              <span className="truncate flex-1">
                                {child.title}
                              </span>
                              {section.key === "modules" &&
                                <span
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(`/course/${courseSlug}/content/modules/${child.id}/lesson/create`);
                                  }}
                                >
                                  <Icon
                                    name="ic:baseline-plus"
                                    height="26"
                                    width="26"
                                    className="text-muted-foreground"
                                  />
                                </span>
                              }
                            </NavLink>
                          </li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  )}

                </div>
              );
            })}
          </motion.ul>
        </AnimatePresence>
        <div
          onMouseDown={() => { (isResizing.current = true); document.body.style.userSelect = "none" }}
          className="absolute top-0 right-0 h-screen w-1 cursor-col-resize bg-transparent hover:bg-primary/16"
        />
      </aside>

      <main className="flex-1 min-h-0 overflow-y-auto text-main py-4 px-6 sm:px-6">
        <Outlet context={courseEditData} />
      </main>

    </div>
  );
}

export default EditCourseLayout;
