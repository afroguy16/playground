class Rates {
    async fetchRates() {
        const rates = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
        const ratesBody = await rates.json();
        return ratesBody.rates;
    }
}

const RatesService = new Rates();

export default RatesService;
