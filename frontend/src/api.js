class api {
    constructor() {
        this.apiUrl = "https://ez3hrmban8.execute-api.us-east-1.amazonaws.com/dev/todos";
    }

    /**
     * Gets all todos in the database
     * Returns a list of todo objects
     */
    getTodos = () => {
        return fetch(this.apiUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            }
        }).then((response) => {
            return response.json().then(data => {
                return {
                    success: true,
                    data: data,
                }
            })

        }).catch((error) => {
            return {
                success: false,
                data: null,
            };
        });
    };

    /**
     *  Adds a todo to the database
     *  returns a success boolean and the new object's id
     */ 

    addTodo = (todo) => {
        return fetch(this.apiUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(todo),
        
        }).then((response) => {
            return response.json().then(data => {
                return {
                    success: true,
                    id: data.id,
                }
            })

        }).catch((error) => {
            return {
                success: false,
                data: null,
            };
        });
    }

    /**
     *  Adds a todo to the database
     *  returns a success boolean and the new object's id
     */ 
    removeTodo = (id) => {
        return fetch(this.apiUrl + "/" + id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },        
        }).then((response) => {
            return response.json().then(data => {
                return {
                    success: true,
                }
            })

        }).catch((error) => {
            return {
                success: false,
            };
        });
    }

} 

const API = new api();
export default API;