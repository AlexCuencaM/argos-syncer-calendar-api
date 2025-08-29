import { BlackboardCalendarDataSource } from "../../infraestructure/datasources/blackboard-calendar.datasource";
import { GoogleCalendarDataSource } from "../../infraestructure/datasources/google-calendar.datasource";
import { convert } from "../../infraestructure/icsToJson/converter";
import { SyncReminderRepositoryImpl } from "../../infraestructure/repositories/sync_reminder-calendar.repository.impl";

interface options{
    iscUrl: string;
}
export class ConsolerServer{
    constructor(private options: options){}
    async start(){
        console.log("Console server started with options:", this.options);
        // Here you can add logic to periodically fetch and process the ICS file
        // For demonstration, we'll just log the URL
        console.log("Fetching ICS from:", this.options.iscUrl);
        const originDatasource = new BlackboardCalendarDataSource(this.options.iscUrl, convert);
        const destinationDatasource = new GoogleCalendarDataSource();
        const repository = new SyncReminderRepositoryImpl(originDatasource, destinationDatasource);
        const reminders = await repository.getAllAsync();
        console.log("Fetched reminders:", reminders);
        // const result = await repository.postAsync(reminders);
        // console.log("Posted reminders result:", result);
    }
}