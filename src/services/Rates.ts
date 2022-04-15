import { Rates as RatesType } from "../types/rates"

class Rates {
    async fetchRates(): Promise<RatesType> {
        const ratesResponse = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
        const { rates } = await ratesResponse.json();
        return rates;
    }
}

const RatesService = new Rates();

export default RatesService;
