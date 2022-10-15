import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "spectre.css";
import "./components/Common.css";
import Banner from "./components/layout/Banner";
import Footer from "./components/layout/Footer";
import { NowPlayingPage } from "./components/main/NowPlayingPage";
import { UpdateRow } from "./components/main/UpdateRow";
import { UserPreferences } from "./components/main/UserPreferences";
import { NowPlayingMenu } from "./components/menu/NowPlayingMenu";
import { SideMenu } from "./components/menu/SideMenu";
import { getAllUsers } from "./utils/api";
import Store from "./utils/Store";

const App = () => {
  const DEFAULT_USER = 3;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.warn("error", err));
  }, []);
  return (
    <Store>
      <div className={"container grid-lg black"}>
        <Banner />
        <Router>
          <div className="d-flex">
            <div>
              <SideMenu users={users} currentUser={DEFAULT_USER} />
              <br />
              <NowPlayingMenu />
            </div>
            <Routes>
              <Route path="/" element={<UserPreferences/>} exact />
              <Route path="/users/:id" element={<UserPreferences/>} exact />
              <Route
                path={"/users/:id/preferences/:prefId"}
                element={UpdateRow}
                exact
              />
              <Route path="/now-playing" element={NowPlayingPage} exact />
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </Store>
  );
};

export default App;
