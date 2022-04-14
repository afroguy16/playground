import RatesService from "../services/Rates.js";
import { Rates as RatesType } from "../types/rates";

export interface RatesState {
    loading: boolean;
    error: boolean;
    rates: RatesType
}

class Rates {
    state = {}

    stateChange = new Event('ratesUpdated');

    _dispatchStateChange(): void {
        document.dispatchEvent(this.stateChange);
    }

    async fetchRates(): Promise<RatesState> {
        try {
            const fetchedRates = await RatesService.fetchRates();
            return fetchedRates;
        } catch (err) {
            throw new Error(err);
        }
    }

    updateRates(payload: RatesState): void {
        this.state = {
            ...this.state,
            ...payload
        }
        this._dispatchStateChange();
    }
}

const RatesStore = new Rates();

export default RatesStore;
