import axios from 'axios';
let baseUrl = "http://127.0.0.1:8000/api/complaints/"
export function allComplaints() {
    return axios.get(baseUrl + ""
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}
export function openComplaints() {
    return axios.get(baseUrl + "openCases/"
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}
export function closedComplaints() {

    return axios.get(baseUrl + "closedCases/"
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}
export function topComplaints() {
    return axios.get(baseUrl + "topComplaints/"
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}
export function constituentsComplaints() {
    return axios.get(baseUrl + "fromDistrict/"
    )
        .then(res => res.data).catch(error => { throw new Error(error.response.data.message); })
}