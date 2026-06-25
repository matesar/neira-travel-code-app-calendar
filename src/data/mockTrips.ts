import type { TripCalendarEvent } from '../types'

const padDatePart = (value: number) => value.toString().padStart(2, '0')

const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(
    date.getDate(),
  )}`

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()

const dateInCurrentMonth = (day: number) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const clampedDay = Math.min(day, daysInMonth(year, month))

  return toDateKey(new Date(year, month, clampedDay))
}

const dateInNextMonth = (day: number) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const clampedDay = Math.min(day, daysInMonth(year, month))

  return toDateKey(new Date(year, month, clampedDay))
}

// Shape mirrors a future Dataverse Trips projection: id, name, destination,
// start/end dates, and operational status.
export const mockTripEvents: TripCalendarEvent[] = [
  {
    id: 'TR-1024',
    dataverseId: 'mock-trip-1024',
    tripName: 'Patagonia Luxury Circuit',
    destination: 'El Calafate and Torres del Paine',
    startDate: dateInCurrentMonth(3),
    endDate: dateInCurrentMonth(9),
    status: 'confirmed',
  },
  {
    id: 'TR-1088',
    dataverseId: 'mock-trip-1088',
    tripName: 'Wine Roads Private Group',
    destination: 'Mendoza',
    startDate: dateInCurrentMonth(12),
    endDate: dateInCurrentMonth(15),
    status: 'in-progress',
  },
  {
    id: 'TR-1101',
    dataverseId: 'mock-trip-1101',
    tripName: 'Brazil Visa Review',
    destination: 'Rio de Janeiro',
    startDate: dateInCurrentMonth(18),
    endDate: dateInCurrentMonth(18),
    status: 'attention',
  },
  {
    id: 'TR-1120',
    dataverseId: 'mock-trip-1120',
    tripName: 'Andean Lakes Family Journey',
    destination: 'Bariloche and Villa La Angostura',
    startDate: dateInCurrentMonth(22),
    endDate: dateInCurrentMonth(27),
    status: 'confirmed',
  },
  {
    id: 'TR-1146',
    dataverseId: 'mock-trip-1146',
    tripName: 'Iguazu Falls Signature Escape',
    destination: 'Puerto Iguazu',
    startDate: dateInCurrentMonth(29),
    endDate: dateInNextMonth(2),
    status: 'pending',
  },
]
