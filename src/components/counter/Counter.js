class Counter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
    }

    setTemplate() {
        const counterTemplate = document.createElement('template');
        counterTemplate.innerHTML = `
            <div class="counter-wrapper" id="counter-wrapper">
                <p id="counter">${this.count}</p>
            </div>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(counterTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['count'];
    }

    get count() {
        return this.getAttribute('count');
    }

    attributeChangedCallback() {
        if(this.shadowRoot) this.shadowRoot.getElementById('counter').innerHTML = this.count;
    }
}

window.customElements.define('app-counter', Counter);

export default Counter;
