import { GetRemindersCalendar } from "../../domain/use-cases/sync-calendars/get_reminders-calendar";
import { BlackboardCalendarDataSource } from "../../infraestructure/datasources/blackboard-calendar.datasource";
import { GoogleCalendarDataSource } from "../../infraestructure/datasources/google-calendar.datasource";
import { DayJsProvider } from "../../infraestructure/libs/dateProvider/dayJsProvider";
import { convert } from "../../infraestructure/libs/icsToJson/converter";
import { SyncReminderRepositoryImpl } from "../../infraestructure/repositories/sync_reminder-calendar.repository.impl";
import { PostReminderCalendar } from "../../domain/use-cases/sync-calendars/create_reminders-calendar";

interface options{
    iscUrl: string;
}
export class ConsoleServer{
    constructor(private options: options){}
    async start(){
        console.log("Console server started with options:", this.options);
        // Here you can add logic to periodically fetch and process the ICS file
        // For demonstration, we'll just log the URL
        console.log("Fetching ICS from:", this.options.iscUrl);
        const originDatasource = new BlackboardCalendarDataSource(this.options.iscUrl, DayJsProvider, convert);
        const destinationDatasource = new GoogleCalendarDataSource();
        const repository = new SyncReminderRepositoryImpl(originDatasource, destinationDatasource);
        const getUseCase = new GetRemindersCalendar(repository);
        // const postUsecase = new PostReminderCalendar(repository);
        const reminders = await getUseCase.execute();
        console.log("Fetched reminders:", reminders);

        // const results = await postUsecase.execute(reminders);

    }
}