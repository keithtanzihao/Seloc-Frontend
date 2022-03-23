import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/ui/navbar/Navbar";
import Menu from "./components/ui/menu/Menu";
import Frontpage from "./components/layout/Frontpage";
import Login from "./components/layout/LoginSignup";

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

  renderContent = (page) => {
    if (this.state.isMenuOpen) {
      return <Menu />;
    } else {
      return page;
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* Common components here */}
        <Navbar setIsMenuOpen={this.setIsMenuOpen} />

        <Route path="/main">{this.renderContent(<Frontpage />)}</Route>
        <Route path="/login">{this.renderContent(<Login />)}</Route>
        
      </React.Fragment>
    );
  }
}
