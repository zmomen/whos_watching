import React from "react";
import "spectre.css";
import Footer from "./components/layout/Footer";
import Banner from "./components/layout/Banner";
import { SideMenu } from "./components/menu/SideMenu";
import { Main } from "./components/main/UserPreferences";
import Store from "./utils/Store";

const App = () => {
  return (
    <Store>
      <div className={"container grid-lg"}>
        <Banner />
        <div className="d-flex">
          <SideMenu />
          <Main />
        </div>
        <Footer />
      </div>
    </Store>
  );
};

export default App;
