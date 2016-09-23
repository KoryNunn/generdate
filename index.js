function nextDay(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 1);
}

function nextWeek(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 7);
}

function nextFortnight(currentDate, startDate, lastDate){
    currentDate.setDate(currentDate.getDate() + 14);
}

function nextMonth(currentDate, startDate, lastDate){
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(startDate.getDate());
    if(currentDate.getMonth() - lastDate.getMonth() > 1){
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
    month: nextMonth,
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