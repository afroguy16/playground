import RatesStore from "../../store/Rates";
import Rate from "../../components/rate/Rate";
import RateStyle from "./Rates.css" assert {type: 'css'};

const ERROR_TEMPLATE = '<p class="message-error">Something went wrong</p>' //Hard coded error message, not good for production application

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
        document.addEventListener('ratesUpdated', this.updateLocalRates.bind(this));
        await this.updateGlobalRate();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.ratesTemplate.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];
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
                            : this.state.error ? ERROR_TEMPLATE
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
        try {
            RatesStore.updateRates(await RatesStore.fetchRates());
        } catch (err) {
            this.state.error = true;
            console.log({err}, this.state.error)
            this.updateLocalRates();
        }
    }

    updateLocalRates() {
        this.state.rates = {
            ...this.state.rates,
            ...RatesStore.state
        }
        if (this.state.error || this.state.rates) this.state.loading = false;
        if (this.state.error) {
            return ERROR_TEMPLATE;
        } else {
            if(this.shadowRoot) this.shadowRoot.getElementById('rates').innerHTML = this.getRateTemplate(this.state.rates);
        }
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
