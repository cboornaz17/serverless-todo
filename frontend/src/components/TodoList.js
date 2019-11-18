import React from 'react';
import API from '../api';

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    
    componentDidMount = () => {
        API.getTodos().then((response) => {
            if (response.success) {

            } else {

            }
        });
    }


    render () {
        return (
            <div>TodoList</div>
        )
    }
}


export default TodoList;