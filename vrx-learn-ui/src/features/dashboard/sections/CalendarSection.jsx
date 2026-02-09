import React from 'react'
import CalendarUi from '../../calendar/CalendarUi'

function CalendarSection() {
  return (
    <div className='bg-surface rounded-lg p-4'>
        <h3 className='font-semibold text-xl'>Calendar & Schedule</h3>
        <CalendarUi/>
    </div>
  )
}

export default CalendarSection
