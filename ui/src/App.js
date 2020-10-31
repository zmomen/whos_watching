import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "spectre.css";
import "./components/Common.css";
import Banner from "./components/layout/Banner";
import Footer from "./components/layout/Footer";
import { UpdateRow } from "./components/main/UpdateRow";
import { UserPreferences } from "./components/main/UserPreferences";
import { SideMenu } from "./components/menu/SideMenu";
import { NowPlaying } from "./components/menu/NowPlaying";
import { getAllUsers, getNowPlaying } from "./utils/api";
import Store from "./utils/Store";

const App = () => {
  const DEFAULT_USER = 3;
  const [users, setUsers] = useState([]);
  const [nowPlaying, setNowPlaying] = useState({});
  useEffect(() => {
    getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.warn("error", err));

    getNowPlaying()
      .then(({ data }) => {
        setNowPlaying(data);
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
              <NowPlaying nowPlaying={nowPlaying} />
            </div>
            <Switch>
              <Route path="/" component={UserPreferences} exact />
              <Route path="/users/:id" component={UserPreferences} exact />
              <Route
                path={"/users/:id/preferences/:prefId"}
                component={UpdateRow}
                exact
              />
            </Switch>
          </div>
        </Router>
      </div>
      <Footer />
    </Store>
  );
};

export default App;
