const startError = 'Error - Start time no sooner than 5:00pm'
const endError = 'Error - End time is only valid from 5:00pm to 4:00am'
const bedError = 'Error - Bed time must be after start time and by midnight'
const startSequenceError = 'Error - Start time is preceded by end or bed time'

let isStartTimeValid = (startTime) => {
  return startTime.getHours() >= 17
}

let isEndTimeValid = (endTime) => {
  return endTime.getHours() <= 4 || endTime.getHours() >= 17
}

let isBedTimeValid = (startTime, bedTime) => {
  return bedTime.getHours() > startTime.getHours() ||
    bedTime.getHours() === 0
}

let isEndTimeOnOrBeforeBedTime = (endTime, bedTime) => {
  return endTime <= bedTime
}

let isBedTimeAtMidnight = (bedTime) => {
  return bedTime.getHours() === 0
}

let isStartTimeSequenceValid = (startTime, endTime, bedTime) => {
  return startTime <= endTime && startTime <= bedTime
}

let removePartialHours = (startTime) => {
  (startTime.getMinutes() > 0 || startTime.getSeconds() > 0) ?
    (startTime.setHours(startTime.getHours() + 1)) : startTime
  return startTime.getHours()
}

let notifyError = (startTime, endTime, bedTime) => {
  if (!isStartTimeValid(startTime)) {
    return startError
  } else if (!isEndTimeValid(endTime)) {
    return endError
  } else if (!isBedTimeValid(startTime, bedTime)) {
    return bedError
  } else if (!isStartTimeSequenceValid(startTime, endTime, bedTime)) {
    return startSequenceError
  }
}

module.exports = {
  isStartTimeValid: isStartTimeValid,
  isEndTimeValid: isEndTimeValid,
  isBedTimeValid: isBedTimeValid,
  isBedTimeAtMidnight: isBedTimeAtMidnight,
  isEndTimeOnOrBeforeBedTime: isEndTimeOnOrBeforeBedTime,
  isStartTimeSequenceValid: isStartTimeSequenceValid,
  removePartialHours: removePartialHours,
  notifyError: notifyError
}