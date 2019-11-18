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

    // Loads all todos when this component mounts
    componentDidMount = () => {
        API.getTodos().then((response) => {
            if (response.success) {
                this.setState({
                    errorText: "",
                    todos: response.data,
                });
            } else {
                // Failed to load todos
                this.setState({
                    errorText: "Failed to load todos"
                });
            }
        });
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

    // Checks if a todo has been added before we try to 
    // perform an operation on it
    checkAdded = (ind) => {
        if (!this.state.todos[ind].id) {
            this.setState({
                errorText: "todo still loading"
            })
            return false;
        }
        return true;
    }

    // Remove a todo from our list
    handleRemove = (ind) => {
        if (!this.checkAdded(ind)) { return; }

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
            renderInput: false,
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
                this.setState({errorText: ""});
                this.setState(prevState => ({
                    todos: prevState.todos.map((item, index) => 
                        index === this.state.todos.length - 1 ? 
                        { ...item, id: response.id } : item
                    )
                  }));
            } 
            else {
                // Remove todo if add fails
                this.setState({
                    todos: revert
                });
            }
        });
    }

    // Check a given todo
    handleCheck = (ind) => {
        if (!this.checkAdded(ind)) { return; }

        const id = this.state.todos[ind].id;
        let newObj = Object.assign({}, this.state.todos[ind]);
        newObj.checked = !newObj.checked;

        // Lazy check todo (assume success)
        this.setState(prevState => ({
            todos: prevState.todos.map(
              item => item.id === id? { ...item, checked: !item.checked }: item
            )
          }));

        API.updateTodo(id, newObj).then((response) => {
            if (response.success) {
                console.log(id + " updated");
            }
            else {
                // Revert if necessary
                this.setState(prevState => ({
                    todos: prevState.todos.map(
                      item => item.id === id? { ...item, checked: !item.checked }: item
                    )
                  }));
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
                    handleCheck={this.handleCheck.bind(this)}
                />
            </li> );
        });

        if (ret.length !== 0) {
            return <ul>{ret}</ul>
        }
    }

    renderInput = () => {
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <input style={{
                    marginRight: 5,
                }}
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
            <div style={{
                marginTop: 3,
            }}>
                {this.renderTodos()}
                <div>{this.state.errorText}</div>

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