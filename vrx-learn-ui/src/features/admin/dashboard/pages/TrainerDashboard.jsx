import React, { useEffect } from 'react'
import AssignedCourses from '../sections/AssignedCourses'
import { StatCard } from '@/components/ui'
import { useTrainerKpis } from '../../hooks/useTrainerKpis'
import { useAuth } from '@/context/AuthContext'

function TrainerDashboard() {

    const { user } = useAuth();

    const { kpisData, loading, error, fetchKpis } = useTrainerKpis();


    useEffect(() => {
        fetchKpis();
    }, [])


    const kpis = [
        {
            key: "assigned_courses",
            label: "Assigned Courses",
            Icon: "mdi:book-open-variant",
            value: kpisData?.assignedCourses
        },
        {
            key: "active_learners",
            label: "Active Learners",
            Icon: "mdi:certificate-outline",
            value: kpisData?.totalLearners
        },
        {
            key: "certificated_issued",
            label: "Certificates Issued",
            Icon: "mdi:certificate-outline",
            value: kpisData?.certificatesIssused
        },
        {
            key: "average_completion",
            label: "Average Completion",
            Icon: "mdi:check-circle",
            value: kpisData?.averageCompletion
        }
    ]


    return (
        <div className='p-3 sm:p-4 text-main bg-background'>
            <h2 className='text-h2'>Hello,{user?.username}!</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4'>
                {kpis.map((kpi) => (
                    <StatCard
                        key={kpi.key}
                        icon={kpi.Icon}
                        label={kpi.label}
                        value={kpi.value}
                        loading={loading}
                    />
                ))}
            </div>

            <AssignedCourses />
        </div>
    )
}

export default TrainerDashboard
