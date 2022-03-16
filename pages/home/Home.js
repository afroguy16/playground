import Counter from "../../components/counter/Counter.js";
import Button from "../../components/button/Button.js";
import Rates from "../../components/rates/Rates.js";

class Home extends HTMLElement {
    homeTemplate = document.createElement('template');
    count = 0;
    appButton;
    appCounter;

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.homeTemplate.content.cloneNode(true));
        this.appButton = this.shadowRoot.querySelector('app-button');
        this.appCounter = this.shadowRoot.querySelector('app-counter');
        this.setHandlers();
    }

    setTemplate() {
        this.homeTemplate.innerHTML = `
            <!-- <div class="home-wrapper">
                <p>Hello Home</p>
                <app-counter count="${this.count}"></app-counter>
                <app-button text="click me"></app-button>
            </div> -->

            <div class="home-wrapper">
                <app-rates></app-rates>
            </div>
        `
    }

    setHandlers() {
        this.handleIncrementCount();
    }

    handleIncrementCount() {
    }
}

window.customElements.define('app-home', Home);

export default Home;
