import {Partner} from "./partner.interface";
import utils from "./utils";

export class csgoPartner implements Partner {
    public apiPath = 'https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1';

    async get(query: string, param: any | null = null): Promise<void> {
        const response = await fetch(
            this.apiPath + utils.getParamsString(param),
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