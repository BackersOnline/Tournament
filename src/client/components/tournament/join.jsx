import React, { Component } from 'react';
import Web3 from 'web3';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from './nav-bar.jsx';

class JoinTournament extends Component {
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
  }

  handleJoinSubmit(e) {
    e.preventDefault()
    const address = this.refs.address.value

    this.createInstance.checkAddress(address, {
      gas: 3000000
    }, (err, res) => {
      if (!err) {
        if (res === true) {
          console.log('Successfully joined tournament.')          
          this.tournamentInstance = this.tournamentContract.at(address) 
          Store.dispatch({type: 'HAS_JOINED'})         
        } else {
          alert('ERROR: \n' + 'Tournament address does not exist.')
        }
      } else {
        alert(err)
      }
    })
  }
  render() {
    if (!this.props.validUser.user) {
      return <Redirect to="/login"/>
    }
    return (
      <section className="container-fluid jumbo">
        <div className="row">
          <NavBar/>
          <div className="col-sm-4 col-sm-offset-4 text-center">
            <form className="form-text form-margin" onSubmit={this.handleJoinSubmit.bind(this)}>
              <div className="form-group">
                <label className="label-margin">Tournament Address</label>
                <input ref="address" type="text" className="form-control"/>
              </div>
              <div className="btn-margin">
                <button type="submit" className="btn btn-light" name="action">Join</button>
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
    contract: store.contract,
    validUser: store.signIn
  }
}

export default connect(mapStateToProps)(JoinTournament)