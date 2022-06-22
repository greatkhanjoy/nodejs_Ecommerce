const Cart = require('../Models/Cart')
const User = require('../Models/User')

const getAllCarts = async (req, res) => {
  const carts = await Cart.find({})
  res.status(200).json(carts)
}

const cart = async (req, res) => {
  const { id } = req.user
  const carts = await Cart.find({ user: id })
  res.status(200).json(carts)
}

const addToCart = async (req, res) => {
  const { product, price, quantity } = req.body
  const { id: user } = req.user

  if (!product) {
    return res.status(400).json('Invalid data or not logged in ')
  }

  const cart = await Cart.findOne({ user: user })

  if (!cart) {
    if (quantity == 0) {
      return res.status(200).json({ msg: 'Cart Updated', cart })
    }
    const items = { user, product, price, quantity }
    const cartData = new Cart({ user, items })
    await cartData.save()
    return res.status(201).json({ msg: 'Added', cartData })
  }
  const productExist = await Cart.find(
    { user: user },
    {
      items: {
        $elemMatch: { product: product },
      },
    }
  )
  if (productExist[0].items.length) {
    if (quantity == 0) {
      const indexOfObject = cart.items.findIndex((object) => {
        return object.product == product
      })
      cart.items.splice(indexOfObject, 1)
      await cart.save()
      return res.status(200).json({ msg: 'Cart Updated', cart })
    }
    cart.items.map((item) => {
      if (item.product == product) {
        item.quantity = quantity
        item.price = price ? price : item.price
      }
    })
    await cart.save()
    return res.status(200).json({ msg: 'Cart Updated', cart })
  } else {
    if (quantity == 0) {
      return res.status(200).json({ msg: 'Cart Updated', cart })
    }
    cart.items.push({ product, price, quantity })
    await cart.save()
    return res.status(200).json({ msg: 'Cart Updated', cart })
  }
}

module.exports = { getAllCarts, addToCart, cart }
