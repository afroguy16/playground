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

        this.searchTodos('ma');
    }

    setTemplate() {
        this.todosElement.innerHTML = `
            <header>i
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
    
    // find splitToCompare array to see if it contains the first word from splitQuery
    // Take note of the index array that matches
    // Loop through the remaining splitQuery starting from the index+1 of splitToCompare

    containsQuery(query, toCompare) {
        const splitQuery = query.split('');
        let splitToCompare = toCompare.split('');

        const startingIndex = splitToCompare.findIndex(char => char === splitQuery[0]);
        
        if(startingIndex < 0) {
            return false;
        }

        splitQuery.splice(0, 1);
        splitToCompare = splitToCompare.slice(startingIndex+1);

        return !splitQuery.find((char, i) => char !== splitToCompare[i]);
    }
}

window.customElements.define('app-todos', Todos);

export default Todos;
