import axios from 'axios';
export function login(credentials) {
    let baseUrl = "http://127.0.0.1:8000/"
    return axios.post(baseUrl + "login/",
        credentials
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}