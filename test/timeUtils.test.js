const expect = require('chai').expect
const timeUtils = require('../timeUtils.js')

let startTime, endTime, bedTime

describe('The babysitter time inputs', () => {
 
  beforeEach(() => {
    startTime = new Date('May 11, 2018 17:00:00')
    endTime = new Date('May 12, 2018 04:00:00')
    bedTime = new Date('May 11, 2018 23:00:00')
  })

  describe('Starting time', () => {

    it('is valid on or after 5pm', () => {
      expect(timeUtils.isStartTimeValid(startTime)).to.be.true
    })
    
    it('is invalid before 5pm', () => {
      startTime.setHours(16);
      expect(timeUtils.isStartTimeValid(startTime)).to.be.false
    })
  })
    
  describe('Ending time', () => {
      
      it('is valid if on or before 4am Or on or after 5pm', () => {
        expect(timeUtils.isEndTimeValid(endTime)).to.be.true
      })
      
      it('is invalid if after 4:00am And before 5:00pm', () => {
        endTime.setHours(5)
        expect(timeUtils.isEndTimeValid(endTime)).to.be.false
      })
  })

  describe('Bedtime', () => {
      
    it('is valid if after start time And on or before Midnight', () => {
      expect(timeUtils.isBedTimeValid(startTime, bedTime)).to.be.true
    })

    it('is valid for midnight', () => {
      bedTime.setHours(0)
      expect(timeUtils.isBedTimeValid(startTime, bedTime)).to.be.true
    })
    
    it('is invalid if before start time', () => {
      bedTime.setHours(16)
      expect(timeUtils.isBedTimeValid(startTime,bedTime)).to.be.false
    })
  })
})