class Rates {
    state = {
        ngn: 254
    }

    stateChange = new Event('stateChange');

    updateRates(key, value) {
        this.state = {
            ...this.state,
            [key]: value
        }
        this.dispatchStateChange();
    }

    dispatchStateChange() {
        document.dispatchEvent(this.stateChange);
    }
}

const RatesStore = new Rates();

export default RatesStore;
