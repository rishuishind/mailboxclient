import { createSlice } from "@reduxjs/toolkit";


const initialMailState = { myMails: [] };

const mailBoxSlice = createSlice({
    name: 'mail_box',
    initialState: initialMailState,
    reducers: {
        loadMails: (state, action) => {
            state.myMails = action.payload;
        }
    }
});

export const mailAction = mailBoxSlice.actions;
export default mailBoxSlice;