import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "spectre.css";
import "./components/Common.css";
import Banner from "./components/layout/Banner";
import Footer from "./components/layout/Footer";
import { NowPlayingPage } from "./components/main/NowPlayingPage";
import { UpdateRow } from "./components/main/UpdateRow";
import { UserPreferences } from "./components/main/UserPreferences";
import { NowPlayingMenu } from "./components/menu/NowPlayingMenu";
import { SideMenu } from "./components/menu/SideMenu";
import Store from "./utils/Store";
import { getAllUsers } from "./utils/api";

const DEFAULT_USER = 3;

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        console.warn("error", err);
      });
  }, []);

  return (
    <Store>
      <Router>
        <div className="container grid-xl black">
          <Banner />
          <div className="d-flex">
            <div>
              <SideMenu users={users} currentUser={DEFAULT_USER} />
              <br />
              <NowPlayingMenu />
            </div>
            <Routes>
              <Route path="/" element={<UserPreferences />} />
              <Route path="/users/:id" element={<UserPreferences />} />
              <Route path="/users/:id/preferences/:prefId" element={<UpdateRow />} />
              <Route path="/now-playing" element={<NowPlayingPage />} />
            </Routes>
          </div>
          {error && (
            <div className="toast toast-error error-margin">
              {error}
            </div>
          )}
          <Footer />
        </div>
      </Router>
    </Store>
  );
};

export default App;
