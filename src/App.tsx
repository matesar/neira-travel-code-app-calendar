import { useMemo, useState } from 'react'
import './App.css'
import { CalendarMonth } from './components/CalendarMonth'
import { mockTripEvents } from './data/mockTrips'

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

const getMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

const addMonths = (date: Date, months: number) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1)

function App() {
  const [visibleMonth, setVisibleMonth] = useState(() => getMonthStart(new Date()))

  const sortedTripEvents = useMemo(
    () =>
      [...mockTripEvents].sort((first, second) =>
        first.startDate.localeCompare(second.startDate),
      ),
    [],
  )

  return (
    <main className="calendar-app">
      <header className="calendar-topbar">
        <div className="brand-block">
          <span className="brand-mark" aria-hidden="true">
            N
          </span>
          <div>
            <p>NEIRA Travel</p>
            <h1>NEIRA Travel Calendar</h1>
          </div>
        </div>

        <div className="calendar-controls" aria-label="Calendar controls">
          <strong>{monthFormatter.format(visibleMonth)}</strong>
          <div className="calendar-buttons">
            <button
              onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
              type="button"
            >
              Previous
            </button>
            <button onClick={() => setVisibleMonth(getMonthStart(new Date()))} type="button">
              Today
            </button>
            <button
              onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </header>

      <CalendarMonth events={sortedTripEvents} visibleMonth={visibleMonth} />
    </main>
  )
}

export default App
