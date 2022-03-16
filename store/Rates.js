import RatesService from "../services/Rates.js";
class Rates {
    state = {}

    stateChange = new Event('ratesUpdated');

    async fetchRates() {
        const fetchedRates = await RatesService.fetchRates();
        return fetchedRates;
    }

    updateRates(payload) {
        this.state = {
            ...this.state,
            ...payload
        }
        this.dispatchStateChange();
    }

    dispatchStateChange() {
        document.dispatchEvent(this.stateChange);
    }
}

const RatesStore = new Rates();

export default RatesStore;
