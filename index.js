function nextDay(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 1);
}

function nextWeek(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 7);
}

function nextFortnight(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 14);
}

function nextNMonths(months, currentDate, startDate, lastDate) {
    currentDate.setMonth(currentDate.getMonth() + months);
    currentDate.setDate(startDate.getDate());
    if(currentDate.getMonth() - lastDate.getMonth() > months){
        currentDate.setDate(0);
    }
}

function nextYear(currentDate, startDate, lastDate){
    currentDate.setFullYear(currentDate.getFullYear() + 1);
}

var nexts = {
    day: nextDay,
    week: nextWeek,
    fortnight: nextFortnight,
    month: nextNMonths.bind(null, 1),
    quarter: nextNMonths.bind(null, 3),
    halfYear: nextNMonths.bind(null, 6),
    year: nextYear
};

function generateDates(start, end, interval){

    var startDate = new Date(start);
    var endDate = new Date(end);

    if(!(interval in nexts)){
        throw new Error('interval ' + interval + ' not supported');
    }

    var results = [],
        currentDate = new Date(startDate),
        lastDate = new Date(startDate);

    while(currentDate < endDate){
        results.push(new Date(currentDate));

        nexts[interval](currentDate, startDate, lastDate);

        lastDate = new Date(currentDate);
    }

    return results;
}

module.exports = generateDates;

module.exports.frequencies = Object.keys.bind(null, nexts);