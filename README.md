# Generdate

Generate dates at an interval between start and end dates.

## Usage

generdate(startDate, endDate, interval)

Supported intervals: 'day', 'week', 'fortnight', 'month', 'year'
Send a PR or log an issue if you want more.

```
var generdate = require('../');

var start = new Date('2016-1-31z'),
    end = new Date('2017-9-22z'); // 600 days later

var results = generdate(start, end, 'day');

results.length; -> 600

```

Generdate should handle boundaries pretty ok, for example,
repeating once per month with the start date set to the 31st will
result in whatever the given dates max date is, inc 28th feb on leap years.