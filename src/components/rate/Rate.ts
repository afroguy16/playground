
import { CSSStyleSheetExtended, ShadowRootExtended } from '../../types/browser-apis';
import RateStyle from './Rate.scss';

class Rate extends HTMLElement {
    shadowRoot: ShadowRootExtended;

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.setTemplate();
        this.setStyles();
    }

    setTemplate(): void {
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

    setStyles(): void {
        const sheet: CSSStyleSheetExtended = new CSSStyleSheet();
        sheet.replace(RateStyle);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    get name(): string {
        return this.getAttribute('name');
    }

    get unit(): string {
        return this.getAttribute('unit');
    }

    get value(): string {
        return this.getAttribute('value');
    }

    get type(): string {
        return this.getAttribute('type');
    }
}

window.customElements.define('app-rate', Rate);

export default Rate;
