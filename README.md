# kata-babysitter
JS implementation of the Babysitter Kata

## Background
This kata simulates a babysitter working and getting paid for one night.

The babysitter rules:

- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)

## Feature
*As a babysitter<br>
In order to get paid for 1 night of work<br>
I want to calculate my nightly charge<br>*

### Usage
Install npm packages `npm install`. Then run `npm test` to run tests.

To run the application you must have `node` installed.

Sample command:

`node app --startTime 'May 11, 2018 18:00:00' --endTime 'May 12, 2018 03:00:00'  --bedTime 'May 11, 2018 22:00:00'`

Change the time and/or date to test different outcomes.