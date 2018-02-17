import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Web3 from 'web3';
import { firebase, auth } from '../../../utils/firebase';
import Store from '../../../store';
import UpcomingEvents from '../dashboards/upcoming.jsx';

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
      <section className="container-fluid">
        <div className="row">
          <div className="col-sm-12" id="main-header">
            <div className="main-navs-box">
              <div className="inline-navs">
                <Link to="/join/tournament">Join Game</Link>
              </div>
              <div className="inline-navs">
                <Link to="/create/tournament">Create Game</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12" id="separator">
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4">
              <UpcomingEvents/>
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
    validUser: store.signIn
  }
};

export default connect(mapStateToProps)(MainPage)