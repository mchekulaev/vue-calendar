export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = parseDate(dateString)
  return !isNaN(date.getTime())
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false
  
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function isToday(date: Date | null): boolean {
  if (!date) return false
  return isSameDay(date, new Date())
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

export function getCalendarDays(
  year: number,
  month: number,
  firstDayOfWeek: number = 1
): Array<{
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}> {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  
  // Вычисляем сдвиг с учетом первого дня недели
  let startDayOffset = firstDay - firstDayOfWeek
  if (startDayOffset < 0) startDayOffset += 7

  const days: Array<{
    date: Date
    day: number
    isCurrentMonth: boolean
    isToday: boolean
  }> = []
  
  // Дни предыдущего месяца
  const prevMonth = month === 0 ? 11 : month - 1
  const prevMonthYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)
  
  for (let i = startDayOffset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(prevMonthYear, prevMonth, day)
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date)
    })
  }
  
  // Дни текущего месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isToday(date)
    })
  }
  
  // Дни следующего месяца для заполнения последней недели
  const remainingDays = 42 - days.length // 6 недель * 7 дней
  const nextMonth = month === 11 ? 0 : month + 1
  const nextMonthYear = month === 11 ? year + 1 : year
  
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(nextMonthYear, nextMonth, day)
    days.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date)
    })
  }
  
  return days
}

