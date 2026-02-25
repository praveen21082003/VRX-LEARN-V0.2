import { Outlet, NavLink, useNavigate, useLocation, useParams, useOutletContext } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Button, Icon, Dropdown } from "@/components/ui";
import BackButton from "@/components/navigation/BackButton";

import useCourseContent from '@/features/courses/hooks/useCourseContent';
import { COURSE_EDIT_SECTIONS } from "@/config/courseEditConfig";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useModules from "@/features/courses/hooks/useModules";
import useAssignments from "../../courses/hooks/useAssignments";

import { getCreateButtons } from "@/config/DropdownButtons";
import { useRef } from "react";


function EditCourseLayout() {
  const { courseSlug } = useParams();
  const location = useLocation();

  const { courseContent } = useCourseContent(courseSlug);
  const { setCourseBreadcrumb } = useOutletContext();


  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { modules = [], moduleLoading, moduleError } = useModules(courseSlug);
  const { assignments, error, loading } = useAssignments(courseSlug);
  const [asideWidth, setAsideWidth] = useState(() => {
    if (window.innerWidth >= 1536) return 480; // 2xl
    return 360; // normal
  })
  const isResizing = useRef(false);


  const createButtons = getCreateButtons({
    navigate,
    courseSlug
  });


  const courseEditData = {
    modules,
    moduleLoading,
    moduleError,
    courseSlug,
    assignments,
    courseContent


  };

  const sectionChildrenMap = {
    modules: modules,
    assignments: assignments,
    lab: [],
    quiz: [],
    feedback: [],
  };

  const toggleSection = (key) => {
    setOpen((prev) => (prev === key ? null : key));
  };


  useEffect(() => {
    if (!courseContent?.name) return;

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
      { label: courseContent.name, to: `/courses/${courseSlug}/edit/info` },
      ...(sectionLabel ? [{ label: sectionLabel }] : []),
    ]);

  }, [courseContent?.name, location.pathname]);


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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

  }, []);




  return (
    <div className="flex h-[calc(100vh-56px)] bg-background">

      <aside style={{ width: asideWidth }} className=" relative hidden border-r-2 border-primary-border bg-muted/40 py-1 md:block overflow-y-auto scrollbar-hide">

        <div className="p-4 border-b-2 border-primary-border w-full">
          <BackButton to={`/dashboard`} iconName="material-symbols:arrow-back-rounded" label="Back to Dashboard" />
        </div>

        <div className="flex justify-center border-b-2 border-primary-border p-4">
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
            transition={{ duration: 0.25 }}
          >
            {COURSE_EDIT_SECTIONS.map((section) => {
              const isOpen = open === section.key;
              const children = sectionChildrenMap[section.key];
              const hasChildren = children && children.length > 0;

              return (
                <div key={section.key}>


                  <NavLink
                    to={`/courses/${courseSlug}/edit/${section.path}`}
                    onClick={() => toggleSection(section.key)}
                  >
                    {({ isActive }) => (
                      <div
                        className={clsx(
                          "group flex h-13 w-full items-center font-semibold border-primary",
                          isActive
                            ? "bg-primary-border text-primary border-x-8 px-1"
                            : "hover:bg-primary/10 px-1"
                        )}
                      >

                        <Icon
                          name="iconamoon:arrow-right-2"
                          height="26px"
                          width="26px"
                          className={clsx(
                            "transition-transform duration-500",
                            isActive
                              ? "text-primary"
                              : "text-white group-hover:text-primary",
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
                                navigate(`/courses/${courseSlug}/edit/${section.key}/create`);
                              }}
                            >
                              <Icon
                                name="ic:baseline-plus"
                                height="26px"
                                width="26px"
                                className={clsx(
                                  "transition-colors",
                                  isActive
                                    ? "text-primary"
                                    : "text-white group-hover:text-primary"
                                )}
                              />

                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </NavLink>

                  {/* Dynamic Children */}
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
                              to={`/courses/${courseSlug}/edit/${section.key}/${child.id}`}
                              className={({ isActive }) =>
                                clsx(
                                  "group flex items-center justify-between pl-10 px-2 text-sm py-3 font-semibold",
                                  isActive
                                    ? "bg-active text-primary"
                                    : "text-dark-gray hover:bg-active"
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
                                    navigate(`/courses/${courseSlug}/edit/modules/${child.id}/lesson/create`);
                                  }}
                                >
                                  <Icon
                                    name="ic:baseline-plus"
                                    height="26px"
                                    width="26px"
                                    className="text-muted-foreground hover:text-primary"
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
          className="absolute top-0 right-0 h-screen w-1 cursor-col-resize bg-transparent hover:bg-active"
        />
      </aside>

      <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
        <Outlet context={courseEditData} />
      </main>

    </div>
  );
}

export default EditCourseLayout;
