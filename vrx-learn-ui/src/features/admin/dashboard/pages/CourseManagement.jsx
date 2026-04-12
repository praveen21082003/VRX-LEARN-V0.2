import React, { useEffect, useState } from 'react'
import { Button, Select, Input, DataTable, Modal, DeleteConfirmContent, CourseCard } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';

import NewCourses from '../../dialogs/NewCourses';
import { useCoursesData } from '../../hooks/useCousesData';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import useCourses from '../../hooks/useCourses';
import { useToast } from '@/context/ToastProvider'

function CourseManagement() {
  const isMobile = window.innerWidth < 768;

  const { courses, setCourses, loading, error, fetchCourses, total } = useCoursesData();
  const { isDeleting, deleteCourseById } = useCourses();
  const { addToast } = useToast();

  const [isDelete, setIsDelete] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);


  const [selectedRows, setSelectedRows] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");



  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);


  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(courses.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };


  useEffect(() => {

    const sortMapping = {
      create_asc: { sortByCreatedAt: "asc" },
      create_desc: { sortByCreatedAt: "desc" },
      course_asc: { sortByCourseName: "asc" },
      course_desc: { sortByCourseName: "desc" },
    };

    fetchCourses({
      page,
      limit: pageSize,
      courseNameOrTrainerName: debouncedSearch || undefined,
      ...sortMapping[sort] || {}
    });
  }, [page, pageSize, debouncedSearch, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort]);


  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setOpen(true);
  };

  const handleOpenDelete = (row) => {
    setSelectedCourse(row);
    console.log(row);
    setIsDelete(true);
  };


  // Derive unique trainers list from data
  const allTrainers = [...new Set(courses.flatMap((course) => course.trainers))];

  // Derive unique course titles from data
  const allTitles = [...new Set(courses.map((course) => course.title))];

  const allDescription = [...new Set(courses.map((course) => course.description))];



  const handleDelete = async (id) => {
    try {
      await deleteCourseById(id);

      addToast("Course deleted successfully.", "success");

      setCourses(prev => prev.filter(course => course.id !== id));
      setIsDelete(false);

    } catch (error) {
      console.error("Delete Course Error:", error);

      const status = error?.response?.status;

      let message = "Failed to delete course. Please try again.";

      if (status === 400) {
        message = "Invalid request. Unable to delete course.";
      } else if (status === 401) {
        message = "Session expired. Please login again.";
      } else if (status === 403) {
        message = "You are not authorized to delete this course.";
      } else if (status === 404) {
        message = "Course not found or already deleted.";
      } else if (status === 409) {
        message = "Course cannot be deleted as it is currently in use.";
      } else if (status >= 500) {
        message = "Server error. Please try again later.";
      }

      addToast(message, "error");
    }
  };

  const coursesManagementColumns = [
    {
      key: "check_box",
      label: (
        <div className="flex justify-center">
          <input
            type="checkbox"
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='accent-primary dark:accent-transparent'
          />
        </div>
      ),
      align: "left",
      width: "5%",
      render: (row) => (
        <div className="flex justify-center">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
            className='accent-primary dark:accent-transparent'
          />
        </div>
      )
    },
    {
      key: "title",
      label: "Course Title",
      align: "left",
      width: "20%",
      render: (row) => (
        <span>{capitalizeFirstLetter(row.title)}</span>
      )
    },
    {
      key: "shortDescription",
      label: "Short Description",
      align: "left",
      width: "30%",
      render: (row) => (
        <p
          title={row.shortDescription}
          className={`h-10 overflow-hidden leading-5 line-clamp-2 ${!row.shortDescription ? "text-muted italic" : ""
            }`}
        >
          {row.shortDescription || "No description provided"}
        </p>
      )
    },
    {
      key: "trainer",
      label: "Trainer",
      align: "center",
      width: "15%",
      render: (row) => (
        <span className='text-main'>
          {row.trainerName}
        </span>
      )
    },
    {
      key: "noOfTrainees",
      label: "No.of Trainees",
      align: "center",
      width: "10%"
    },
    {
      key: "created_at",
      label: "Created At",
      align: "center",
      width: "10%",
      render: (row) => (
        <span className="text-caption">
          {formatDateTime(row.createdAt)}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      width: "10%",
      render: (row) => {
        const actions = ["iconamoon:eye-light", "mingcute:pencil-line", "mdi:delete-outline"]

        return (
          <div className="flex items-center justify-center gap-3">
            {actions.map((icon, index) => (
              <Button key={index} frontIconName={icon} frontIconHeight="18" frontIconWidth="18" bgClass="" textClass=""
                onClick={() => {
                  if (icon === "mingcute:pencil-line") handleOpenEdit(row);
                  if (icon === "mdi:delete-outline") handleOpenDelete(row);
                }}
              />
            ))}
          </div>
        )
      }


    },
  ]

  return (
    <div className="p-5 bg-background text-main">
      <div className="flex items-center justify-between h-5">
        <h3 className="text-h3 font-semibold">Course Management</h3>
        {selectedRows.length === 0 && (
          <div className="flex items-center gap-3">
            <Button
              buttonName="Export as CSV"
              frontIconName="material-symbols:download"
              frontIconWidth="26"
              frontIconHeght="26"
              className="px-3 py-1.5 text-sm rounded-md"
              bgClass=""
              textClass="text-body"
              isMobile={isMobile}
            />

            <Button
              buttonName="Add New Course"
              frontIconName="mdi:plus"
              frontIconWidth="26"
              frontIconHeght="26"
              className="lg:p-3 lg:py-1.5 text-sm rounded-md"
              bgClass="lg:bg-primary"
              textClass="lg:text-white"
              onClick={() => {
                setEditingCourse(null);
                setOpen(true);
              }}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
      {selectedRows.length === 0 ? (
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center py-5 gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon="ic:twotone-search"
            border="border-default"
            paddingClass="py-2"
            widthClass="w-full lg:w-96"
            placeholder="Search by name or email..."
          />
          <Select
            label="Sort by:"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { label: "None", value: null },
              { label: "Newest First", value: "create_desc" },
              { label: "Oldest First", value: "create_asc" },
              { label: "Name (A - Z)", value: "course_asc" },
              { label: "Name (Z - A)", value: "course_desc" },
            ]}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center py-5 gap-3  whitespace-nowrap">
          <div className="flex gap-8 px-2">
            <span>{selectedRows.length} Rows selected</span>
            <Button
              frontIconName="maki:cross"
              frontIconHeght="16"
              frontIconWidth="16"
              bgClass=""
              textClass=""
              onClick={() => setSelectedRows([])}
            />
          </div>
          <div className="flex items-center gap-3  whitespace-nowrap">
            <p className="text-caption">Bulk Actions:</p>
            <Button
              buttonName="Delete"
              frontIconName="ic:baseline-delete"
              frontIconWidth="20"
              frontIconHeght="20"
              className="px-4 py-2 rounded-sm"
              bgClass=""
              textClass="text-body"
            />
          </div>
        </div>
      )}
      <div>
        <DataTable
          loading={loading}
          selectedRows={selectedRows}
          columns={coursesManagementColumns}
          data={courses}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={total}
          renderMobileCard={(row, key) => (
            <CourseCard
              key={key}
              row={row}
              columns={coursesManagementColumns}
              loading={loading}
            />
          )}
        />
      </div>


      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={editingCourse ? "Edit Course" : "Create New Course"}
        >
          <NewCourses
            isEdit={!!editingCourse}
            courseData={editingCourse}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}

      {isDelete && (
        <Modal
          isOpen={isDelete}
          onClose={() => setIsDelete(false)}
          title="Are you absolutely sure?"
        >
          <DeleteConfirmContent
            confirmText={selectedCourse?.title || ""}
            entityName="enrollment"
            message={`You are about to permanently delete ${selectedCourse?.title} enrollment.`}
            onClose={() => setIsDelete(false)}
            loading={isDeleting}
            onConfirm={() => selectedCourse && handleDelete(selectedCourse.id)}
          />
        </Modal>

      )}
    </div>
  );
}

export default CourseManagement;