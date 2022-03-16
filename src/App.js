import React from 'react';

import Header from './components/layout/Header';
import Menu from './components/ui/menu/Menu';

import './styles/main.module.scss';

export default class App extends React.Component {

  state = {
    isMenuOpen: false,
  }

  setIsMenuOpen = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }

  renderContent = () => {
    if (this.state.isMenuOpen) {
      return <Menu />
    } else {
      // return <Menu />
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* Need to substitude this for react context */}
        <Header setIsMenuOpen={this.setIsMenuOpen}/>
        {this.renderContent()}
      </React.Fragment>
    )
  }
}

