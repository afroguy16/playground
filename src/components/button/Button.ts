import { CSSStyleSheetExtended, ShadowRootExtended } from '../../types/browser-apis';
import ButtonStyle from './Button.scss';

class Button extends  HTMLElement {
    shadowRoot: ShadowRootExtended;
    
    constructor() {
        super();
    }

    connectedCallback(): void {
        this.setTemplate();
        this.setStyles();
    }

    setStyles() {
        const sheet: CSSStyleSheetExtended = new CSSStyleSheet();
        sheet.replace(ButtonStyle);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    setTemplate() {
        const buttonElement = document.createElement('template');
        buttonElement.innerHTML = `<button class="button">${this.getAttribute('text')}</button>`
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(buttonElement.content.cloneNode(true));
    }
}

window.customElements.define('app-button', Button);

export default Button;
