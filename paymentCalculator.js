const timeUtils = require('./timeUtils.js')

const rateBeforeBedTime = 12
const rateTillMidnight = 8
const rateAfterMidnight = 16
const midnight = 24

let calculatePaymentBeforeBedTime = (startTime, endTime, bedTime) => {
  startHour = timeUtils.removePartialHours(startTime)
  if(timeUtils.isEndTimeOnOrBeforeBedTime(endTime, bedTime)) {
    bedTime = endTime
  } 
  let beforeBedTimeInterval = bedTime.getHours() - startHour
  beforeBedTimeInterval = beforeBedTimeInterval > 0 ? beforeBedTimeInterval : 0 
  return beforeBedTimeInterval * rateBeforeBedTime
}

let calculatePaymentTillMidnight = (endTime, bedTime) => {
  if(timeUtils.isEndTimeOnOrBeforeBedTime(endTime, bedTime)) {
    bedTime = endTime
  } 
  return (midnight - bedTime.getHours()) * rateTillMidnight
}

module.exports = {
  calculatePaymentBeforeBedTime: calculatePaymentBeforeBedTime,
  calculatePaymentTillMidnight: calculatePaymentTillMidnight
}

