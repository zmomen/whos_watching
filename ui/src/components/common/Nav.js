import React from "react";
import "./Nav.css";

const Nav = ({ data }) => {
  return (
    <header className={"header navbar"}>
      <section className={"navbar-section"}>
        <a href="/" className={"navbar-brand mr-2"}>
          <h4>
            <span role="img" aria-label="">
              Who's Watching!
            </span>
          </h4>
        </a>
      </section>
      <section className={"navbar-section"}></section>
    </header>
  );
};

export default Nav;
