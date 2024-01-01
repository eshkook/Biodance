import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: '',
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
    },
});

export const { setFirstName } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;

