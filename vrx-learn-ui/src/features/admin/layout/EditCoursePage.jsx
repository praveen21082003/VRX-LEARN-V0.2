import { Outlet, NavLink, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react';

import { Button, Icon } from "@/components/ui"
import BackButton from "@/components/navigation/BackButton";

import { COURSE_EDIT_SECTIONS } from "@/config/courseEditConfig"

import clsx from 'clsx';
import { useState } from 'react';

import useModules from "@/features/courses/hooks/useModules";




function EditCoursePage() {
  const { courseSlug } = useParams();
  const [open, setOpen] = useState(null);
  const { modules, moduleLoading, moduleError } = useModules(courseSlug);



  const courseEditData = {
    modules,
    moduleLoading,
    moduleError

  }
  


  const toggleSection = (key) => {
    setOpen((prev) => (prev === key) ? null : key);
  }



  return (
    <div className="flex h-[calc(100vh-56px)] bg-background">
      <aside className="hidden w-90 2xl:w-120 border-r-2 border-primary-border bg-muted/40 py-1 md:block overflow-y-auto scrollbar-hide">
        <div className="p-4 border-b-2 border-primary-border w-full"><BackButton to={`/learn/${courseSlug}/overview`} /></div>
        <div className='w-full p-4'><Button buttonName="Create New" frontIconName="ic:baseline-plus" backIconName="teenyicons:down-solid" frontIconHeight="26px" frontIconWidth="26px" backIconHeight="18px" backIconWidth="18px"   className="p-2 rounded-lg w-full" /></div>
        <AnimatePresence>
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='overflow-hidden '
          >
            {COURSE_EDIT_SECTIONS.map((section) => {
              const isOpen = open === section.key
              return (
                <div key={section.key} >
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
                            isOpen && "rotate-90",

                          )}
                        />

                        <div className='flex justify-between w-full'>
                          {section.label}
                          {section.childrens &&
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
                          }
                        </div>

                      </div>
                    )}
                  </NavLink>
                  {section.childrens && isOpen && (
                    <ul className="flex flex-col">
                      {modules.map((module, index) => (
                        <li key={module.id} className='px-10 py-3 font-semibold text-dark-gray hover:bg-active'>{module.title}</li>
                      ))}
                    </ul>
                  )}
                </div>

              )
            })}


          </motion.ul>
        </AnimatePresence>
      </aside>



      <main className="flex-1 min-h-0 overflow-y-auto py-4 px-6">
        <Outlet context={courseEditData} />
      </main>

    </div>
  )
}

export default EditCoursePage
