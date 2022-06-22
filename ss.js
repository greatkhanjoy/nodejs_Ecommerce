const cart = [
  {
    user: 1,
    items: [
      { id: 123456, name: 'joy' },
      { id: 1234567, name: 'khan' },
    ],
  },
  {
    user: 2,
    items: [
      { id: 123456, name: 'joy' },
      { id: 1234567, name: 'khan' },
      { id: 12345678, name: 'imran' },
    ],
  },
]

let data = ''
const cartData = cart.find((item) => {
  if (item.user === 2) {
    return item
  }
})
// console.log(cartData)
const newData = cartData.items.map((st) => {
  if (st.id === 123456) {
    console.log('khan')
  }
})
