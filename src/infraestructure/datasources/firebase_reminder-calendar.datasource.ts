import { IReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
import { context } from "../../data/firebase";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";

export class ReminderCalendarDatasourceFirestore implements IReminderCalendarDataSource{
    async deleteMultipleRemindersAsync(reminderIds: CreateReminderDto[]): Promise<string> {
        if(reminderIds.length === 0) return "No reminders to delete";
        const batch = this._context.batch();
        reminderIds.forEach((reminder) => {
            const reminderRef = this._context.collection('reminders').doc(reminder.id!);
            batch.delete(reminderRef);
        });
        await batch.commit();
        return "Deleted successfully";
    }
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
    async postMultipleRemindersAsync(newReminder: Reminder[]): Promise<Reminder[]> {
        const batch = this._context.batch();
        newReminder.forEach((reminder) => {
            const reminderRef = this._context.collection('reminders').doc();        
            batch.set(reminderRef, reminder);
        });
        await batch.commit();
        return Promise.resolve(newReminder); // Placeholder, implement actual return logic
    }
}