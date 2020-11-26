import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const SEARCH_AMOUNT = process.env.SEARCH_AMOUNT;

const transform = (response) => {
    const filters = response.data.filters.filter(c => c.id === "category");
    const categories = filters[0].values.map(c => (c.name))

    const items = response.data.results.splice(0,SEARCH_AMOUNT).map(({ id, title, price, currency_id, thumbnail, condition, shipping, address, category_id }) => ({
        id,
        title,
        price: {
          currency_id,
          amount: price,
        },
        picture: thumbnail,
        condition: condition,
        free_shipping: shipping?.free_shipping,
        state_name: address?.state_name,
        category_id,
    }))

    return {
            author: {
            name: "Fernando",
            lastname: "Haspert"
        },
        categories,
        items,

    }
}

// TODO: errores en la api

export default async function handle(req, res) {
    const response = await axios.get(`${BASE_URL}sites/MLA/search`, {
        params: {
            q: req.query.search
        }
    })
    res.status(200).json(transform(response))
}