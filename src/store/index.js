import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import mailBoxSlice from "./MailBox";

const store = configureStore({
    reducer: { auth: AuthSlice.reducer, mail: mailBoxSlice.reducer }
});

export default store;