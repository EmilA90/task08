import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  checkedItems: [],
  updateIndex: null,
};

const todosSlice = createSlice({

  name: 'todos',
  initialState,
  reducers: {

    addItem: (state, action) => {
      state.items.push(action.payload);
      state.checkedItems.push(false);

    },
    deleteItem: (state, action) => {
      state.items.splice(action.payload, 1);
      state.checkedItems.splice(action.payload, 1);
      
    },
    updateItem: (state, action) => {
      state.items[action.payload.index] = action.payload.value;
      state.updateIndex = null;
    },
    setUpdateIndex: (state, action) => {
      state.updateIndex = action.payload;
    },
    checkItem: (state, action) => {
      state.checkedItems[action.payload] = !state.checkedItems[action.payload];
    },
  },
});

export const { addItem, deleteItem, updateItem, setUpdateIndex, checkItem } = todosSlice.actions;
export default todosSlice.reducer;
