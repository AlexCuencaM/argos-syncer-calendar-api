import { ReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
import { context } from "../../data/firebase";

export class ReminderCalendarDatasourceFirestore implements ReminderCalendarDataSource{
    private readonly _context = context;
    async getAllAsync(): Promise<Reminder[]> {
        const remindersSnapshot = await this._context.collection('reminders').get();
        return remindersSnapshot.docs.map(doc => ({
            ...doc.data() as Reminder,
        }) );
    }

}