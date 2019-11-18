import React from 'react';

// Presentation component for a todo
function Todo(props) {
    const { text, checked, handleRemove, handleCheck, ind } = props;

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
        }}>
            
            <span style={{
                marginRight: 15,
                textDecoration: checked ? "line-through" : "",
            }}>
                {text}
            </span>

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
            }}>
                <button style={{ marginRight: 3, }} onClick={() => handleCheck(ind)} className={"btn btn-secondary"}>
                    {checked ? "mark as not done" : "mark as done"}
                </button>
                <button onClick={() => handleRemove(ind)} className={"btn btn-secondary"}>x</button>
            </div>
        </div>
    );

}


export default Todo;