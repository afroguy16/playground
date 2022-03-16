import RatesStore from "../../store/Rates.js";
import Rate from "../rate/Rate.js";
import RateStyle from "./Rates.css" assert {type: 'css'};

class Rates extends HTMLElement {
    ratesTemplate = document.createElement('template');
    rates;

    constructor() {
        super();
    }

    connectedCallback() {
        this.setRates();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];

        this.addEventListener('stateChanged', this.onUpdateRates());
    }

    setTemplate() {
        const rateTemplates = this.rates
            ? Object.entries(this.rates).map(([, value]) => {
                return (`<app-rate name=${value.name} unit=${value.unit} value=${value.value} type=${value.name}></app-rate>`)
            }).join('')
            : '';

        this.ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <header class="title">
                    <h1>Rates</h1>
                </header>
                <div class="rates">
                    ${rateTemplates}
                </div>
            </div>
        `
    }

    setRates() {
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
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
