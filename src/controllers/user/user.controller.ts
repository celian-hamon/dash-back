import * as express from 'express';
import {ControllerInterface} from "../controller.interface";
import {csgoPartner} from "../../partners/csgo.partner";
class UserController implements ControllerInterface {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
    }

    getAllPosts = (request: express.Request, response: express.Response) => {
        let partner = new csgoPartner();
        partner.get('').then(r => response.send(r));
    }

}

export default UserController;