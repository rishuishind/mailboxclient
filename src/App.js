import { Fragment } from "react";
import { HomePage, MailHome } from './pages/index';
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mailbox" element={<MailHome />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
