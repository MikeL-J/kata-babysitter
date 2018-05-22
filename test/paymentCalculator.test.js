const expect = require('chai').expect
const payment = require('../paymentCalculator.js')

let rateBeforeBedtime = 12
let rateTillMidnight = 8
let rateAfterMidnight = 16

let beforeBedtimeHours, beforeMidnightHours, afterMidnightHours

describe('Calculate babysitter payment', () => {

  beforeEach(() => {
    startTime = new Date('May 11, 2018 18:00:00')
    endTime = new Date('May 12, 2018 03:00:00')
    bedTime = new Date('May 11, 2018 22:00:00')
  })

  it('should return the payment before bed time', () => {
    expect(payment.calculatePaymentBeforeBedTime(startTime, endTime, bedTime)).to.equal(48)
  })

  it('should return the payment till midnight', () => {
    expect(payment.calculatePaymentTillMidnight(endTime, bedTime)).to.equal(16)
  })

  it('should return the payment after midnight', () => {
    expect(payment.calculatePaymentAfterMidnight(endTime, bedTime)).to.equal(48)
  })

  it('should return the total babysitter payment', () => {
    expect(payment.calculatePayment(startTime, endTime, bedTime)).to.equal(112)
  })

  it('should return the correct payment when end time is before bedtime', () => {
    endTime = new Date('May 11, 2018 21:00:00')
    expect(payment.calculatePayment(startTime, endTime, bedTime)).to.equal(36)
  })

  it('should return a payment of zero when start and end times are equal', () => {
    endTime = new Date('May 11, 2018 18:00:00')
    expect(payment.calculatePayment(startTime, endTime, bedTime)).to.equal(0)
  })

  it('should return the correct payment when bedtime is midnight', () => {
    bedTime = new Date('May 12, 2018 00:00:00')
    expect(payment.calculatePayment(startTime, endTime, bedTime)).to.equal(120)
  })

})