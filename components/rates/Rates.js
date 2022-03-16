import RatesStore from "../../store/Rates.js";
import Rate from "../rate/Rate.js";

class Rates extends HTMLElement {
    ratesTemplate = document.createElement('template');
    rates;

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));

        this.setRates();
        this.addEventListener('stateChanged', this.onUpdateRates());
    }

    setTemplate() {
        this.ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <h2>Hello Rates</h2>
                <app-rate name="Bitcoin" unit="BTC" value="1.0" type="crypto"></app-rate>
            </div>
        `
    }

    setRates() {
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
        this.onUpdateGlobalRates();
    }

    onUpdateGlobalRates() {
        RatesStore.updateRates('ngn', 200);
    }

    onUpdateRates() {
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
