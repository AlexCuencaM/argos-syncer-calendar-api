import { ReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
import { context } from "../../data/firebase";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";

export class ReminderCalendarDatasourceFirestore implements ReminderCalendarDataSource{
    private readonly _context = context;
    async postAsync(reminder: CreateReminderDto): Promise<void> {
        const reminderRef = this._context.collection('reminders').doc();        
        await reminderRef.set({
            ...reminder,
            id: reminderRef.id,
        })
    }
    async getAllAsync(): Promise<Reminder[]> {
        const remindersSnapshot = await this._context.collection('reminders').get();
        return remindersSnapshot.docs.map(doc => ({
            ...doc.data() as Reminder,
        }) );
    }

}