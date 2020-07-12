import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "spectre.css";
import Banner from "./components/layout/Banner";
import Footer from "./components/layout/Footer";
import { UpdateRow } from "./components/main/UpdateRow";
import { UserPreferences } from "./components/main/UserPreferences";
import Store from "./utils/Store";

const App = () => {
  return (
    <Store>
      <div className={"container grid-lg"}>
        <Banner />
        <Router>
          <Switch>
            <Route path="/" component={UserPreferences} exact />
            <Route path="/users/:id" component={UserPreferences} exact />
            <Route
              path={"/users/:id/preferences/:prefId"}
              component={UpdateRow}
              exact
            />
          </Switch>
        </Router>
      </div>
      <Footer />
    </Store>
  );
};

export default App;
