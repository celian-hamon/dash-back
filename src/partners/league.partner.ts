import {Partner} from "./partner.interface";
import {SummonerLeague} from "../entities/league/summoner.league"
import utils from "./utils";
import Dict = NodeJS.Dict;

export class leaguePartner implements Partner {
    public apiPath = 'https://api.riotgames.com/lol';
    public apiPathMapping: { [key: string]: string } = {
        "euw": 'https://euw1.api.riotgames.com/lol',
        'euwM': 'https://europe.api.riotgames.com/lol',
    }

    async get(query: string, region: string, param: any | null = null): Promise<any> {
        const response = await fetch(
            this.apiPathMapping[region] + query + utils.getParamsString(param),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "X-Riot-Token": process.env["RIOT_API_KEY"] as string,
                },
            }
        );

        return await response.json();
    }

    async getSummonerByName(name: string, region: string): Promise<SummonerLeague> {
        return await this.get(
            '/summoner/v4/summoners/by-name/' + name,
            region
        ) as unknown as SummonerLeague;
    }
}