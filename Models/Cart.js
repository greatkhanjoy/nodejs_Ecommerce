const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema(
  {
    total_price: {
      type: Number,
    },
    item_count: {
      type: Number,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    items_subtotal_price: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

CartSchema.pre('save', async function (next) {
  let products = this.items

  this.total_price = await products.reduce((accumulator, object) => {
    return accumulator + object.price * object.quantity
  }, 0)

  this.item_count = await products.reduce((accumulator, object) => {
    return accumulator + object.quantity
  }, 0)
})

module.exports = mongoose.model('Cart', CartSchema)
