import App from './app';
import UserController from './controllers/user/user.controller';
import dotenv from 'dotenv';

dotenv.config();

const app = new App(
    [
        new UserController(),
    ],
    parseInt(process.env.PORT as string, 10)
);

app.listen();