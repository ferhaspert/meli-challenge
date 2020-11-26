import axios from 'axios';

export function searchWithText(text) {
    return axios.get(`/api/items?search=${text}`)
}

export function getItemById(id) {
    return axios.get(`/api/items/${id}`)
}