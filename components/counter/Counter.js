class Counter extends HTMLElement {
    counterTemplate = document.createElement('template');

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.counterTemplate.content.cloneNode(true));
    }

    setTemplate() {
        this.counterTemplate.innerHTML = `
            <div class="counter-wrapper" id="counter-wrapper">
                <p id="counter">${this.count}</p>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['count'];
    }

    get count() {
        return this.getAttribute('count');
    }

    attributeChangedCallback() {
        this.shadowRoot.getElementById('counter').innerHTML = this.count;
    }
}

window.customElements.define('app-counter', Counter);

export default Counter;
