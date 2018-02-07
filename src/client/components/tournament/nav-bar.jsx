import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div id="nav">
        <div className="col-xs-6 text-center nav-items">
          <header className="nav-headers">
            <Link to="/join/tournament">Join A Tournament</Link>
          </header>
        </div>
        <div className="col-xs-6 text-center nav-items">
          <header className="nav-headers">
            <Link to="/create/tournament">Create A New Tournament</Link>
          </header>
        </div>
      </div>
    )
  }
}

export default NavBar