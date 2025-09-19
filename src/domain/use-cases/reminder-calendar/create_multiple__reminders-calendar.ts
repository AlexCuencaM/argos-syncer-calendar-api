import { Reminder } from "../../entities/reminder.entity";
import { IReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";
import { IFilterExitingReminderDbUsecase } from "./get_filter__new-reminders";

export interface IPostMultipleRemindersDbUsecase{
    execute(newOrExistingReminders:Reminder[], existingReminders: Reminder[]): Promise<Reminder[]>;
}

export class PostMultipleRemindersDb implements IPostMultipleRemindersDbUsecase{
    constructor(
        private readonly repository: IReminderCalendarRepository,
        private readonly filterUseCase: IFilterExitingReminderDbUsecase
    ){}
    async execute(): Promise<Reminder[]> {
        const [newOrExistingReminders, existingReminders, filteredReminders] = await this.filterUseCase.execute();
        console.log([newOrExistingReminders?.length, existingReminders?.length, filteredReminders?.length])
        return this.repository.postMultipleRemindersAsync(filteredReminders!);
    }
}