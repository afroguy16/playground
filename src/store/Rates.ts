import RatesService from "../services/Rates";
import { Rates as RatesType } from "../types/rates";

class Rates {
    state: RatesType;

    stateChange = new Event('ratesUpdated');

    _dispatchStateChange(): void {
        document.dispatchEvent(this.stateChange);
    }

    async fetchRates(): Promise<RatesType> {
        try {
            const fetchedRates = await RatesService.fetchRates();
            return fetchedRates;
        } catch (err) {
            throw new Error(err);
        }
    }

    updateRates(payload: RatesType): void {
        this.state = {
            ...this.state,
            ...payload
        }
        this._dispatchStateChange();
    }
}

const RatesStore = new Rates();

export default RatesStore;
