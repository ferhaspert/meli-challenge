import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const transform = ({ name }) => {
    return {
        author: {
            name: "Fernando",
            lastname: "Haspert"
        },
        name
    }
}

export default async function handle(req, res) {
    const id = req.query.id
    await axios.get(`${BASE_URL}categories/${id}`)
        .then(response => {
            res.status(200).json(transform(response.data))
        })
        .catch(err => {
            res.status(400).send("Category not found")
        })
}