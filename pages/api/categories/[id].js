import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

export default async function handle(req, res) {
    const id = req.query.id
    const response = await axios.get(`${BASE_URL}categories/${id}`)
    res.status(200).json(response.data.name)
}