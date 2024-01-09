import { createSlice } from "@reduxjs/toolkit";


const initialMailState = { myMails: [], unreadMessage: 0 };

const mailBoxSlice = createSlice({
    name: 'mail_box',
    initialState: initialMailState,
    reducers: {
        loadMails: (state, action) => {
            state.myMails = action.payload;
            const unreadMsg = state.myMails.filter((mail) => mail.isRead === false);
            if (unreadMsg) {
                state.unreadMessage = unreadMsg.length;
            }
        },
        loadUnread: (state, action) => {

        }
    }
});

export const mailActions = mailBoxSlice.actions;
export default mailBoxSlice;