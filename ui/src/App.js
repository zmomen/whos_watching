import React from "react";
import "spectre.css";
import Footer from "./components/layout/Footer";
import BannerImage from "./components/layout/BannerImage";
import { SideMenu } from "./components/menu/SideMenu";
import { Main } from "./components/Main";
import Store from "./utils/Store";

const App = () => {
  return (
    <Store>
      <div className={"container grid-lg"}>
        <BannerImage width="550" height="350" />
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
