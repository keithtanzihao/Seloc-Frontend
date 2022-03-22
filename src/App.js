import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/ui/navbar/Navbar";
import Menu from "./components/ui/menu/Menu";
import Frontpage from "./components/layout/Frontpage";

import "./styles/main.module.scss";

export default class App extends React.Component {
  state = {
    isMenuOpen: false,
  };

  setIsMenuOpen = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  renderContent = () => {
    if (this.state.isMenuOpen) {
      return <Menu />;
    } else {
      return <Frontpage />;
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* Common components here */}
        <Navbar setIsMenuOpen={this.setIsMenuOpen} />

        <Route path="/main">
          {/* Need to substitude this for react context */}
          {this.renderContent()}
        </Route>

        <Route path="/login">
          <h1>LOGIN PAGE</h1>
        </Route>
        
      </React.Fragment>
    );
  }
}
