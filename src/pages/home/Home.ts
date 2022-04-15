import Rates from "../rates/Rates";

class Home extends HTMLElement {
    count = 0;

    constructor() {
        super();
    }

    connectedCallback(): void {
        this.setTemplate();
    }

    setTemplate(): void {
        const homeTemplate = document.createElement('template');
        homeTemplate.innerHTML = `
            <div class="home-wrapper">
                <app-rates></app-rates>
            </div>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }
}

window.customElements.define('app-home', Home);

export default Home;
