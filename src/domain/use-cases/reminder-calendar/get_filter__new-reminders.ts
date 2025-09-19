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
        return [newOrExistingReminders, existingRemindersResults, filteredReminders];
    }
}