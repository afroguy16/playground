class Counter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(): void {
        this.setTemplate();
    }

    setTemplate(): void {
        const counterTemplate = document.createElement('template');
        counterTemplate.innerHTML = `
            <div class="counter-wrapper" id="counter-wrapper">
                <p id="counter">${this.count}</p>
            </div>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(counterTemplate.content.cloneNode(true));
    }

    static get observedAttributes(): string[] {
        return ['count'];
    }

    get count(): string {
        return this.getAttribute('count');
    }

    attributeChangedCallback(): void {
        if(this.shadowRoot) this.shadowRoot.getElementById('counter').innerHTML = this.count;
    }
}

window.customElements.define('app-counter', Counter);

export default Counter;
