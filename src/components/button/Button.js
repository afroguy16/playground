import ButtonStyle from './Button.css' assert {type: 'css'};

class Button extends  HTMLElement {
    buttonElement = document.createElement('template');

    constructor() {
        super();
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.buttonElement.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [ButtonStyle];
    }

    setTemplate() {
        this.buttonElement.innerHTML = `<button class="button">${this.getAttribute('text')}</button>`
    }
}

window.customElements.define('app-button', Button);

export default Button;
