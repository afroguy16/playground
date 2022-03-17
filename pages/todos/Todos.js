class Todos extends HTMLElement {
    // List books
    // Add book
    // Update todos
    // Delete book
    // Search book

    todosElement = document.createElement('template');
    state = {
        todos: [
            {id: 'td1', title: 'Play some music', done: false},
            {id: 'td2', title: 'Read a book', done: false},
            {id: 'td2', title: 'Code some javascript', done: false}
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.todosElement.content.cloneNode(true));
    }

    setTemplate() {
        this.todosElement.innerHTML = `
            <header>
                <h1>To do List</h1>
            </header>
        `
    }

    listTodos() {}
    
    addTodos(todo) {}

    deleteTodos(id) {}

    updateTodos(id, todo) {}

    searchTodos(query) {}

}

window.customElements.define('app-todos', Todos);

export default Todos;
