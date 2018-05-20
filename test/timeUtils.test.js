const expect = require('chai').expect
const timeUtils = require('../timeUtils.js')

const startError = 'Error - Start time no sooner than 5:00pm'
const endError = 'Error - End time is only valid from 5:00pm to 4:00am'
const bedError = 'Error - Bed time must be after start time and by midnight'
const startSequenceError = 'Error - Start time is preceeded by end or bed time'

let startTime, endTime, bedTime

describe('The babysitter time inputs', () => {

  beforeEach(() => {
    startTime = new Date('May 11, 2018 18:00:00')
    endTime = new Date('May 12, 2018 03:00:00')
    bedTime = new Date('May 11, 2018 22:00:00')
  })

  describe('Starting time', () => {

    it('is valid on or after 5pm', () => {
      expect(timeUtils.isStartTimeValid(startTime)).to.be.true
    })

    it('is invalid before 5pm', () => {
      startTime.setHours(16);
      expect(timeUtils.isStartTimeValid(startTime)).to.be.false
    })

    it('rounds to the next hour if seconds not on the hour', () => {
      startTime = new Date('May 11, 2018 18:00:01')
      expect(timeUtils.removePartialHours(startTime)).to.equal(19)
    })

    it('rounds to the next hour if minutes not on the hour', () => {
      startTime = new Date('May 11, 2018 18:01:00')
      expect(timeUtils.removePartialHours(startTime)).to.equal(19)
    })

    it('returns error message for invalid start time', () => {
      startTime.setHours(4)
      expect(timeUtils.notifyError(startTime, endTime, bedTime)).to.equal(startError)
    })

  })

  describe('Ending time', () => {

    it('is valid on or before 4am', () => {
      expect(timeUtils.isEndTimeValid(endTime)).to.be.true
    })

    it('is valid on or after 5pm', () => {
      endTime.setHours(17)
      expect(timeUtils.isEndTimeValid(endTime)).to.be.true
    })

    it('is invalid if between 4:00am and 5:00pm', () => {
      endTime.setHours(5)
      expect(timeUtils.isEndTimeValid(endTime)).to.be.false
    })

    it('is end time before bed time', () => {
      endTime = new Date('May 11, 2018 21:00:00')
      expect(timeUtils.isEndTimeOnOrBeforeBedTime(endTime, bedTime)).to.be.true
    })

    it('is end time equal to bed time', () => {
      endTime = new Date('May 11, 2018 22:00:00')
      expect(timeUtils.isEndTimeOnOrBeforeBedTime(endTime, bedTime)).to.be.true
    })

    it('returns error message for invalid end time', () => {
      endTime.setHours(5)
      expect(timeUtils.notifyError(startTime, endTime, bedTime)).to.equal(endError)
    })

  })

  describe('Bedtime', () => {

    it('is valid after start time', () => {
      expect(timeUtils.isBedTimeValid(startTime, bedTime)).to.be.true
    })

    it('is valid for midnight', () => {
      bedTime.setHours(0)
      expect(timeUtils.isBedTimeValid(startTime, bedTime)).to.be.true
    })

    it('is invalid between midnight and 5:00pm', () => {
      bedTime.setHours(1)
      expect(timeUtils.isBedTimeValid(startTime, bedTime)).to.be.false
    })

    it('returns error message for invalid bed time', () => {
      bedTime.setHours(5)
      expect(timeUtils.notifyError(startTime, endTime, bedTime)).to.equal(bedError)
    })

  })

  describe('Start time sequence check', () => {

    it('returns true if valid order', () => {
      expect(timeUtils.isStartTimeSequenceValid(startTime, endTime, bedTime)).to.be.true
    })

    it('returns false if bedTime preceeds startTime', () => {
      endTime = new Date('May 11, 2018 17:00:00')
      expect(timeUtils.isStartTimeSequenceValid(startTime, endTime, bedTime)).to.be.false
    })

    it('returns false if endTime preceeds startTime', () => {
      bedTime = new Date('May 11, 2018 17:00:00')
      expect(timeUtils.isStartTimeSequenceValid(startTime, endTime, bedTime)).to.be.false
    })

    it('returns error message for invalid start time sequence', () => {
      endTime = new Date('May 11, 2018 17:00:00')
      expect(timeUtils.notifyError(startTime, endTime, bedTime)).to.equal(startSequenceError)
    })

  })

})