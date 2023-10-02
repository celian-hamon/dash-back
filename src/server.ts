import App from './app';
import UserController from './controllers/user/user.controller';
import LeagueController from "./controllers/league/league.controller";
import dotenv from 'dotenv';

dotenv.config();

const app = new App(
    [
        new UserController(),
        new LeagueController(),
    ],
    parseInt(process.env.PORT as string, 10)
);

app.listen();