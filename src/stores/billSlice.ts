import { createSlice } from '@reduxjs/toolkit'

const basketSlice = createSlice({
  name: 'basket',
  //initial value for state
  initialState: {
    billItems: <any>[],
    totalPrice: 0,
  },
  reducers: {
    addToBill: (state, action) => {
      // compare new value to existing array if have same ID
      const existingItem = state.billItems.find((item: any) => item.ProductID === action.payload.ProductID)
      // if ID the same
      if (existingItem) {
        // add extra quantity
        existingItem.quantity += 1
        // recalculate the price with add quantity
        existingItem.quantityPrice = existingItem.Price * existingItem.quantity
      } else {
        // if not then just add to the object
        state.billItems.push({ ...action.payload, quantity: 1, quantityPrice: action.payload.Price })
      }
      // calculate total price
      state.totalPrice = state.totalPrice + action.payload.Price
    },
  },
})

export const { addToBill } = basketSlice.actions
export default basketSlice.reducer
