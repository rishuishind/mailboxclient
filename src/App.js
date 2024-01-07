import { Fragment } from "react";
import Authentication from "./components/Authentication";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Fragment>
      <Toaster />
      <Navbar />
      <Authentication />
    </Fragment>
  );
}

export default App;
