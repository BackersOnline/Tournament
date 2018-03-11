import React, { Component } from 'react';
import { connect } from 'react-redux';
import Store from '../../../store';

class ManageEvent extends Component {
  constructor(props) {
    super(props)

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 from external source.')
      this.web3 = new Web3(web3.currentProvider)
    } else {
      console.log('Error: No web3 detected. Please install an external source such as Metamask.')
    }

    this.createContract = web3.eth.contract(this.props.contract.createABI)
    this.tournamentContract = web3.eth.contract(this.props.contract.tournyABI)

    this.createInstance = this.createContract.at(this.props.contract.createAddress)
    this.tournamentInstance = this.tournamentContract.at(this.props.contract.tournyAddress)

    this.handleManageSubmit = this.handleManageSubmit.bind(this);
  }

  handleManageSubmit(e) {
    e.preventDefault();
    const address = this.refs.address.value;

    this.createInstance.checkAddress(address, {
      gas: 3000000
    }, (err, res) => {
      if (!err) {
        if (res === true) {
          this.checkOrganizer(this.props.validUser.userInfo[0].id, address)
            .then(event => {
              if (typeof event === 'undefined') {
                alert('ERROR: \n' + 'You do not seem to be the organizer for this event.');
              } else {
                Store.dispatch({type: 'UPDATE_TOURNY_ADDRESS', payload: address});
                Store.dispatch({ type: 'CHANGE_VIEW', payload: 'MANAGING' })
              }
            })         
        } else {
          alert('ERROR: \n' + 'Tournament address does not exist.');
        }
      } else {
        alert(err);
      }
    })
  }

  checkOrganizer(id, address) {
    return fetch('/check/organizer/' + id + '/event/' + address)
      .then(res => res.json())
      .then(event => {
        return event[0];
      });
  }

  render() {
    return (
      <section className="jumbo">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 text-center">
            <form className="form-text form-margin" onSubmit={this.handleManageSubmit}>
              <div className="form-group">
                <label className="label-margin">Event Address</label>
                <input className="form-control" ref="address" type="text"/>
              </div>
              <div className="btn-margin">
                <button className="btn btn-light" type="submit">Go</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {
    validUser: store.signIn,
    contract: store.contract
  };
}

export default connect(mapStateToProps)(ManageEvent);