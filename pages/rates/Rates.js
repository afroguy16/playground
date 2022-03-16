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
        await this.updateGlobalRate();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];
        this.addEventListener('ratesUpdated', this.updateLocalRate());
    }

    setTemplate() {
        this.ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <header class="title">
                    <h1>Rates</h1>
                </header>
                <div class="rates-container">
                    <div class="rates" id="rates">
                        ${this.getRateTemplate(this.rates)}
                    </div>
                </div>
            </div>
        `
    }

    getRateTemplate(rates) {
        return rates
        ? Object.entries(this.rates).map(([, value]) => {
            return (`<app-rate name=${value.name} unit=${value.unit} value=${value.value} type=${value.type}></app-rate>`)
        }).join('')
        : '';
    }

    async updateGlobalRate() {
        RatesStore.updateRates(await RatesStore.fetchRates());
    }

    updateLocalRate() {
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
        if(this.shadowRoot) this.shadowRoot.getElementById('rates').innerHTML = this.getRateTemplate(this.rates);
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
