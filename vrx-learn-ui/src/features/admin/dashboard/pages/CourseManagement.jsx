import React, { useState } from 'react'
import { Button, Select, Input, DataTable, Avatar, StatusPill, CourseCard } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';
import Modal from '../../../../components/ui/Modal/Modal';
import NewCourses from '../../dialogs/NewCourses';

function CourseManagement() {
  const isMobile = window.innerWidth < 768;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);


  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };



  const data = [
    {
      "id": 1,
      "title": "Advanced Web Development",
      "description": "The z/OS System Programming course provides an in-depth understanding of IBM mainframe operating systems.",
      "trainers": ["Jhon Doe", "Virat Kohli", "Lilith Vishwa"],
      "students": 130,
      "date": "2026-01-02"
    },
    {
      "id": 2,
      "title": "Advanced UI/UX Design: Prototyping in Figma",
      "description": "Master the principles of user-centric design, from initial wireframing to high-fidelity prototyping.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 78,
      "date": "2026-01-02"
    },
    {
      "id": 3,
      "title": "Modern React: Component Architecture and State Management",
      "description": "Build dynamic, scalable web applications from the ground up using advanced React concepts.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 12,
      "date": "2026-01-02"
    },
    {
      "id": 4,
      "title": "Modern React: Component Architecture and State Management",
      "description": "Build dynamic, scalable web applications from the ground up. Explore advanced React patterns and state management.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 56,
      "date": "2026-01-02"
    },
    {
      "id": 5,
      "title": "Applied Large Language Models (LLMs) in Python",
      "description": "Dive into practical applications of open-source and commercial LLMs. Learn how to leverage models like GPT in Python.",
      "trainers": ["Jhon Doe", "Virat Kohli"],
      "students": 80,
      "date": "2026-01-02"
    }
  ]

  // Derive unique trainers list from data
  const allTrainers = [...new Set(data.flatMap((course) => course.trainers))];

  // Derive unique course titles from data
  const allTitles = [...new Set(data.map((course) => course.title))];

  const allDescription = [...new Set(data.map((course) => course.description))];

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
      width: "20%"
    },
    {
      key: "description",
      label: "Overview",
      align: "left",
      width: "30%"
    },
    {
      key: "trainers",
      label: "Trainers",
      align: "left",
      width: "15%",
      render: (row) => (
        <span className='text-emphasis text-main'>
          {row.trainers?.join(", ")}
        </span>
      )
    },
    {
      key: "students",
      label: "No.of Trainee",
      align: "left",
      width: "10%"
    },
    {
      key: "created_at",
      label: "Created At",
      align: "left",
      width: "10%",
      render: (row) => (
        <span className="text-caption">
          {formatDateTime(row.date)}
        </span>
      )
    },
    {
      key: "actions",
      label: "Actions",
      width: "10%",
      render: (row) => {
        const actions = ["mingcute:pencil-line", "ic:baseline-delete"]

        return (
          <div className="flex items-center justify-center gap-3">
            {actions.map((icon, index) => (
              <Button key={index} frontIconName={icon} frontIconHeight="18" frontIconWidth="18" bgClass="" textClass="" />
              // onClick={() => { setActiveTab("view_submission"); setActiveAssignmentId(row.id) }}
            ))}
          </div>
        )
      }


    },
  ]

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-h3 font-semibold">Course Management</h3>
        {selectedRows.length === 0 && (
          <div className="flex items-center lg:gap-3">
            <Button
              buttonName="Export as CSV"
              frontIconName="material-symbols:download"
              frontIconWidth="26"
              frontIconHeght="26"
              className="lg:p-3 lg:py-1.5 text-sm rounded-md"
              bgClass=""
              textClass="lg:text-body"
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
              onClick={() => setOpen(true)}
              isMobile={isMobile}
            />
          </div>
        )}
      </div>
      {selectedRows.length === 0 ? (
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center py-5 gap-3">
          <Input
            icon="ic:twotone-search"
            border="border-default"
            paddingClass="py-2"
            widthClass="w-full lg:w-96"
            placeholder="Search by name or email..."
          />
          <Select
            label="Filter by Course:"
            options={[
              { label: "Newest First", value: "newest" },
              { label: "Oldest First", value: "oldest" },
              { label: "Name (A - Z)", value: "name_asc" },
              { label: "Name (Z - A)", value: "name_desc" },
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
          selectedRows={selectedRows}
          columns={coursesManagementColumns}
          data={data}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={data.length}
          renderMobileCard={(row) => (
            <CourseCard
              row={row}
              columns={coursesManagementColumns}
            />
          )}
        />
      </div>


      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Add New Course"
        >
          {/* Pass trainers and titles derived from data as props */}
          <NewCourses trainers={allTrainers} courseTitles={allTitles} description={allDescription} />
        </Modal>
      )}
    </div>
  );
}

export default CourseManagement;