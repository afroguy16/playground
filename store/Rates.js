import RatesService from "../services/Rates.js";
class Rates {
    state = {}

    stateChange = new Event('ratesUpdated');

    _dispatchStateChange() {
        document.dispatchEvent(this.stateChange);
    }

    async fetchRates() {
        try {
            const fetchedRates = await RatesService.fetchRates();
            return fetchedRates;
        } catch (err) {
            throw err;
        }
    }

    updateRates(payload) {
        this.state = {
            ...this.state,
            ...payload
        }
        this._dispatchStateChange();
    }
}

const RatesStore = new Rates();

export default RatesStore;
