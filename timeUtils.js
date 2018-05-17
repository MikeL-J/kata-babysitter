let isStartTimeValid = (startTime) => {
  return startTime.getHours() >= 17
}

let isEndTimeValid = (endTime) => {
  return endTime.getHours() <= 4 || endTime.getHours() >= 17 
}

let isBedTimeValid = (startTime, bedTime) => {
  return bedTime.getHours() > startTime.getHours() || 
         bedTime.getHours() == 0
}

module.exports = {
  isStartTimeValid: isStartTimeValid,
  isEndTimeValid: isEndTimeValid,
  isBedTimeValid: isBedTimeValid
}