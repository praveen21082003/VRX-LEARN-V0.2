import React, { useState } from 'react'
import { useParams } from 'react-router-dom';



import { Icon, Input, Button, DataTable, Avatar, ProgressBar, } from '@/components/ui'
import BackButton from '@/components/navigation/BackButton'
import formatDateTime from '@/utils/formatDateTime';

function UsersManagement() {
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
            key: "progress",
            label: "Progress",
            width: "12%",
            render: (row) => (
                <ProgressBar percent={row.progress} bgClass="bg-brand" roundedClass="rounded-xs" hClass="h-3" />
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
            "progress": 20,
            "last_active": "10 min ago",
        },
        {
            "id": 26,
            "name": "Heaven Kane",
            "email": "heavenkane@gmail.com",
            "enrollment_date": "2026-02-14T09:15:00",
            "progress": 50,
            "last_active": "10 min ago",
        },
        {
            "id": 26,
            "name": "Heaven Kane",
            "email": "heavenkane@gmail.com",
            "enrollment_date": "2026-02-14T09:15:00",
            "progress": 80,
            "last_active": "10 min ago",
        },
    ]


    return (
        <div className='p-6 bg-background text-main'>

            <div className="flex items-center justify-between">



                <h3 className="text-h3 font-semibold">User Management</h3>



                <div className="flex items-center gap-3">

                    <Button
                        buttonName="Export as CSV"
                        frontIconName="material-symbols:download"
                        frontIconWidth="26"
                        frontIconHeght="26"
                        className="px-3 py-1.5 text-sm rounded-md"
                        bgClass=""
                        textClass="text-body"
                    />

                    <Button
                        buttonName="Add New User"
                        frontIconName="mdi:plus"
                        frontIconWidth="26"
                        frontIconHeght="26"
                        className="px-3 py-1.5 text-sm rounded-md"
                        bgClass="bg-primary"
                        textClass="text-white"
                    />

                </div>

            </div>



            <div className='flex py-5 gap-5 w-[45%]'>
                <Input icon="ic:twotone-search" border="border-default" placeholder="Search by name or email..." />
                <div className="flex items-center border-2 border-default rounded-sm px-3 py-1 text-muted">
                    <span className="text-sm mr-2 whitespace-nowrap">Sort by:</span>

                    <select className="bg-background outline-none text-sm">
                        <option value="none">None</option>
                        <option value="enrollment">Enrollment Date</option>
                        <option value="lastActive">Last Active</option>
                    </select>
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
    )
}

export default UsersManagement
