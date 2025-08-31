import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateProvider } from '../../datasources/blackboard-calendar.datasource';

// Extend dayjs with the plugin
dayjs.extend(customParseFormat);

export const DayJsProvider: DateProvider = {
    parseDate: (dateString: string, format: string) => {
        return dayjs(dateString, format).toDate();
    },
    addDays: function (date: string, days: number, format: string): Date {
        return dayjs(date, format).add(days, 'day').toDate();
    }
};