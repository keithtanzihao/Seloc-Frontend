import React from "react";

import Navbar from "../ui/navbar/Navbar";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar setIsMenuOpen={this.props.setIsMenuOpen}/>
      </header>
    )
  }
}