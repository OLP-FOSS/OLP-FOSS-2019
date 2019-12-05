import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-faded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-content"
          aria-controls="nav-content"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="http://localhost:3000/">
          CỜ CARO - ALPHA TEAM | PHẦN MỀM NGUỒN MỞ ĐÀ NẴNG 2019
        </a>
      </nav>
    );
  }
}

export default Header;
