import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        city: '',
        dates: [],
        options: {
            adult: 0,
            children: 0,
            room: 0
        }
    }
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        newSearch: (search, action) => {
            search.value = action.payload
        },

        resetSearch: (search, action) => {
            search.value = initialState
        }
    }
})


export const {
    newSearch,
    resetSearch,

} = searchSlice.actions

export default searchSlice.reducer
