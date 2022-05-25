export interface TimeObject {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isPassed: boolean;
}

export const getTimeBetweenDates = (dateTo: Date, dateFrom: Date) => {
    let timeObject: TimeObject = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        isPassed: false
    };
    const msBetweenDates = (new Date(dateTo.toString()).getTime()) - (new Date(dateFrom.toString()).getTime());
    let isPassed = msBetweenDates < 0;
    let seconds = Math.floor(msBetweenDates / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24)

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    timeObject.seconds = seconds;
    timeObject.minutes = minutes;
    timeObject.hours = hours;
    timeObject.days = days;
    timeObject.isPassed = isPassed;

    return timeObject;
}
