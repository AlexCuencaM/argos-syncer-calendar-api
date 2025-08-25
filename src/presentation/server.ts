import express, { Router } from 'express';
interface options{
    routes: Router;
    port: number;
}
export class Server{
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    constructor({routes, port}: options){
        this.port = port;
        this.routes = routes;
    }
    async start(){
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: false }) ); // x-www-form-urlencoded
        this.app.use( this.routes );
        this.app.listen(this.port, () => {
          console.log(`Server running on port ${ this.port }...`);
        });
    }
}

