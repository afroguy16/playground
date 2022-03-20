import Todos from "../todos/Todos";
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
    }

    setTemplate() {
        this.homeTemplate.innerHTML = `
            <div class="home-wrapper">
                <app-todos></app-todos>
            </div>
        `
    }
}

window.customElements.define('app-home', Home);

export default Home;
