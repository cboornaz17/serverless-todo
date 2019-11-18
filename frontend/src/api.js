class api {
    constructor() {
        this.apiUrl = "https://ez3hrmban8.execute-api.us-east-1.amazonaws.com/dev/todos";
    }

    getTodos = () => {
        return fetch(this.apiUrl, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            }
        }).then((response) => {
            console.log(response);
            return {
                success: true,
            };

        }).catch((error) => {
            return {
                success: false,
            };
        });
    }
} 

const API = new api();
export default API;