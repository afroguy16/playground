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
        this.searchTodos('th');
    }

    setTemplate() {
        this.todosElement.innerHTML = `
            <header>
                <h1>To do List</h1>
            </header>
        `
    }

    listTodos() {
        return this.state.todos;
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
            return true;
        }
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

    containsQuery(query, toCompare) {
        if(query.length > toCompare.length || query.length > 20 || toCompare.length > 20) { //if words are too large, algo would take a hit. Even though it's linear, it would need to be optimize with some advance search algorigthm to support larger words. Which is not necessary for this usecase
            return false;
        }

        query = query.toLowerCase();
        toCompare = toCompare.toLowerCase();

        let matchCount = 0;
        let splitQuery = query.split('');
        let splitToCompare = toCompare.split('');

        let matchedIndexes = splitToCompare.map((char, index) => {
            if(char === splitQuery[0]) {
                matchCount+=1;
                return index;
            }
        });

        const startingIndex = matchedIndexes.find(index => index !== undefined);
        matchedIndexes = matchedIndexes.filter(index => index !== undefined);
        
        if(startingIndex < 0) {
            return false;
        }

        let globalTest = false;
        let i = 0;

        for(; matchCount > 0; matchCount--) {
            let tempSplitQuery = splitQuery.slice(1);
            let tempSplitToCompare = splitToCompare.slice(matchedIndexes[i]+1);

            const test = !tempSplitQuery.find((char, i) => char !== tempSplitToCompare[i]); // still linear even though, there is a nested loop, but the search doesn't start from the beginning, it starts from the previous stop
            if (test) {
                globalTest = true;
            }

            i++;
        }
        if(globalTest) {
            return true;
        }
        return false;
    }

    searchTodos(query) {
        // const queried = this.state.todos.filter(todo => todo.id.toLowerCase() === query.toLowerCase() || todo.title.toLowerCase() === query.toLowerCase());
        // console.log(queried);
        // return queried;
    }

}

window.customElements.define('app-todos', Todos);

export default Todos;
