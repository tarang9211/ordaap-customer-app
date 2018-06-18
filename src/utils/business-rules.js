const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const getCurrentOrNextWorkingDayTimings = (openHours, day = new Date().getDay()) => {
  const timings = []
  const key = days[day > 6 ? 0 : day]
  const context = openHours[key]

  if (!context) {
    return getCurrentOrNextWorkingDayTimings(openHours, day + 1)
  }

  const splits = context.split(',').map(item => item.trim())

  for (let i = 0; i < splits.length; i += 2) {
    timings.push({
      key,
      min: splits[i],
      max: splits[i + 1]
    })
  }

  return timings
}

const to12HourTime = (militaryTime) => {
  const splits = militaryTime.split(':')
  let hour = splits[0]
  const amPm = parseInt(hour, 10) >= 12 ? 'PM' : 'AM'
  hour = hour > 12 ? hour - 12 : hour

  if (splits[1] === '00') { return `${hour} ${amPm}` }

  return `${hour}:${splits[1]} ${amPm}`
}

const computeOpenHours = (openHours, isRoomService) => {
  const timings = getCurrentOrNextWorkingDayTimings(openHours)

  const today = new Date()
  const currentTime = parseInt(`${today.getHours()}${today.getMinutes()}`, 10)

  const matchedTimings = timings.filter(t => parseInt(t.min.replace(':', ''), 10) <= currentTime && parseInt(t.max.replace(':', ''), 10) >= currentTime)
  if (matchedTimings && matchedTimings.length) {
    if (isRoomService) return 'Open Now'
    return `Open Now. Closes at ${to12HourTime(matchedTimings[0].max)}`
  }

  const nextTimings = timings.filter(t => parseInt(t.min.replace(':', ''), 10) > currentTime)

  if (nextTimings && nextTimings.length) {
    if (isRoomService) return 'Closed Now'
    return `Closed Now. Opens at ${to12HourTime(nextTimings[0].min)}.`
  }

  return 'Closed Now'
}

const isMenuItemAvailable = (availability, now = new Date()) => {
  if (availability == null) return true
  const timings = []
  const day = now.getDay()
  const key = days[day > 6 ? 0 : day]
  const context = availability[key]
  if (typeof context === 'undefined') return false

  const splits = context.split(',').map(item => item.trim())

  for (let i = 0; i < splits.length; i += 2) {
    timings.push({
      key,
      min: splits[i],
      max: splits[i + 1]
    })
  }

  const currentTime = parseInt(`${now.getHours()}${now.getMinutes()}`, 10)
  const matchedTimings = timings.filter(t => parseInt(t.min.replace(':', ''), 10) <= currentTime && parseInt(t.max.replace(':', ''), 10) >= currentTime)

  return matchedTimings != null && matchedTimings.length > 0
}

const businessRules = { isMenuItemAvailable, computeOpenHours }

export default businessRules
