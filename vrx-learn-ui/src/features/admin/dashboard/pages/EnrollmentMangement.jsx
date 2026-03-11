import React, { useState } from 'react'
import { Button, FilterSelect, Input, DataTable, Avatar, StatusPill, } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';

function EnrollmentMangement() {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

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
            "id": 21,
            "name": "Heaven Kane",
            "email": "heavenkane@gmail.com",
            "role": "ADMIN",
            "course_name": "A Complete Guide: React - Javascript",
            "enrolled_at": "2026-02-14T09:15:00",
            "status": "ACTIVE",
        },
        {
            "id": 22,
            "name": "Arul S",
            "email": "arul@gmail.com",
            "role": "SUB_ADMIN",
            "course_name": "Advance Full Stack Web Development",
            "enrolled_at": "2026-02-14T09:15:00",
            "status": "PENDING",
        },
        {
            "id": 23,
            "name": "Praveen kumar",
            "email": "praveen@gmail.com",
            "role": "TRAINEE",
            "course_name": "Advance Full Stack Web Development",
            "enrolled_at": "2026-02-14T09:15:00",
            "status": "INACTIVE",
        },
    ]

    const enrollmentsManagementColumns = [

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
            key: "profile",
            label: "Profile",
            width: "8%",
            align: "center",
            render: (row) => (
                <span className='flex justify-center items-center'>
                    <Avatar name={row.name} />
                </span>
            )
        },

        {
            key: "name",
            label: "Name",
            width: "15%",
            align: "left",
            render: (row) => (
                <p className="text-body">{row.name}</p>
            )
        },
        {
            key: "email",
            label: "Email",
            align: "left",
            width: "25%"
        },
        {
            key: "role",
            label: "Role",
            width: "12%",
            render: (row) => (
                <StatusPill status={row.role} />
            )
        },
        {
            key: "course_name",
            label: "Course Name",
            width: "35%",
        },
        {
            key: "date",
            label: "Enrollment Date",
            width: "20%",
            render: (row) => (
                <span className="text-body">
                    {formatDateTime(row.enrolled_at)}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            width: "12%",
            render: (row) => (
                <StatusPill status={row.status} />
            )
        },
        {
            key: "actions",
            label: "Actions",
            width: "12%",
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
        <div className='p-5 bg-background text-main'>
            <div className="flex items-center justify-between h-5">
                <h3 className="text-h3 font-semibold">Enrollment Management</h3>
                {selectedRows.length === 0 &&
                    < div className="flex items-center gap-3">

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
                            buttonName="Add New Enrollment"
                            frontIconName="mdi:plus"
                            frontIconWidth="26"
                            frontIconHeght="26"
                            className="px-3 py-1.5 text-sm rounded-md"
                            bgClass="bg-primary"
                            textClass="text-white"
                        />

                    </div>
                }
            </div>

            {
                selectedRows.length === 0
                    ? (
                        <div className="flex items-center py-5 gap-3  whitespace-nowrap">
                            <Input icon="ic:twotone-search" border="border-default" paddingClass="py-2" widthClass="w-96" placeholder="Search by name or email..." />
                            <FilterSelect
                                label="Users:"
                                options={[
                                    { label: "All Users", value: "all" },
                                    { label: "Admin", value: "admin" },
                                    { label: "Sub Admin", value: "sub_admin" },
                                    { label: "Trainer", value: "trainer" },
                                    { label: "Trainee", value: "trainee" }
                                ]}
                            />
                            <FilterSelect
                                label="Filter by Course:"
                                options={[
                                    { label: "Newest First", value: "newest" },
                                    { label: "Oldest First", value: "oldest" },
                                    { label: "Name (A - Z)", value: "name_asc" },
                                    { label: "Name (Z - A)", value: "name_desc" },
                                ]}
                            />
                            <FilterSelect
                                label="Status:"
                                options={[
                                    { label: "All", value: "all" },
                                    { label: "Active", value: "active" },
                                    { label: "Dropout", value: "dropout" },
                                    { label: "Pending", value: "pending" }
                                ]}
                            />


                        </div>
                    ) : (
                        <div className='flex justify-between items-center py-5 gap-3  whitespace-nowrap'>
                            <div className='flex gap-8 px-2'>
                                <span>{(selectedRows).length} Rows selected</span>
                                <Button frontIconName="maki:cross" frontIconHeght="16" frontIconWidth="16" bgClass="" textClass="" onClick={() => setSelectedRows([])} />
                            </div>
                            <div className='flex items-center gap-3  whitespace-nowrap'>
                                <p className='text-caption'>Bulk Actions:</p>
                                <FilterSelect
                                    label="Change Status:"
                                    options={[
                                        { label: "Active", value: "active" },
                                        { label: "Dropout", value: "dropout" },
                                    ]}
                                />
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
                    )
            }
            <div>
                <DataTable
                    selectedRows={selectedRows}
                    columns={enrollmentsManagementColumns}
                    data={data}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={data.length}
                />
            </div >
        </div>
    )
}

export default EnrollmentMangement
