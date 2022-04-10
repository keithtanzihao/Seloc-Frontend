import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/ui/navbar/Navbar";
import Menu from "./components/ui/menu/Menu";
import Login from "./components/layout/Login";
import Techniques from "./components/layout/Techniques";
import TechniqueAdd from "./components/layout/technique/TechniqueAdd";
import TechniqueDisplay from "./components/ui/modal/TechniqueDisplay";

import Register from "./components/layout/Register";

import "./styles/main.module.scss";


export default class App extends React.Component {
  state = {
    isMenuOpen: false,
    isLoggedIn: false,
    userEmail: ""
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

  renderContentTest = () => {
    if (this.state.isMenuOpen) {
      return <Menu setIsMenuOpen={this.setIsMenuOpen}/>;
    }
    return;
  };

  render() {
    return (
      <React.Fragment>
        {/* Common components here */}

        <Navbar isMenuOpen={this.state.isMenuOpen} setIsMenuOpen={this.setIsMenuOpen} />
        {this.renderContentTest()}

        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>


          <Route path="/technique/:id"><TechniqueDisplay /></Route>

          <Route path="/techniques/add-technique"><TechniqueAdd /></Route>
          <Route path="/techniques/edit-technique"><TechniqueAdd /></Route>

          <Route path="/techniques"><Techniques /></Route>
          
        </Switch>
      
      </React.Fragment>
    );
  }
}




/**
 * Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis itaque dolore ut dicta sit vel enim? Soluta expedita sunt repellendus atque officia commodi aut eius, ab fuga sequi a. Consectetur.
 * 
 * https://media.istockphoto.com/photos/singapore-skyline-at-marina-bay-at-twilight-with-glowing-sunset-the-picture-id1176969551?b=1&k=20&m=1176969551&s=170667a&w=0&h=JvC68A7XNAH-C4CiPFHHNWQM4GeAN9E1me-vcyF_MWg=
 * 
 * 
 * 
 * 
 * 
 * 
 * KIV must add error message if theres neither 1 insturction/benefit for techniqueAddInstructBen
 * 
 * Remove br from techniqueDisplay later at difficulty:
 */