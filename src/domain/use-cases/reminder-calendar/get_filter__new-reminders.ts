import { Reminder } from "../../entities/reminder.entity";
import { IGetAllRemindersCalendarUsecase } from "../sync-calendars/get_reminders-calendar";
import { IGetAllRemindersDbUsecase } from "./get_reminder-calendar";

export interface IFilterExitingReminderDbUsecase{
    execute(): Promise<Reminder[][]>;
}
export class FilterExitingReminderDbUsecase implements IFilterExitingReminderDbUsecase{
    constructor(
        private readonly getCalendarEvents: IGetAllRemindersCalendarUsecase,
        private readonly getExistingEvents: IGetAllRemindersDbUsecase
    ){}
    async execute(): Promise<Reminder[][]> {
        const [newOrExistingReminders, existingRemindersResults] = await Promise.all([
            this.getCalendarEvents.execute(),
            this.getExistingEvents.execute()
        ]);
        const filteredReminders = newOrExistingReminders.filter(ne =>
            !existingRemindersResults.some(e => e.title === ne.title)
        );
        const results = [newOrExistingReminders, existingRemindersResults, filteredReminders];
        console.log("Filtered reminders:", {
            newOrExistingRemindersCount: newOrExistingReminders.length,
            existingRemindersCount: existingRemindersResults.length,
            filteredRemindersCount: filteredReminders.length,
        });
        console.log("Filtered reminders details:", {
            newOrExistingReminders: results[0]?.length,
            existingRemindersResults: results[1]?.length,
            filteredReminders: results[2]?.length,
        });
        return results;
    }
}