var test = require('tape'),
    generdate = require('../');

var start = new Date('2016-1-31z'),
    end = new Date('2017-9-22z'); // 600 days later

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

test('years', function(t){
    t.plan(1);

    var results = generdate(start, end, 'year');

    t.equal(results.length, 2);
});