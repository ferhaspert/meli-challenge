import axios from 'axios';

export function getCategoryById(id) {
    return axios.get(`/api/categories/${id}`)
}