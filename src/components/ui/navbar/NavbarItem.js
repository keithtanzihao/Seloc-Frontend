import React from "react";

export default class NavbarItem extends React.Component {
  render() {
    return (
      <li>
        <span>{this.props.sectionTitle}</span>
      </li>
    );
  }
}
