
import RateStyle from './Rate.css' assert {type: 'css'};

class Rate extends HTMLElement {
    rateElement = document.createElement('template');

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Rate loaded');
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.rateElement.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];
    }

    setTemplate() {
        this.rateElement.innerHTML = `
            <div class="rate-wrapper">
                <h3>Bitcoin</h3>
                <p>BTC</p>
                <p>1</p>
                <p>Crypto</p>
            </div>
        `;
    }

    get name() {
        return this.getAttribute('name');
    }

    get unit() {
        return this.getAttribute('unit');
    }

    get value() {
        return this.getAttribute('value');
    }

    get type() {
        return this.getAttribute('type');
    }
}

window.customElements.define('app-rate', Rate);

export default Rate;
