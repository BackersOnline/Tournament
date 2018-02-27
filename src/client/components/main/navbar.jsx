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
  
  render() {
    return (
      <div class="container">
        <div class="row">
          <div className="col-sm-12" id="main-navbar">
            <ul>
              <li className="navs">
                <Link to="/create/tournament">Create Event</Link>
              </li>
              <li className="navs" onClick={this.handleJoinClick}>Join Event</li>
              <li className="navs" onClick={this.handleManageClick}>Manage Event</li>          
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar;