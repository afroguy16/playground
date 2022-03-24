import ButtonStyle from './Button.scss';

class Button extends  HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.setStyles();
    }

    setStyles() {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(ButtonStyle);
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
