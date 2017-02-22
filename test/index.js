var test = require('tape'),
    generdate = require('../');

var start = new Date('2016-1-31z'),
    end = new Date('2017-9-22z'),// 600 days later
    bigEnd = new Date('10000-1-1z'); // many days later

function testCorrectCountPerYear(t, countPerYear, dates) {
    dates = dates.slice();

    var startYear = dates.shift().getFullYear(),
        endYear = dates.pop().getFullYear();

    while(dates.length && dates[0].getFullYear() === startYear) {
        dates.shift();
    }

    while(dates.length && dates[dates.length - 1].getFullYear() === endYear) {
        dates.pop();
    }

    var counts = dates.reduce(function(result, date) {
        var year = date.getFullYear();

        if (!result[year]) {
            result[year] = 0;
        }

        result[year]++;

        return result;
    }, {});

    var isNotValid = Object.keys(counts).some(function(key) {
        return counts[key] !== countPerYear;
    });

    t._plan++;
    t.ok(!isNotValid, 'correct number of dates per year');
}

test('days', function(t){
    t.plan(1);

    var results = generdate(start, end, 'day');


    t.equal(results.length, 600);
});

test('weeks', function(t){
    t.plan(1);

    var results = generdate(start, end, 'week');


    t.equal(results.length, 86);
});

test('fortnights', function(t){
    t.plan(1);

    var results = generdate(start, end, 'fortnight');


    t.equal(results.length, 43);
});

test('months', function(t){
    t.plan(21);

    var results = generdate(start, end, 'month');

    results.forEach(function(date){
        t.ok(date.getDate() >= 27);
    });

    t.equal(results.length, 20);
});

test('quarter', function(t){
    t.plan(8);

    var results = generdate(start, end, 'quarter');

    results.forEach(function(date){
        t.ok(date.getDate() >= 27);
    });

    t.equal(results.length, 7);
});

test('halfYear', function(t){
    t.plan(5);

    var results = generdate(start, end, 'halfYear');

    results.forEach(function(date){
        t.ok(date.getDate() >= 27);
    });

    t.equal(results.length, 4);
});

test('years', function(t){
    t.plan(1);

    var results = generdate(start, end, 'year');

    t.equal(results.length, 2);
});

test('get frequencies', function(t){
    t.plan(2);

    var results = generdate.frequencies();

    t.ok(Array.isArray(results));
    t.ok(results.length > 4);
});

test('correct date count for month', function(t) {
    t.plan(0);

    var dates = generdate(start, bigEnd, 'month');

    testCorrectCountPerYear(t, 12, dates);
});

test('correct date count for quarter', function(t) {
    t.plan(0);

    var dates = generdate(start, bigEnd, 'quarter');

    testCorrectCountPerYear(t, 4, dates);
});

test('correct date count for halfYear', function(t) {
    t.plan(0);

    var dates = generdate(start, bigEnd, 'halfYear');

    testCorrectCountPerYear(t, 2, dates);
});

test('correct date count for year', function(t) {
    t.plan(0);

    var dates = generdate(start, bigEnd, 'year');

    testCorrectCountPerYear(t, 1, dates);
});