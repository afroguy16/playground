import Counter from "../../components/counter/Counter";
import Button from "../../components/button/Button";

class HomeOld extends HTMLElement {
    count = 0;
    appButton: HTMLElement;
    appCounter: HTMLElement;

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.setTemplate();
        this.appButton = this.shadowRoot.querySelector('app-button');
        this.appCounter = this.shadowRoot.querySelector('app-counter');
        this.setHandlers();
    }

    setTemplate(): void {
        const homeTemplate = document.createElement('template');
        homeTemplate.innerHTML = `
            <div class="home-wrapper">
                <p>Hello Home</p>
                <app-counter count="${this.count}"></app-counter>
                <app-button text="click me"></app-button>
            </div>
        `
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }

    setHandlers(): void {
        this.handleIncrementCount();
    }

    handleIncrementCount(): void {
        this.appButton.addEventListener('click', () => {
            this.count+=1;
            this.appCounter.setAttribute('count', this.count.toString());
        })
    }
}

window.customElements.define('app-home-old', HomeOld);

export default HomeOld;
