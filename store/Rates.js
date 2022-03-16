import RatesService from "../services/Rates.js";
class Rates {
    state = {}

    stateChange = new Event('ratesUpdated');

    async setRates() {
        console.log('called')
        const fetchedRates = await RatesService.fetchRates();
        console.log(fetchedRates)
        this.state = {
            ...this.state,
            ...fetchedRates
        }
        this.dispatchStateChange();
    }

    dispatchStateChange() {
        document.dispatchEvent(this.stateChange);
    }
}

const RatesStore = new Rates();

export default RatesStore;
