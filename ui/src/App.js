import React from "react";
import "spectre.css";
import Footer from "./components/common/Footer";
import Nav from "./components/common/Nav";

const App = () => {
  return (
    <div className={"container grid-lg"}>
      <Nav />
      <Footer />
    </div>
  );
};

export default App;
