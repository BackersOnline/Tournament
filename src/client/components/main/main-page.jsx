import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Web3 from 'web3';
import { firebase, auth } from '../../../utils/firebase';
import Store from '../../../store';
import UpcomingEvents from '../dashboards/upcoming.jsx';
import PendingEvents from '../dashboards/pending.jsx';
import PreviousEvents from '../dashboards/previous.jsx';
import MainHeader from './header.jsx';
import NavBox from './nav-box.jsx';
import NavBar from './navbar.jsx';
import JoinTournament from '../tournament/join.jsx';
import Joined from '../tournament/joined.jsx';

class MainPage extends Component {
  constructor(props) {
    super(props)

    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider);
      console.log('Detected web3 from external source.');
    } else {
      throw new Error('Error: No web3 detected. Please install an external source such as Metamask.');
    }

    this.createContract = web3.eth.contract(this.props.contract.createABI);
    this.tournamentContract = web3.eth.contract(this.props.contract.tournyABI);

    this.createInstance = this.createContract.at(this.props.contract.createAddress);
    this.tournamentInstance = this.tournamentContract.at(this.props.contract.tournyAddress);
  }

  componentWillMount() {
    if (auth.currentUser !== null) {
      fetch('/get/user/' + auth.currentUser.displayName)
        .then(res => res.json())
        .then(data => {
          Store.dispatch({ type: 'RECEIVED_USER_INFO', payload: data });
      })
      .catch(err => {
        throw new Error(err);
      });
    }
  }

  render() {
    if (!this.props.validUser.user) {
      return <Redirect to="/login"/>
    } 
    return (
      <section id="main-header">
        <MainHeader/>
        <div id="main-navbar">
          <NavBar/>
        </div>
        <div id="main-display">
          <div className="container">
            <div className="col-sm-12" id="main-display-box">
              <div className="col-sm-6">
                <div className="dashboard-container">
                  <UpcomingEvents/>
                </div>
                <div className="dashboard-container">
                  <PendingEvents/>
                </div>
                <div className="dashboard-container">
                  <PreviousEvents/>
                </div>
              </div>
              <NavBox>
                {(() => {
                  switch (this.props.nav.view) {
                    case 'NULL':
                      return
                    case 'CREATE':
                      return
                    case 'JOIN':
                      return <JoinTournament/>;
                    case 'HAS_JOINED':
                      return <Joined/>;
                    case 'MANAGE':
                      return
                    default:
                      return
                  }
                })()}
              </NavBox>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {
    contract: store.contract,
    validUser: store.signIn,
    nav: store.nav
  };
};

export default connect(mapStateToProps)(MainPage);