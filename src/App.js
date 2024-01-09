import { Fragment, useEffect } from "react";
import { HomePage, ComposeMail, MyEmails, MailHome, Inbox } from './pages/index';
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(authActions.setToken(token));
    }
  }, [])

  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mailbox" element={<MailHome />} />
          <Route path='/mailbox/compose' element={<ComposeMail />} />
          <Route path="/mailbox/my-emails" element={<MyEmails />} />
          <Route path="/mailbox/my-emails/:id" element={<Inbox />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
