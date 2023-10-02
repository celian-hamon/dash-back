import {Partner} from "./partner.interface";

export class csgoPartner implements Partner {
    public apiPath = 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1';

    async get(query: string, param: string[][] | null = null): Promise<void> {
        if (param != null) {
            query += '?';
            param.forEach((p) => {
                query += p[0] + '=' + p[1] + '&';
            });
        }
        const response = await fetch(
            this.apiPath + '?key=' + process.env["STEAM_API_KEY"] as string,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-webapi-key': process.env["STEAM_API_KEY"] as string
                }
            }
        );
        return await response.json();
    }

}