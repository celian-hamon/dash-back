import * as express from 'express';
import {ControllerInterface} from "../controller.interface";
import {leaguePartner} from "../../partners/league.partner";
import {SummonerLeague} from "../../entities/league/summoner.league";
import {MatchLeague} from "../../entities/league/match.league";

export default class LeagueController implements ControllerInterface {
    public path = '/league';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path + "/:name", this.getSummonerByName);
        this.router.get(this.path + "/:name/league", this.getSummonerLeague);
        this.router.get(this.path + "/:name/matches", this.getLastMatches);
        this.router.get(this.path + "/:name/tier", this.getRankedTier);
    }

    getSummonerByName = (request: express.Request, response: express.Response) => {
        let partner = new leaguePartner();
        partner.getSummonerByName(request.params.name, 'euw').then(r => response.send(r));
    }

    getSummonerLeague = (request: express.Request, response: express.Response) => {
        let partner = new leaguePartner();
        partner.getSummonerByName(request.params.name, 'euw').then((summoner: SummonerLeague) => {
            partner.get('/league/v4/entries/by-summoner/' + summoner.id, 'euw').then(r => response.send(r));
        });
    }

    getLastMatches = (request: express.Request, response: express.Response) => {
        let partner = new leaguePartner();
        partner.getSummonerByName(request.params.name, 'euw').then((summoner: SummonerLeague) => {
            console.log(summoner)
            partner.get('/match/v5/matches/by-puuid/' + summoner.puuid + '/ids', 'euwM', {
                start: "0",
                count: "20"
            }).then((r: string[]) => {
                let matches: MatchLeague[] = [];
                r.forEach((matchId: string) => {
                    partner.get('/match/v5/matches/' + matchId, 'euwM').then((match: MatchLeague) => {
                        matches.push(match);
                        if (matches.length === r.length) {
                            response.send(matches);
                        }
                    });
                });
            });
        });
    }

    getRankedTier = (request: express.Request, response: express.Response) => {
        let partner = new leaguePartner();
        partner.getSummonerByName(request.params.name, 'euw').then((summoner: SummonerLeague) => {
            partner.get('/league/v4/entries/by-summoner/' + summoner.id, 'euw').then(r => response.send(r));
        });
    }
}