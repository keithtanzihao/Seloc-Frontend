import React from "react";

import NavbarMenu from "./NavbarMenu";
import NavbarBrand from "./NavbarBrand";
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component {
  
  renderSectionTitles() {
    let sectionTitles = [];
    let titlesList = [
      "Articles",
      "Meditation",
      "Sleep",
      "Stress",
      "Mindfulness",
    ];
    
    for (let title of titlesList) {
      let item = <NavbarItem key={title} sectionTitle={title}/>
      sectionTitles.push(item);
    }
    return sectionTitles;
  }

  render() {
    return (
      <nav>
        <NavbarMenu/>
        <NavbarBrand/>
        {this.renderSectionTitles()};
      </nav>
    );
  }
}
