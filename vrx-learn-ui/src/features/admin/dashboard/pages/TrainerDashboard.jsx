import React from 'react'
import AssignedCourses from '../sections/AssignedCourses'
import { StatCard } from '@/components/ui'

function TrainerDashboard() {




    return (
        <div className='py-4 px-6 text-main bg-background'>
            <h2 className='text-h2'>Hello, Trainer!</h2>
            <div className='grid grid-cols-4 gap-4 py-4'>
                <StatCard
                    icon="mdi:book-open-variant"
                    label="Assigned Courses"
                    value="15"
                />

                <StatCard
                    icon="mdi:account-group"
                    label="Active Learners"
                    value="143"
                />

                <StatCard
                    icon="mdi:certificate-outline"
                    label="Certificates Issued"
                    value="30"
                />

                <StatCard
                    icon="mdi:check-circle"
                    label="Average Completion"
                    value="78%"
                />
            </div>

            <AssignedCourses />
        </div>
    )
}

export default TrainerDashboard
