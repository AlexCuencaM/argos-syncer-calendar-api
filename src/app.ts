import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/API/routes";
import { ApiServer } from "./presentation/API/api-server";
import { ConsolerServer } from "./presentation/Console/console-server";

(async ()=>{
    await main();
})();

async function main () {
    const apiServer = new ApiServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    await apiServer.start();
    const consoleServer = new ConsolerServer({
        iscUrl: envs.CALENDAR_ICS_URL,
    });
    await consoleServer.start();
}