import { createAsyncThunk } from "@reduxjs/toolkit";

const firebaseUrl = "https://task-tracker-15-http-default-rtdb.firebaseio.com";

/**
 * React Toolkit automatically generates and dispatches actions
 *  1) initially and 
 *  2)when the Promise resolves (which is returned from any async function in JS).

The names of these actions are generated from the first argument 
 and can be inspected in the Redux DevTools 
 (for example cart/fetchData/pending, cart/fetchData/fulfilled and cart/fetchData/rejected).
 */

export const fetchCartData = createAsyncThunk(
  "cart/fetchData", //str identifier wch will b used for automatcly generated actions
  async () => {
    const response = await fetch(`${firebaseUrl}/cart.json`);

    if (!response.ok) {
      throw new Error("Could not fetch cart data!");
    }

    const data = await response.json();
    return {
      items: data?.items || [],
      totalQuantity: data?.totalQuantity || 0,
    };
  }
);

export const sendCartData = createAsyncThunk("cart/sendData", async (cart) => {
  const config = {
    method: "PUT",
    body: JSON.stringify({
      items: cart.items,
      totalQuantity: cart.totalQuantity,
    }),
  };

  const response = await fetch(`${firebaseUrl}/cart.json`, config);
  if (!response.ok) {
    throw new Error("Sending cart data failed!");
  }
});
