import RatesStore from "../../store/Rates.js";
import Rate from "../../components/rate/Rate.js";
import RateStyle from "./Rates.css" assert {type: 'css'};

class Rates extends HTMLElement {
    ratesTemplate = document.createElement('template');
    rates = {};

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.setRates();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];

        this.addEventListener('ratesUpdated', this.setRates());
    }

    setTemplate() {
        const rateTemplates = this.rates
            ? Object.entries(this.rates).map(([, value]) => {
                return (`<app-rate name=${value.name} unit=${value.unit} value=${value.value} type=${value.type}></app-rate>`)
            }).join('')
            : '';

        this.ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <header class="title">
                    <h1>Rates</h1>
                </header>
                <div class="rates-container">
                    <div class="rates">
                        ${rateTemplates}
                    </div>
                </div>
            </div>
        `
    }

    async setRates() {
        await RatesStore.setRates();
        console.log(RatesStore.state)
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
