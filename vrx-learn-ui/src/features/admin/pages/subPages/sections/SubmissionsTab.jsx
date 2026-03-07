import useAssignmentSubmissions from '../../../hooks/useAssignmentSubmissions';
import { useParams } from 'react-router-dom';
import { DataTable, Avatar, StatusPill } from '@/components/ui';
import formatDateTime from '@/utils/formatDateTime';





export default function Submissions() {
    const { assignmentId } = useParams();
    console.log(assignmentId);

    const { submissions, loading, error, refetch } =
        useAssignmentSubmissions(assignmentId);


    const columns = [
        {
            key: "student",
            label: "Student Name",
            width: "35%",
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
            render: (row)=>(
                formatDateTime(row.submission_date)
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
        },
    ];

    console.log(columns);

    if (loading) return <p>Loading submissions...</p>;
    if (error) return <p>Error loading submissions</p>;

    return (
        <div>
            <DataTable columns={columns} data={submissions} />
        </div>
    );
}