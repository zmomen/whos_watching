import React from "react";
import "spectre.css";
import Footer from "./components/layout/Footer";
import Banner from "./components/layout/Banner";
import { SideMenu } from "./components/menu/SideMenu";
import { UserPreferences } from "./components/main/UserPreferences";
import Store from "./utils/Store";

const App = () => {
  return (
    <Store>
      <div className={"container grid-lg"}>
        <Banner />
        <div className="d-flex mt-2">
          <SideMenu />
          <UserPreferences />
        </div>
        <Footer />
      </div>
    </Store>
  );
};

export default App;
