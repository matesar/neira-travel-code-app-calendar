export type TripStatus = 'confirmed' | 'in-progress' | 'attention' | 'pending'

export type TripCalendarEvent = {
  id: string
  dataverseId?: string
  tripName: string
  destination: string
  startDate: string
  endDate: string
  status: TripStatus
}

export type CalendarDay = {
  isoDate: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  events: TripCalendarEvent[]
}
