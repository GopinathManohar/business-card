import { DateTime } from "luxon";
import moment, { Moment } from "moment";
import { YYYY_MM_DD_DATE_FORMAT } from "./common";


export const getYear = () => DateTime.now().year;

export const convertDateFromJSDate = (date: any, format = YYYY_MM_DD_DATE_FORMAT) => date && DateTime.fromJSDate(date).toFormat(format);

export const convertDateFromSQLDate = (date: any, format = YYYY_MM_DD_DATE_FORMAT) => date && DateTime.fromSQL(date).toFormat(format);

export const convertDateFromObject = (date: any, format = 'dd-MM-yyyy') => date && DateTime.fromISO(date).toFormat(format);

export const convertDateFromMillis = (date: any, format = 'dd-MM-yyyy') => date && DateTime.fromMillis(date).toFormat(format);

export const convertDateFromString = (date: any) => date && DateTime.fromISO(date).toJSDate();

export const getTimeFromObject = (date: any) => date && DateTime.fromISO(date).toObject();

export const getTimeToUnixInteger = (date: any) => date && DateTime.fromISO(date).toUnixInteger();

export const todayDate = () => DateTime.now().toJSDate();

export const oneWeekDate = (days: number) => DateTime.now().minus({ days: days }).toJSDate();

export const todayDateToString = () => DateTime.now().toISODate({ format: "extended" });

export const dateToString = (days: number) => DateTime.now().minus({ days: days }).toISODate({ format: 'extended' });

export const todayDateObject = () => DateTime.now().toFormat(YYYY_MM_DD_DATE_FORMAT);

export const leadingZero = (value: any) => (value < 10) ? `0${value}` : value;

export const getWeekDate = () => DateTime.now().plus({ days: -7 }).toFormat(YYYY_MM_DD_DATE_FORMAT);

export const monthsDate = (date: any, months = 3) => DateTime.fromJSDate(date).minus({ months: months }).toJSDate();

export const getCurrentTime = () => DateTime.now().toSQL({ includeOffset: false });

export const getZoneName = () => {
    const currentDate = DateTime.now();
    return currentDate?.zoneName
};

export const getCurrentTimeISO = (date: any) => DateTime.fromISO(date);

export const currentTime = DateTime.now()

export const convertDateIntoMillis: (date: any) => number = (date: any) => DateTime.fromJSDate(new Date(date)).toMillis();

export const convertTimeIntoMillis: (date: any) => number = (time: any) => DateTime.fromISO(time).toMillis();

export const convertMillisToDateMoment = (millis?: number | any) => moment(moment(millis).toDate());

export const yesterdayDate = (days: number) => moment().add(days, "day");

export const momentTodayDate = () => moment();

export const momentTodayWithStartTime = () => moment().hours(0).minutes(0).second(0);

export const momentTodayWithEndTime = () => moment().hours(23).minutes(59).second(59);

export const momentDayMonth = (days: number) => moment().add(days, "month");

export const convertDateAndTime = (date: Moment | null, hours: number, minutes: number, seconds: number) => moment(date).hours(hours).minutes(minutes).seconds(seconds)