import { GetLastRemindersCalendar } from "../../domain/use-cases/sync-calendars/get_reminders-calendar";
import { BlackboardCalendarDataSource } from "../../infraestructure/datasources/blackboard-calendar.datasource";
import { GoogleCalendarDataSource } from "../../infraestructure/datasources/google-calendar.datasource";
import { DayJsProvider } from "../../infraestructure/libs/dateProvider/dayJsProvider";
import { convert } from "../../infraestructure/libs/icsToJson/converter";
import { SyncReminderRepositoryImpl } from "../../infraestructure/repositories/sync_reminder-calendar.repository.impl";
import { PostRemindersCalendar } from "../../domain/use-cases/sync-calendars/create_reminders-calendar";
import { PostMultipleRemindersDb } from "../../domain/use-cases/reminder-calendar/create_multiple__reminders-calendar";
import { ReminderCalendarRepositoryImpl } from "../../infraestructure/repositories/reminder-calendar.repository.impl";
import { ReminderCalendarDatasourceFirestore } from "../../infraestructure/datasources/firebase_reminder-calendar.datasource";
import { GetAllRemindersDb } from "../../domain/use-cases/reminder-calendar/get_reminder-calendar";

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
        // Injecting datasources and repositories
        const originDatasource = new BlackboardCalendarDataSource(this.options.iscUrl, DayJsProvider, convert);
        const destinationDatasource = new GoogleCalendarDataSource();
        const firestoreDatasource = new ReminderCalendarDatasourceFirestore();

        const repository = new SyncReminderRepositoryImpl(originDatasource, destinationDatasource);
        const firestoreRepository = new ReminderCalendarRepositoryImpl(firestoreDatasource);
        // Use cases
        const getUseCase = new GetLastRemindersCalendar(repository);
        const fireStoreUseCase = new GetAllRemindersDb(firestoreRepository);
        const postFirestoreUsecase = new PostMultipleRemindersDb(firestoreRepository);
        const postUsecase = new PostRemindersCalendar(repository);
        // Execution
        const [newOrExistingReminders, existingRemindersResults] = await Promise.all([
            getUseCase.execute(),
            fireStoreUseCase.execute()
        ]);
        const newRemindersFiltered = await postFirestoreUsecase.execute(newOrExistingReminders, existingRemindersResults);
        const results = await postUsecase.execute(newRemindersFiltered);
        console.log("Fetched reminders synced:", results);
        return 0;
    }
}