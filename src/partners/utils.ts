export default class utils {
    public static getParamsString(params: any | null): string {
        if (!params) return '';
        let paramsString = '?';
        for (let key in params) {
            paramsString += `${key}=${params[key].toString()}&`;
        }
        return paramsString;
    }
}