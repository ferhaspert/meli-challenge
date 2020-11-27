import axios from 'axios';

const BASE_URL = process.env.BASE_URL;
const DEFAULT_ERROR_MESSAGE = process.env.DEFAULT_ERROR_MESSAGE

const transform = ({detailResponse, descriptionResponse}) => {
    const {id, title, currency_id, price, pictures, condition, sold_quantity, shipping, category_id } = detailResponse.data;
    const { plain_text } = descriptionResponse.data;
    const picture = pictures[0].url;
    return {
      author: {
        name: "Fernando",
        lastname: "Haspert"
      },
      item: {
        id: id,
        title: title,
        price: {
          currency: currency_id,
          amount: price,
        },
        picture,
        condition: condition,
        free_shipping: shipping.free_shipping,
        sold_quantity: sold_quantity,
        description: plain_text,
        category_id: category_id,
      }
    }
}

export default async function handle(req, res) {
    const itemId = req.query.id
    await Promise.all([
      axios.get(`${BASE_URL}items/${itemId}`), 
      axios.get(`${BASE_URL}items/${itemId}` + "/description")
        ]).then(([detailResponse, descriptionResponse]) => {
            res.status(200).json(transform({detailResponse, descriptionResponse}))
        }).catch(err => {
            res.status(err.response.status).send(DEFAULT_ERROR_MESSAGE)
        })
}