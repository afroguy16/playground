
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
    }

    setTemplate() {
        this.rateElement.innerHTML = `
            <div class="rate-wrapper">
                </p>${this.name}</p>
                </p>${this.unit}</p>
                </p>${this.value}</p>
                </p>${this.type}</p>
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
