import RatesStore from "../../store/Rates.js";

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
                <p>Hello Rates</p>
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
