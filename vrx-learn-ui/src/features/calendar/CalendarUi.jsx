import React from 'react'
import useEvents from './hooks/useEvents'
import Calendar from './sections/Calendar';
import Events from './sections/Events';

function CalendarUi() {
  const { events, loading, error } = useEvents();

  if (!events && loading) {
    return <p>loading...</p>
  }


  return (
    <div>
      <div className="w-full rounded-xl bg-white p-4">
        <Calendar events={events} />
      </div>

      <Events events={events} />

    </div>

  )
}

export default CalendarUi
