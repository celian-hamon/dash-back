
import * as express from 'express';
import {ControllerInterface} from "../controller.interface";
import {csgoPartner} from "../../partners/csgo.partner";
class UserController implements ControllerInterface {
    public path = '/users';
    public router = express.Router();

    private posts: Array<Object> = [
        {
            author: 'Marcin',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }

    getAllPosts = (request: express.Request, response: express.Response) => {
        let partner = new csgoPartner();
        partner.get('', '').then(r => response.send(this.posts));
    }

    createAPost = (request: express.Request, response: express.Response) => {
        const post: Object = request.body;
        this.posts.push(post);
        response.send(post);
    }
}

export default UserController;