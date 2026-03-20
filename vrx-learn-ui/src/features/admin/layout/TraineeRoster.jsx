import React, { useState } from 'react'
import { useParams } from 'react-router-dom';



import { Icon, Input, Button, DataTable, Avatar, StatusPill,Select } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton'
import formatDateTime from '@/utils/formatDateTime';



function TraineeRoster() {

  const { courseSlug } = useParams();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);


  const traineeRosterColumns = [
    {
      key: "name",
      label: "Trainee",
      width: "20%",
      align: "left",
      render: (row) => (
        <div className="flex items-center text-main gap-2">
          <Avatar name={row.name} />
          <p className="text-body">{row.name}</p>
        </div>
      )
    },
    {
      key: "email",
      label: "Email",
      align: "left",
      width: "25%"
    },
    {
      key: "date",
      label: "Enrollment Date",
      width: "20%",
      render: (row) => (
        <span className="text-body">
          {formatDateTime(row.enrollment_date)}
        </span>
      )
    },
    {
      key: "role",
      label: "Role",
      width: "12%",
      render: (row) => (
        <StatusPill status = {row.role} />
      )
    },
    {
      key: "last_active",
      label: "Last Active",
      width: "15%"
    }
  ];


  const data = [
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINER",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINER",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINER",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINER",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINEE",
      "last_active": "10 min ago",
    },
    {
      "id": 26,
      "name": "Heaven Kane",
      "email": "heavenkane@gmail.com",
      "enrollment_date": "2026-02-14T09:15:00",
      "role" :"TRAINER",
      "last_active": "10 min ago",
    },
  ]


  return (
    <div className='p-6 bg-background text-main'>
      <div className="mb-2 w-full hidden lg:block">
        <BackButton to={`/course/${courseSlug}/overview`} iconName="material-symbols:arrow-back-rounded" label="Back to Overview" />
      </div>
      <div className="p-4 border border-default rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">


          <div className="flex flex-col gap-1">
            <h3 className="text-h3 font-semibold">Trainee Roster</h3>

            <div className="flex items-center gap-2 text-caption text-muted">
              <Icon name="mdi:users" height="16" width="16" />
              <span>143 Trainees Enrolled</span>
            </div>
          </div>



          <div className="hidden md:grid grid-cols-2  items-center gap-3">

            <Button
              buttonName="Export as CSV"
              frontIconName="material-symbols:download"
              frontIconWidth="26"
              frontIconHeght="26"
              className="px-3 py-2 text-sm rounded-md w-full md:w-auto border border-default"
              bgClass=""
              textClass="text-body"
            />

            <Button
              buttonName="Enroll Trainee"
              frontIconName="mdi:plus"
              frontIconWidth="26"
              frontIconHeght="26"
              className="px-3 py-1.5 text-sm rounded-md w-full md:w-auto"
              bgClass="bg-primary"
              textClass="text-white"
            />

          </div>

        </div>



        <div className='flex flex-col md:flex-row py-5 gap-3 w-full md:w-[75%]  lg:w-[50%]'>
          <Input icon="ic:twotone-search" border="border-default" paddingClass="py-2" widthClass="w-96" placeholder="Search by name or email..." />
          <div className="w-full  md:w-45 lg:w-55 ">
              <Select
              label="Sort By :"
              options={[
              { label: "None", value: "None" },
              { label: "Enrollment", value: "enrollment" },
              { label: "Last Active", value: "last_active" },                     
              ]}
              />
              </div>
        </div>
        <div>
          <DataTable
            columns={traineeRosterColumns}
            data={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={data.length}
          />
        </div>
      </div>

    </div>
  )
}

export default TraineeRoster
