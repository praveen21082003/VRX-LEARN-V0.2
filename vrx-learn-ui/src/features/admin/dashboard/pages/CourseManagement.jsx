import React, { useState } from 'react'
import { Button, FilterSelect, Input, DataTable, Avatar, StatusPill, } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';

function CourseManagement() {

    const [selectedRows, setSelectedRows] = useState([]);

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
            width: "25%"
        },
        {
            key: "overview",
            label: "Overview",
            align: "left",
            width: "25%"
        },
        {
            key: "trainers",
            label: "Trainers",
            align: "left",
            width: "25%"
        },
        {
            key: "no_of_trainee",
            label: "No. of Trainee",
            align: "left",
            width: "25%"
        },
        {
            key: "created_at",
            label: "Created At",
            align: "left",
            width: "25%"
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
                            buttonName="Add New Course"
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

                        </div>
                    ) : (
                        <div className='flex justify-between items-center py-5 gap-3  whitespace-nowrap'>
                            <div className='flex gap-8 px-2'>
                                <span>{(selectedRows).length} Rows selected</span>
                                <Button frontIconName="maki:cross" frontIconHeght="16" frontIconWidth="16" bgClass="" textClass="" onClick={() => setSelectedRows([])} />
                            </div>
                            <div className='flex items-center gap-3  whitespace-nowrap'>
                                <p className='text-caption'>Bulk Actions:</p>
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
                    columns={coursesManagementColumns}
                // data={data}
                // page={page}
                // setPage={setPage}
                // pageSize={pageSize}
                // setPageSize={setPageSize}
                // total={data.length}
                />
            </div >

        </div>
    )
}

export default CourseManagement
