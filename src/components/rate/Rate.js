
import RateStyle from './Rate.scss';

class Rate extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.setStyles();
    }

    setTemplate() {
        const rateElement = document.createElement('template');
        rateElement.innerHTML = `
            <div class="rate-wrapper">
                <h3>${this.name}</h3>
                <p>${this.unit}</p>
                <p>${this.value}</p>
                <p class="label">${this.type}</p>
            </div>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(rateElement.content.cloneNode(true));
    }

    setStyles() {
        const sheet = new CSSStyleSheet();
        sheet.replace(RateStyle);
        this.shadowRoot.adoptedStyleSheets = [sheet];
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
