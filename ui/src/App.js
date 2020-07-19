import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "spectre.css";
import "./components/Common.css";
import Banner from "./components/layout/Banner";
import Footer from "./components/layout/Footer";
import { UpdateRow } from "./components/main/UpdateRow";
import { UserPreferences } from "./components/main/UserPreferences";
import { SideMenu } from "./components/menu/SideMenu";
import Store from "./utils/Store";
import { getAllUsers } from "./utils/api";

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
            <SideMenu users={users} currentUser={DEFAULT_USER} />
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
