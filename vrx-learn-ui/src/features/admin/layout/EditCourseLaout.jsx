import { Outlet, NavLink, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Button, Icon } from "@/components/ui";
import BackButton from "@/components/navigation/BackButton";
import { COURSE_EDIT_SECTIONS } from "@/config/courseEditConfig";
import clsx from "clsx";
import { useState } from "react";
import useModules from "@/features/courses/hooks/useModules";
import useAssignments from "../../courses/hooks/useAssignments";


function EditCourseLayout() {
  const { courseSlug } = useParams();
  const [open, setOpen] = useState(null);
  const { modules = [], moduleLoading, moduleError } = useModules(courseSlug);
  const { assignments, error, loading } = useAssignments(courseSlug);

  const courseEditData = {
    modules,
    moduleLoading,
    moduleError,
    courseSlug,
    assignments,

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

  return (
    <div className="flex h-[calc(100vh-56px)] bg-background">
      <aside className="hidden w-90 2xl:w-120 border-r-2 border-primary-border bg-muted/40 py-1 md:block overflow-y-auto scrollbar-hide">

        <div className="p-4 border-b-2 border-primary-border w-full">
          <BackButton to={`/learn/${courseSlug}/overview`} />
        </div>

        <div className="w-full p-4">
          <Button
            buttonName="New"
            frontIconName="ic:baseline-plus"
            frontIconHeight="26px"
            frontIconWidth="26px"
            className="py-3 px-2 pr-8 rounded-lg"
          />
        </div>

        <AnimatePresence>
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {COURSE_EDIT_SECTIONS.map((section) => {
              const isOpen = open === section.key;
              const children = sectionChildrenMap[section.key];
              const hasChildren = children && children.length > 0;

              return (
                <div key={section.key}>


                  <NavLink
                    to={`/admin/courses/${courseSlug}/edit/${section.path}`}
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
                            "transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-white group-hover:text-primary",
                            hasChildren && isOpen && "rotate-90"
                          )}
                        />

                        <div className="flex justify-between w-full">
                          {section.label}

                          {hasChildren && (
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
                          )}
                        </div>
                      </div>
                    )}
                  </NavLink>

                  {/* Dynamic Children */}
                  {hasChildren && isOpen && (
                    <ul className="flex flex-col">
                      {children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            to={`/admin/courses/${courseSlug}/edit/${section.key}/${child.id}`}
                            className={({ isActive }) =>
                              clsx(
                                "block px-10 text-sm py-3 font-semibold",
                                isActive
                                  ? "bg-active text-primary"
                                  : "text-dark-gray hover:bg-active"
                              )
                            }
                          >
                            {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </aside>

      <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
        <Outlet context={courseEditData} />
      </main>
    </div>
  );
}

export default EditCourseLayout;
