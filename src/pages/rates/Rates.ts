import RatesStore from "../../store/Rates";
import Rate from "../../components/rate/Rate";
import RateStyle from "./Rates.scss";
import { CSSStyleSheetExtended, ShadowRootExtended } from "../../types/browser-apis";
import { Rates as RatesType } from "../../types/rates";

const ERROR_TEMPLATE = '<p class="message-error">Something went wrong</p>' //Hard coded error message, not good for production application

class Rates extends HTMLElement {
    loading = true;
    error = false;
    rates: RatesType;

    shadowRoot: ShadowRootExtended;

    constructor() {
        super();
    }

    async connectedCallback(): Promise<void> {
        this.setListeners();
        await this.updateGlobalRate();
        this.setTemplate();
        this.setStyles();
    }

    setListeners(): void {
        document.addEventListener('ratesUpdated', this.updateLocalRates.bind(this));
    }

    setTemplate(): void {
        const ratesTemplate = document.createElement('template');
        ratesTemplate.innerHTML = `
            <div class="rates-wrapper">
                <header class="title">
                    <h1>Rates</h1>
                </header>
                <div class="rates-container">
                    <div class="rates" id="rates">
                        ${
                            this.loading ? this.getLoadingCards()
                            : this.error ? ERROR_TEMPLATE
                            : this.getRateTemplate(this.rates)
                        }
                    </div>
                </div>
            </div>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(ratesTemplate.content.cloneNode(true));
    }

    getRateTemplate(rates: RatesType): string {
        return rates
        ? Object.entries(this.rates).map(([, value]) => {
            return (`<app-rate name=${value.name} unit=${value.unit} value=${value.value} type=${value.type}></app-rate>`)
        }).join('')
        : '';
    }

    getLoadingCards(): string {
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

    setStyles(): void {
        const sheet: CSSStyleSheetExtended = new CSSStyleSheet();
        sheet.replace(RateStyle);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    async updateGlobalRate(): Promise<void> {
        try {
            RatesStore.updateRates(await RatesStore.fetchRates());
        } catch (err) {
            this.error = true;
            console.log({err}, this.error)
            this.updateLocalRates();
        }
    }

    updateLocalRates(): void | string { //not the best move to have two different return types
        this.rates = {
            ...this.rates,
            ...RatesStore.state
        }
        if (this.error || this.rates) this.loading = false;
        if (this.error) {
            return ERROR_TEMPLATE;
        } else {
            if(this.shadowRoot) this.shadowRoot.getElementById('rates').innerHTML = this.getRateTemplate(this.rates);
        }
    }
}

window.customElements.define('app-rates', Rates);

export default Rates;
