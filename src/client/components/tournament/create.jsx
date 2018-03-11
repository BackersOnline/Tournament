import React, { Component } from 'react';
import Web3 from 'web3';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { firebase, auth } from '../../../utils/firebase';
import Store from '../../../store';
import DateWrapper from './dates-wrapper.jsx';

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

  createTournamentId(title) {
    return auth.currentUser.displayName + '_' + title;
  }

  postTournament(eventId, tournyTitle, maxParticipants, minParticipants, buyIn) {
    const tournyId = this.createTournamentId(tournyTitle);

    const data = {
      tournamentId: tournyId,
      max: maxParticipants,
      min: minParticipants,
      buyIn: buyIn,
      eventId: eventId
    };

    fetch('/post/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  postEvent(organizerId, eventTitle, isPublic, startDate, address) {
    const data = {
      organizer: organizerId,
      title: eventTitle,
      isPublic: isPublic,
      start: startDate,
      address: address
    };

    return fetch('/post/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      return data[0];
    });

  }

  eventType(isPublic) {
    const types = document.getElementsByName('type');
    let eventType;

    for (let i = 0; i < types.length; i++) {
      if (types[i].checked) {
        eventType= types[i].value;
      }
    }

    if (eventType === 'public') {
      return true;
    } else {
      return false;
    }
  }

  handleCreateSubmit(e) {
    e.preventDefault()
    const title = this.refs.title.value
    const maxParticipants = this.refs.maxParticipants.value 
    const minParticipants = this.refs.minParticipants.value
    const fee = web3.toWei(this.refs.fee.value, 'ether')
    const buyIn = this.refs.fee.value
    const isPublic = this.eventType();
    const date = this.props.date.date;
    
    this.createInstance.createNewTournament(title, maxParticipants, fee, 0, {
      gas: 3000000
    }, (err, res) => {
      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    })

    Store.dispatch({ type: 'CHANGE_VIEW', payload: 'LOADER' });
    
    const event = this.createInstance.TournamentAddress((error, result) => {            
      if (!error) {
        this.postEvent(this.props.validUser.userInfo[0].id, title, isPublic, date, result.args.tourny)
          .then(eventId => {
            this.postTournament(eventId, title, maxParticipants, minParticipants, buyIn);                        
          });
        
        this.tournamentInstance = this.tournamentContract.at(result.args.tourny)
        alert('IMPORTANT: \n' + 'If you are sender \n' + result.args.organizer + '\n, please share this address to invite players to your tournament: \n' + result.args.tourny)
        Store.dispatch({type: 'CHANGE_VIEW', payload: 'CLEAR'});
      }
      else {
        Store.dispatch({ type: 'CHANGE_VIEW', payload: 'CLEAR' });
        alert(error);
      }
    })
  }

  render() {
    if (!this.props.validUser.user) {
      return <Redirect to="/login"/>
    }
    return (
      <section className="jumbo">
          <div className="row">
            <form className="form-text form-margin" onSubmit={this.handleCreateSubmit.bind(this)}>
              <div className="col-sm-12 form-element-margins">
                <div className="form-group">
                  <input ref="title" type="text" className="form-control" placeholder="Event Title"/>
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <div className="form-group">
                  <input ref="maxParticipants" type="number" className="form-control" placeholder="Max Participants"/>
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <div className="form-group">
                  <input ref="minParticipants" type="number" className="form-control" placeholder="Minimum Participants"/>
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <label className="label-margin">Public or Private Event?</label>
                <div>
                  <input type="radio" name="type" value="public"/> Public 
                  <span>       </span>   
                  <input type="radio" name="type" value="private"/> Private
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <div className="form-group">
                  <input ref="fee" type="number" step="0.00001" className="form-control" placeholder="Event Entry Fee (Ether)"/>
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <div className="">
                  <DateWrapper getDate={this.getDate}/>
                </div>
              </div>
              <div className="col-sm-6 form-element-margins">
                <div className="btn-margin">
                  <button type="submit" className="btn btn-light" name="action">Create</button>
                </div>
              </div>
            </form>
          </div>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {
    contract: store.contract,
    validUser: store.signIn,
    date: store.date
  }
};

export default connect(mapStateToProps)(CreateTournament);