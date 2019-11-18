import React from 'react';
import API from '../api';

function Todo(props) {
    const { text, checked, handleRemove, ind } = props;

    return (
        <div>
            
            <span style={{
                marginRight: 15,
            }}>
                {text}
            </span>
            <button onClick={() => handleRemove(ind)} className={"btn btn-secondary"}>x</button>
        </div>
    );

}


export default Todo;