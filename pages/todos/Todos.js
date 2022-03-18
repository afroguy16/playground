class Todos extends HTMLElement {
    todosElement = document.createElement('template');
    state = {
        todos: [
            { id: 'td1', title: 'Play some music', done: false },
            { id: 'td2', title: 'Read a book', done: false },
            { id: 'td3', title: 'Code some javascript', done: false }
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.setTemplate();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(this.todosElement.content.cloneNode(true));

        this.listTodos();
        this.addTodos({ title: 'Play game', done: false });
        this.deleteTodos('td22');
        this.updateTodos('td2', 's');
        this.searchTodos('Read a book');
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
        if (invalidPayload) {
            return false;
        }
        const updatedPayload = {
            id: `td${this.state.todos.length + 1}`,
            ...todo
        }
        this.state.todos.push(updatedPayload);
        return true;
    }

    deleteTodos(id) {
        const todoAvailable = this.state.todos.find(todo => todo.id === id); //An extra loop used for the purpose of sending feedback to the user, cost is linear so not so expensive :-)
        if (todoAvailable) {
            this.state.todos = this.state.todos.filter(todo => todo.id !== id);
            this.listTodos();
            return true;
        }
        console.log('bad request');
        return false;
    }

    updateTodos(id, todo) {
        if(!id || !todo) {
            return false;
        }
        const selectedTodoIndex = this.state.todos.findIndex((td) => td.todo === id);
        if(!!selectedTodoIndex) {
            this.state.todos[selectedTodoIndex] = todo;
            this.listTodos();
            return true;
        }
        return false;
    }

    searchTodos(query) {
        const queried = this.state.todos.filter(todo => todo.id === query || todo.title === query);
        console.log(queried);
        return queried;
    }

}

window.customElements.define('app-todos', Todos);

export default Todos;
