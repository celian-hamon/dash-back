import express from 'express';
import * as bodyParser from 'body-parser';
import cors from "cors";
import helmet from "helmet";
import UserController from './controllers/user/user.controller';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: UserController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(cors());
    }

    private initializeControllers(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;