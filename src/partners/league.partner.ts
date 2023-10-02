import {Partner} from "./partner.interface";

export class leaguePartner implements Partner {
    public apiPath = 'https://euw1.api.riotgames.com/lol';

    async get(query: string, param: string[][] | null = null): Promise<void> {
        if (param != null) {
            query += '?';
            param.forEach((p) => {
                query += p[0] + '=' + p[1] + '&';
            });
        }

        const response = await fetch(
            this.apiPath + query,
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

}