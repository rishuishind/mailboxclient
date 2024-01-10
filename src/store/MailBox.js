import { createSlice } from "@reduxjs/toolkit";


const initialMailState = { allEmails: [], unreadMessage: 0, myMails: [], sentMails: [] };

const mailBoxSlice = createSlice({
    name: 'mail_box',
    initialState: initialMailState,
    reducers: {
        loadMails: (state, action) => {
            state.allEmails = action.payload;
        },
        myEmails: (state, action) => {
            state.myMails = state.allEmails.filter((mail) => mail.recieverEmail === action.payload
            )
            const unreadMsg = state.myMails.filter((mail) => mail.isRead === false);
            if (unreadMsg) {
                state.unreadMessage = unreadMsg.length;
            }
        },
        deleteMail: (state, action) => {
            state.myMails = state.myMails.filter((mail) => mail.id !== action.payload.id);
        },
        sentEmails: (state, action) => {
            state.sentMails = state.allEmails.filter((mail) => {
                return mail.senderEmail === action.payload
            })
            console.log('sent mail length ', state.sentMails);
        }
    }
});

export const mailActions = mailBoxSlice.actions;
export default mailBoxSlice;