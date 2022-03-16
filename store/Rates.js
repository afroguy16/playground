class Rates {
    state = {
        "btc": {
            "name": "Bitcoin",
            "unit": "BTC",
            "value": 1.0,
            "type": "crypto"
        },
        "eth": {
            "name": "Ether",
            "unit": "ETH",
            "value": 14.957,
            "type": "crypto"
        },
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
