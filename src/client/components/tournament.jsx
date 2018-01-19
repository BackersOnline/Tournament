import React, { Component } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import Store from '../../store'
import createTournamentJSON from '../../../build/contracts/CreateTournament.json'
import tournamentJSON from '../../../build/contracts/Tournament.json'

class Tournament extends Component {
  constructor() {
    super()

    if (typeof web3 !== 'undefined') {
      console.log('Using Web3 detected from external source.')
      this.web3 = new Web3(web3.currentProvider)
    } else {
      throw new Error('No Web3 detected. Please install an external source such as Metamask or another provider.')
      console.log('No Web3 detected. Please install an external source such as Metamask or another provider.')
    }

    this.createContract = web3.eth.contract(createTournamentJSON.abi)
    this.tournamentContract = web3.eth.contract(tournamentJSON.abi)
    
    
    this.createInstance = this.createContract.at("0x9473e2345628c6a19605aa1b1048be620b6bfa79")
    this.tournamentInstance = this.tournamentContract.at("")
  }

  handleJoinNavClick() {
    Store.dispatch({type: 'JOIN_TOURNAMENT'})
  }

  handleCreateNavClick() {
    Store.dispatch({type: 'CREATE_TOURNAMENT'})
  }

  handleCreatedClick() {
    Store.dispatch({type: 'ORGANIZER_ONLY'})
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

  handleEnterSubmit(e) {
    e.preventDefault()

    const player = this.refs.name.value
    const fee = this.refs.entry.value

    this.tournamentInstance.enterTournament(player, {
      gas: 3000000,
      value: web3.toWei(fee, 'ether')
    }, (err, res) => {
      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    })
  }

  handleAwardSubmit(e) {
    e.preventDefault()
    let prize
    let awards 

    this.tournamentInstance.tournamentPrizePool((err, res) => {
      if (!err) {
        prize = res
      } else {
        console.log(err)
      }
    })
    
    awards = this.calculatePrizes(prize)

    this.tournamentInstance.awardPrize(this.refs.first.value, this.refs.second.value, this.refs.third.value, awards[0], awards[1], awards[2], (err, res) => {
      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    })
    
  }

  calculatePrizes(pool) {
    const prizes = [] 
    
    prizes.push((pool / .2))
    prizes.push((pool / .3))
    prizes.push((pool / .5))

    return prizes
  }

  getTournyName() {
   const title = this.tournamentInstance.tournamentTitle((err, res) => {
      if (!err) {
        return res
      } else {
        console.log(err)
      }
    })

    return title
  }

  render() {
    return (
      <section className="container-fluid" id="jumbo">
        <div className="row">
          <div id="nav">
            <div className="col-xs-6 text-center nav-items" onClick={this.handleJoinNavClick}>
              <header className="nav-headers">
                <h3>Join A Tournament</h3>
              </header>
            </div>
            <div className="col-xs-6 text-center nav-items" onClick={this.handleCreateNavClick}>
              <header className="nav-headers">
                <h3>Create A New Tournament</h3>
              </header>
            </div>
          </div>
          <div className={this.props.views.create === true ? '' : 'hide'}>
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
                  <input ref="fee" type="number" className="form-control"/>
                </div>
                <div className="form-group">
                  <label className="label-margin">Set the Tournament Surcharge</label>
                  <input ref="surcharge" type="number" className="form-control"/>
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
          <div className={this.props.views.created === true ? '' : 'hide'}>
            <div className="col-sm-4 col-sm-offset-4 text-center">
              <form className="form-text form-margin" onSubmit={this.handleAwardSubmit.bind(this)}>
                <div className="form-group">
                  <label className="label-margin">First Place (Wallet Address)</label>
                  <input ref="first" type="text" className="form-control"/>
                </div> 
                <div className="form-group">
                  <label className="label-margin">Second Place (Wallet Address)</label>
                  <input ref="second" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                  <label className="label-margin">Third Place (Wallet Address)</label>
                  <input ref="third" type="text" className="form-control"/>
                </div>
                <div className="btn-margin">
                  <button type="submit" className="btn btn-light" name="action">Award Prizes</button>
                </div>
              </form>
            </div>
          </div>
          <div className={this.props.views.join === true ? '' : 'hide'}>
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
          <div className={this.props.views.joined === true ? '' : 'hide'}>
            <div className="col-sm-4 col-sm-offset-4 text-center">
              <div className="titles">
                <h3>You Have Entered Tournament: {this.props.views.joined === true ? this.getTournyName() : ''}</h3>
              </div>
            </div>
            <div className="col-sm-4 col-sm-offset-4 text-center">
              <form className="form-text form-margin" onSubmit={this.handleEnterSubmit.bind(this)}>
                <div className="form-group">
                  <label className="label-margin">Name</label>
                  <input ref="name" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                  <label className="label-margin">Entry Fee</label>
                  <input type="number" ref="entry" className="form-control"/>
                </div>
                <div className="btn-margin">
                  <button type="submit" className="btn btn-light" name="action">Enter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    views: state.views,
  }
}

export default connect(mapStateToProps)(Tournament)