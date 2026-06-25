import type { CalendarDay, TripCalendarEvent } from '../types'

type CalendarMonthProps = {
  visibleMonth: Date
  events: TripCalendarEvent[]
}

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const statusLabels: Record<TripCalendarEvent['status'], string> = {
  confirmed: 'Confirmed',
  'in-progress': 'In progress',
  attention: 'Attention',
  pending: 'Pending',
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const padDatePart = (value: number) => value.toString().padStart(2, '0')

const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(
    date.getDate(),
  )}`

const parseDateKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number)

  return new Date(year, month - 1, day)
}

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

const isEventOnDate = (event: TripCalendarEvent, isoDate: string) =>
  event.startDate <= isoDate && event.endDate >= isoDate

const getCalendarStart = (visibleMonth: Date) => {
  const firstOfMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  )
  const day = firstOfMonth.getDay()
  const mondayOffset = day === 0 ? 6 : day - 1

  return addDays(firstOfMonth, -mondayOffset)
}

const buildCalendarDays = (
  visibleMonth: Date,
  events: TripCalendarEvent[],
): CalendarDay[] => {
  const todayKey = toDateKey(new Date())
  const calendarStart = getCalendarStart(visibleMonth)

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(calendarStart, index)
    const isoDate = toDateKey(date)

    return {
      isoDate,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === visibleMonth.getMonth(),
      isToday: isoDate === todayKey,
      events: events.filter((event) => isEventOnDate(event, isoDate)),
    }
  })
}

const formatEventRange = (event: TripCalendarEvent) => {
  if (event.startDate === event.endDate) {
    return dateFormatter.format(parseDateKey(event.startDate))
  }

  return `${dateFormatter.format(parseDateKey(event.startDate))} - ${dateFormatter.format(
    parseDateKey(event.endDate),
  )}`
}

export function CalendarMonth({ visibleMonth, events }: CalendarMonthProps) {
  const days = buildCalendarDays(visibleMonth, events)

  return (
    <section className="calendar-panel" aria-label="Monthly trip calendar">
      <div className="calendar-weekdays" aria-hidden="true">
        {weekdayLabels.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => (
          <article
            className="calendar-day"
            data-current-month={day.isCurrentMonth}
            data-today={day.isToday}
            key={day.isoDate}
          >
            <div className="day-header">
              <span>{day.dayNumber}</span>
              {day.isToday && <strong>Today</strong>}
            </div>

            <div className="day-events">
              {day.events.map((event) => (
                <article className="calendar-event" data-status={event.status} key={event.id}>
                  <div>
                    <strong>{event.tripName}</strong>
                    <span>{event.destination}</span>
                  </div>
                  <footer>
                    <span>{statusLabels[event.status]}</span>
                    <small>{formatEventRange(event)}</small>
                  </footer>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
