import RatesStore from "../../store/Rates.js";
import Rate from "../../components/rate/Rate.js";
import RateStyle from "./Rates.css" assert {type: 'css'};

class Rates extends HTMLElement {
    ratesTemplate = document.createElement('template');
    state = {
        loading: true,
        error: false,
        rates: { }
    };

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.updateGlobalRate();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];
        document.addEventListener('ratesUpdated', this.updateLocalRates());
    }

    setTemplate() {
        this.ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <header class="title">
                    <h1>Rates</h1>
                </header>
                <div class="rates-container">
                    <div class="rates" id="rates">
                        ${
                            this.state.loading ? this.getLoadingCards()
                            : this.state.error ? '<p class="message-error">Something went wrong</p>'
                            : this.getRateTemplate(this.state.rates)
                        }
                    </div>
                </div>
            </div>
        `
    }

    getRateTemplate(rates) {
        return rates
        ? Object.entries(this.state.rates).map(([, value]) => {
            return (`<app-rate name=${value.name} unit=${value.unit} value=${value.value} type=${value.type}></app-rate>`)
        }).join('')
        : '';
    }

    getLoadingCards() {
        //Hardcoded, this can be moved to its own component, then the width an height can adapt to its parent. This is a good opportunity to use container query :-)
        return (
            `
                <div class="loading-card"></div>
                <div class="loading-card"></div>
                <div class="loading-card"></div>
                <div class="loading-card"></div>
                <div class="loading-card"></div>
                <div class="loading-card"></div>
            `
        )
    }

    async updateGlobalRate() {
        RatesStore.updateRates(await RatesStore.fetchRates());
    }

    updateLocalRates() {
        this.state.rates = {
            ...this.state.rates,
            ...RatesStore.state
        }
        if (this.state.error || this.state.rates) this.state.loading = false;
        if (this.state.error) {
            return(
                `
                    <p>Something went wrong</p>
                `
            )
        } else {
            if(this.shadowRoot) this.shadowRoot.getElementById('rates').innerHTML = this.getRateTemplate(this.state.rates);
        }
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
