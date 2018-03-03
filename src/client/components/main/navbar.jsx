import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Store from '../../../store';

class NavBar extends Component {
  handleJoinClick() {
    Store.dispatch({ type: 'CHANGE_VIEW', payload: 'JOIN' });
  }

  handleManageClick() {
    Store.dispatch({ type: 'CHANGE_VIEW', payload: 'MANAGE' });
  }

  handleCreateClick() {
    Store.dispatch({ type: 'CHANGE_VIEW', payload: 'CREATE' });
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <ul id="nav-container">
              <li className="navs" onClick={this.handleCreateClick}>Create</li>
              <li className="navs" onClick={this.handleJoinClick}>Join</li>
              <li className="navs" onClick={this.handleManageClick}>Manage</li>
              <li className="navs">Search</li>          
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar;