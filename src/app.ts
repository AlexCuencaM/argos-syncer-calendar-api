import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/API/routes";
import { ApiServer } from "./presentation/API/api-server";
import { ConsoleServer } from "./presentation/Console/console-server";

(async ()=>{
    await main();
})();

async function main () {
    // const apiServer = new ApiServer({
    //     port: envs.PORT,
    //     routes: AppRoutes.routes,
    // });
    // apiServer.start();
    const consoleServer = new ConsoleServer({
        iscUrl: envs.CALENDAR_ICS_URL,
    });
    consoleServer.start();
}