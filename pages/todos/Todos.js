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
            {id: 'td3', title: 'Code some javascript', done: false}
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.todosElement.content.cloneNode(true));

        this.listTodos();
        this.addTodos({title: 'Play game', done: false});
    }

    setTemplate() {
        this.todosElement.innerHTML = `
            <header>
                <h1>To do List</h1>
            </header>
        `
    }

    listTodos() {
        console.log(this.state.todos);
    }
    
    addTodos(todo) {
        const invalidPayload = !!todo.hasOwnProperty('id');
        if(invalidPayload) {
            throw new Error("Invalid payload");
        }
        const updatedPayload = {
            id: `td${this.state.todos.length+1}`,
            ...todo
        }
        this.state.todos.push(updatedPayload);
        return;
    }

    deleteTodos(id) {}

    updateTodos(id, todo) {}

    searchTodos(query) {}

}

window.customElements.define('app-todos', Todos);

export default Todos;
