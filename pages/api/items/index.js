import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const SEARCH_AMOUNT = process.env.SEARCH_AMOUNT;
const DEFAULT_ERROR_MESSAGE = process.env.DEFAULT_ERROR_MESSAGE
const FILTER_ID = "category"

const filterById = ({id}) => id === FILTER_ID

const transform = ({ data }) => {
    const filter = data.filters.find(filterById) || data.available_filters.find(filterById);
    const categories = filter ? filter.values.map(({name}) => (name)) : []

    const items = data.results.splice(0,SEARCH_AMOUNT).map(({ id, title, price, currency_id, thumbnail, condition, shipping, address, category_id }) => ({
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

export default async function handle(req, res) {
    await axios.get(`${BASE_URL}sites/MLA/search`, {
        params: {
            q: req.query.search
        }
    }).then(response => {
        res.status(200).json(transform(response))
    }).catch(err => {
        res.status(err.response.status).send(DEFAULT_ERROR_MESSAGE)
    })
}