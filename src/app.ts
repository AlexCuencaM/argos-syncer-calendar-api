import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/API/routes";
import { ApiServer } from "./presentation/API/api-server";

(async ()=>{
    await main();
})();

async function main () {
    const server = new ApiServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    });
    await server.start();
}