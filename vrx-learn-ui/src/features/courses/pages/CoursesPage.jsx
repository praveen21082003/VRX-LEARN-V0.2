import React from 'react'
import AllCoursesSection from '../sections/AllCoursesSections'
import MyCoursesSection from '../sections/MyCoursesSection'

function CoursesPage() {
    return (
        <div className='flex flex-col p-6 gap-6'>
            <AllCoursesSection />
            <MyCoursesSection />
        </div>

    )
}

export default CoursesPage
