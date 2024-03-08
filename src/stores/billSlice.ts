import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  //initial value for state
  initialState: {
    billItems: <any>[],
    totalPrice: 0,
  },
  reducers: {
    addToBill: (state, action) => {
      console.log(action.payload);
      // compare new value to existing array if have same ID
      const existingItem = state.billItems.find(
        (item: any) =>
          item.ProductID === action.payload.ProductID &&
          item.staffName === action.payload.staffName &&
          action.payload.CategoryID !== -1
      );
      // if ID the same
      if (existingItem) {
        // add extra quantity
        existingItem.quantity += 1;
        // recalculate the price with add quantity
        existingItem.quantityPrice = existingItem.Price * existingItem.quantity;
        console.log(existingItem.quantityPrice);
      } else {
        // if not then just add to the object
        state.billItems.push({
          ...action.payload,
          quantity: 1,
          quantityPrice: action.payload.Price,
        });
        console.log(state.billItems);
      }
      // calculate total price
      state.totalPrice = state.totalPrice + action.payload.Price;
      console.log(state.totalPrice);
    },
    clearBill: (state) => {
      state.billItems = [];
      state.totalPrice = 0;
    },
    clearItem: (state, action) => {
      // find item in the array
      const existingItem = state.billItems.find(
        (item: any) => item.ProductID === action.payload.ProductID
      );
      // if item in the array and quantity > 1
      if (existingItem && existingItem.quantity > 1) {
        // then reduce item quantity by 1
        existingItem.quantity -= 1;
        // recalculate Price
        existingItem.quantityPrice = existingItem.Price * existingItem.quantity;
      } else {
        // if item smaller than 1 mean the last item
        // find index of the item
        const index = state.billItems.findIndex(
          (item: any) => item.ProductID === action.payload.ProductID
        );
        // remove item with that index
        state.billItems.splice(index, 1);
      }
      state.totalPrice = state.totalPrice - action.payload.Price;
    },
  },
});

export const { addToBill, clearBill, clearItem } = basketSlice.actions;
export default basketSlice.reducer;
