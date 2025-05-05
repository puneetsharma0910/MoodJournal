export const getCurrentDateString = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export const getDayName = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false
  return date1 === date2
}
