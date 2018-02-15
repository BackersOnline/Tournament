import React, { Component } from 'react';
import Web3 from 'web3';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import NavBar from './nav-bar.jsx';

class CreateTournament extends Component {
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

  handleCreateSubmit(e) {
    e.preventDefault()
    const title = this.refs.title.value
    const participants = this.refs.participants.value 
    const fee = web3.toWei(this.refs.fee.value, 'ether')
    const surcharge = web3.toWei(this.refs.surcharge.value, 'ether')
    
    this.createInstance.createNewTournament(title, participants, fee, surcharge, {
      gas: 3000000
    }, (err, res) => {
      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    })

    const event = this.createInstance.TournamentAddress((error, result) => {
      if (!error) {
        this.tournamentInstance = this.tournamentContract.at(result.args.tourny)
        alert('IMPORTANT: \n' + 'If you are sender \n' + result.args.organizer + '\n, please share this address to invite players to your tournament: \n' + result.args.tourny)
        Store.dispatch({type: 'ORGANIZER_ONLY'})
      }
      else {
        alert(error)
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
            <form className="form-text form-margin" onSubmit={this.handleCreateSubmit.bind(this)}>
              <div className="form-group">
                <label className="label-margin">Tournament Name</label>
                <input ref="title" type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label className="label-margin">Maximum Number of Participants</label>
                <input ref="participants" type="number" className="form-control"/>
              </div>
              <div className="form-group">
                <label className="label-margin">Set the Tournament Entry Fee</label>
                <input ref="fee" type="number" step="0.00000001" className="form-control"/>
              </div>
              <div className="form-group">
                <label className="label-margin">Set the Tournament Surcharge</label>
                <input ref="surcharge" type="number" step="0.00000001" className="form-control"/>
              </div>
              <div className="btn-margin">
                <button type="submit" className="btn btn-light" name="action">Create</button>
              </div>
            </form>
            <div>
              <p id="created-nav" onClick={this.handleCreatedClick}>Already Organized a Tournament?</p>
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

export default connect(mapStateToProps)(CreateTournament);