
import RateStyle from './Rate.css';

class Rate extends HTMLElement {
    rateElement = document.createElement('template');

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.rateElement.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [RateStyle];
    }

    setTemplate() {
        this.rateElement.innerHTML = `
            <div class="rate-wrapper">
                <h3>${this.name}</h3>
                <p>${this.unit}</p>
                <p>${this.value}</p>
                <p class="label">${this.type}</p>
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
