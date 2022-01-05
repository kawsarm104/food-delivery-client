import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch(
    'https://still-peak-01540.herokuapp.com/orders'
  ).then((res) => res.json());
  console.log(response);
  return response;
});

export const deleteorders = createAsyncThunk(
  'orders/delete',
  async ({ _id }) => {
    await axios.delete(`https://still-peak-01540.herokuapp.com/orders/${_id}`);
    // dispatch(deleteOrder(_id));

    return { _id };
  }
);

export const cartSlice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: [],
    status: 'idle'
  },

  reducers: {
    deleteOrder: (state, { payload }) => {
      state.allOrders = state.allOrders.filter(
        (book) => book.id !== payload.id
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
        state.status = 'success';
      })
      .addCase(deleteorders.fulfilled, (state, action) => {
        let index = state.findIndex(({ _id }) => _id === action.payload._id);
        state.splice(index, 1);
      });

    builder.addCase(fetchOrders.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

export const { deleteOrder } = cartSlice.actions;

export default cartSlice.reducer;

// export const fetchDeleteOrders = (id) => {
//   return (dispatch) => {
//     fetch(`https://still-peak-01540.herokuapp.com/orders/${id}`, {
//       method: 'DELETE',
//       statusCode: 204,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         dispatch(orders.action.deleteOrders(id));
//       })
//       .catch((err) => {
//         console.error('error', err);
//         dispatch(
//             orders.actions.deleteOrders({ error: `Error, failed to delete` })
//         );
//       });
//   };
// };
