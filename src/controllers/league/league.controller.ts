import * as express from 'express';
import {ControllerInterface} from "../controller.interface";
import {leaguePartner} from "../../partners/league.partner";
import {SummonerLeague} from "../../entities/league/summoner.league";

export default class LeagueController implements ControllerInterface {
    public path = '/league';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path + "/:name", this.getSummoner);
    }

    getSummoner = (request: express.Request, response: express.Response) => {
        let partner = new leaguePartner();
        partner.get(
            '/summoner/v4/summoners/by-name/' + request.params.name,
        ).then(r => response.send(r as unknown as SummonerLeague));
    }

}