

import { DataTable, Input, Avatar, StatusPill, Button } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';
import { useState } from 'react';





export default function Submissions({ setActiveTab, submissions, setActiveAssignmentId }) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);



    const columns = [
        {
            key: "student",
            label: "Student Name",
            width: "35%",
            align: "left",
            render: (row) => (
                <div className="flex items-center text-main gap-2">
                    <Avatar name={row.name} />
                    <div>
                        <p className='text-body'>{row.name}</p>
                        <p className="text-caption">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            key: "attempt",
            label: "Attempt",
            width: "10%",
        },
        {
            key: "date",
            label: "Submission Date",
            width: "20%",
            render: (row) => (
                <span className='text-body'>{formatDateTime(row.submission_date)}</span>
            )
        },
        {
            key: "status",
            label: "Status",
            width: "15%",
            render: (row) => (
                <StatusPill status={row.status} />
            ),
        },
        {
            key: "grade",
            label: "Grade",
            width: "10%",
            render: (row) => (
                <div className="flex text-body items-center gap-1">
                    <div className="border border-default w-12 h-7 flex items-center justify-center">
                        {row.status === "GRADED" ? row.grade : ""}
                    </div>
                    <span>/100</span>
                </div>
            )
        },
        {
            key: "actions",
            label: "Actions",
            width: "10%",
            render: (row) => (
                <div className='flex justify-center items-center'>
                    <Button frontIconName="iconamoon:eye-light" frontIconHeight="18" frontIconWidth="18" bgClass="" textClass="" onClick={() => { setActiveTab("view_submission"); setActiveAssignmentId(row.id) }} />
                </div>
            )
        },
    ];

    return (
        <div className='space-y-2'>
            <div className='flex justify-between gap-5 items-end w-full'>
                <div className='flex gap-2'>
                    <Input label="From Date" paddingClass="py-1 px-2" placeholder="DD/MM/YYYY" type="datetime-local" />
                    <Input label="To Date" paddingClass="py-1 px-2" placeholder="DD/MM/YYYY" type="datetime-local" />
                    <Input label="Status" paddingClass="py-1 px-2" placeholder="All" />
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='text-h5 text-main dark:text-white'>Grade</label>
                        <div className='flex gap-3 items-center w-40'>
                            <Input paddingClass="py-1 px-2"  placeholder="min" />
                            <span>to</span>
                            <Input paddingClass="py-1 px-2"  placeholder="max" />
                        </div>
                    </div>
                </div>
                <div className='flex w-40'>
                    <Button buttonName="Export as CSV" frontIconName="material-symbols:download" frontIconHeght="24" frontIconWidth="24" className="p-1 px-2 rounded font-semibold text-md" bgClass="" textClass="text-primary dark:text-background" />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={submissions}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={submissions.length}
            />
        </div>
    );
}