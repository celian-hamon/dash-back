import {Partner} from "./partner.interface";
let https = require('https');
export class csgoPartner implements Partner {
    public apiPath = 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1';
    async get(body: Object, query: string): Promise<void> {
        const response = await fetch(
            this.apiPath+'?key='+process.env["STEAM-API-KEY"] as string,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-webapi-key': process.env["STEAM-API-KEY"] as string
                }
            }
        );
        const data = await response.json();
    }

}