import React from 'react';
import API from '../api';
import Todo  from '../components/Todo';


class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],

            inputText: "",
            errorText: "Loading todos",
        }
    }
    
    componentDidMount = () => {
        API.getTodos().then((response) => {
            if (response.success) {
                this.setState({
                    todos: response.data,
                });
            } else {
                // Failed to load todos
                this.setState({
                    errorText: "Failed to load todos"
                });
            }
        });

        /*
       // set demo todos to test styles 
       this.setState({
            todos: [{
                    checked: false,
                    text: "first todo"
                }, {
                    checked: false,
                    text: "second todo"
                }
            ]
       });   
       */
    }

    // Maintain input field state
    handleInputChange = (event) => {
        this.setState({
            inputText: event.target.value
        })
    }

    // Toggle showing input box
    toggleInput = () => {
        this.setState({
            renderInput: true,
        });
    }

    // Remove a todo from our list
    handleRemove = (ind) => {
        const revert = [...this.state.todos];
        const afterRemove = this.state.todos;
        afterRemove.splice(ind, 1);
        this.setState({
            todos: afterRemove
        });

        API.removeTodo(revert[ind].id).then((response) => {
            if (response.success) {
                console.log("Removed todo " + revert[ind].id);
            }
            else {
                this.setState({
                    todos: revert
                });
            }
        })
    }

    // Add a new todo
    handleSubmitNew = () => {
        const newTodo= {
            text: this.state.inputText
        };

        this.setState({
            inputText: "",
        });

        // Lazy add todo (assume success)
        const revert = this.state.todos;
        this.setState({
            todos: this.state.todos.concat(newTodo)
        });

        // Add todo to database
        API.addTodo(newTodo).then((response) => {
            if (response.success) {
                console.log("Added todo: " + response.id)
                this.state.todos[this.state.todos.length - 1].id = response.id
            } 
            else {
                // Remove todo if add fails
                this.setState({
                    todos: revert
                });
            }
        });
    }

    // Renders the todo objects
    renderTodos = () => {
        var ret =
        this.state.todos.map((todo, index) => {
            return (<li>
                <Todo 
                    key={"todo"+index}
                    ind={index}
                    text={todo.text}
                    checked={todo.checked}
                    handleRemove={this.handleRemove.bind(this)}
                />
            </li> );
        });

        if (ret.length !== 0) {
            return <ul>{ret}</ul>
        }

        return <div>Loading</div>
    }

    renderInput = () => {
        return (
            <div>
                <input 
                    value={this.state.inputText} 
                    onChange={this.handleInputChange}
                />
                <button 
                    className={"btn btn-secondary"}
                    onClick={this.handleSubmitNew}
                >
                    submit
                </button>
            </div>
        );
    }

    render () {
        return (
            <div>TodoList
                {this.renderTodos()}
                {!this.state.renderInput &&
                    <button className={"btn btn-secondary"} onClick={this.toggleInput.bind(this)}>add</button>
                }
                {this.state.renderInput && 
                    this.renderInput()
                }
            </div>
        )
    }
}


export default TodoList;