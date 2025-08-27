import { ReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
import { context } from "../../data/firebase";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";

export class ReminderCalendarDatasourceFirestore implements ReminderCalendarDataSource{
    private readonly _context = context;
    async postAsync(reminder: CreateReminderDto): Promise<CreateReminderDto> {
        const reminderRef = this._context.collection('reminders').doc();        
        await reminderRef.set({
            ...reminder,
            id: reminderRef.id,
        });
        return {
            ...reminder,
            id: reminderRef.id,
        } as unknown as CreateReminderDto;
    }
    async getAllAsync(): Promise<Reminder[]> {
        const remindersSnapshot = await this._context.collection('reminders').get();
        return remindersSnapshot.docs.map(doc => ({
            ...doc.data() as Reminder,
        }) );
    }

}