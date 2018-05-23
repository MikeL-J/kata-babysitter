const payment = require('./paymentCalculator.js')//.paymentCalculator

let getArgValue = (argName) => {
  let index = process.argv.indexOf(argName)
  return (index === -1) ? null : process.argv[index+1]
}

let startTime = new Date(getArgValue('--startTime'))// + ' UTC')
let endTime = new Date(getArgValue('--endTime'))// + ' UTC')
let bedTime = new Date(getArgValue('--bedTime'))// + ' UTC')

let today = new Date()
let timeZoneOffsetInHours = today.getTimezoneOffset()/60 - 4

startTime.setHours(startTime.getHours() + timeZoneOffsetInHours)
endTime.setHours(endTime.getHours() + timeZoneOffsetInHours)
bedTime.setHours(bedTime.getHours() + timeZoneOffsetInHours)

console.log("Start Time: ", startTime.toString())
console.log("End Time: ", endTime.toString())
console.log("Bedtime: ", bedTime.toString())

let finalPayment = payment.calculatePayment(startTime, endTime, bedTime)
!!finalPayment ? console.log('Baysitter payment = $', finalPayment) :
console.log('Baysitter payment = $0')
console.log('')

//Sample command line to run the application (must have node installed)
//node app --startTime 'May 11, 2018 18:00:00' --endTime 'May 12, 2018 03:00:00'  --bedTime 'May 11, 2018 22:00:00'