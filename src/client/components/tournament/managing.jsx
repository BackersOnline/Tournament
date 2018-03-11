import React, { Component } from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/fontawesome-free-solid';

class ManagingEvent extends Component {
  constructor(props) {
    super(props)

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 from external source.')
      this.web3 = new Web3(web3.currentProvider)
    } else {
      console.log('Error: No web3 detected. Please install an external source such as Metamask.')
    }

    this.state = {
      hidden: true,
      first: '',
      second: '',
      third: ''
    };

    this.handlePayoutClick = this.handlePayoutClick.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleThirdChange = this.handleThirdChange.bind(this);
    this.handlePayoutNowClick = this.handlePayoutNowClick.bind(this);

    this.createContract = web3.eth.contract(this.props.contract.createABI)
    this.tournamentContract = web3.eth.contract(this.props.contract.tournyABI)

    this.createInstance = this.createContract.at(this.props.contract.createAddress)
    this.tournamentInstance = this.tournamentContract.at(this.props.contract.tournyAddress)
  }

  handleStartClick() {
    this.tournamentInstance.startTournament((err, result) => {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    })
  }

  handleEndClick() {
    this.tournamentInstance.endTournament((err, result) => {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    })
  }

  handleReturnFeesClick() {
    this.tournamentInstance.returnFees((err, result) => {
      if (!err) {
        console.log(result);
      } else {
        console.log(err);
      }
    })
  }

  handlePayoutClick() {
    this.setState(prevState => {
      return Object.assign({}, prevState, {hidden: !prevState.hidden});
    });
  }

  getUserAddress(userName) {
    return fetch('/get/user/address/' + userName)
      .then(res => res.json())
  }

  async handlePayoutNowClick() {
    const winners = [this.state.first, this.state.second, this.state.third];
    const addresses = [];

    const prizePool = this.tournamentInstance.tournamentPrizePool((err, res) => {
      if (!err) {
        console.log(res);
      } else {
        console.log(err);
      }
    });

    const firstPrize = prizePool * 0.6;
    const secondPrize = prizePool * 0.3;
    const thirdPrize = prizePool * 0.1;

    for (let i = 0; i < winners.length; i++) {
      const address = await this.getUserAddress(winners[i]);
      addresses.push(address[0].default_address);
    }

    console.log(addresses)

    this.tournamentInstance.awardPrize(addresses[2], addresses[1], addresses[0], firstPrize, secondPrize, thirdPrize, {
      gas: 3000000
    }, (err, res) => {
      if (!err) {
        console.log(res)
      } else {
        console.log(err)
      }
    });
  }

  handleFirstChange(e) {
    e.persist();
    this.setState(prevState => {
      return Object.assign({}, prevState, {first: e.target.value});
    })
  }

  handleSecondChange(e) {
    e.persist();
    this.setState(prevState => {
      return Object.assign({}, prevState, {second: e.target.value});
    })
  }

  handleThirdChange(e) {
    e.persist();
    this.setState(prevState => {
      return Object.assign({}, prevState, {third: e.target.value});
    })
  }

  render() {
    return (
      <section className="jumbo">
        <div className="row">
          <form>
            <div className="col-sm-6 form-element-margins">
              <button className="btn btn-light" type="button" onClick={this.handleStartClick}>Start Event</button>
            </div>
            <div className="col-sm-6 form-element-margins">
              <button className="btn btn-light" type="button" onClick={this.handleEndClick}>End Event</button>
            </div>
            <div className="col-sm-6 form-element-margins">
              <button className="btn btn-light" type="button" onClick={this.handleReturnFeesClick}>Return Fees</button>
            </div>
            <div className="col-sm-6 form-element-margins">
              <button className="btn btn-light" type="button" onClick={this.handlePayoutClick} style={{marginBottom: '10px'}}>Payout Winners <FontAwesomeIcon icon={this.state.hidden ? faChevronDown : faChevronUp}/></button>
              <div id="drop-down" className={this.state.hidden === true ? 'hidden' : ''}>
                <ul>
                  <li>
                    <div className="form-group">
                      <input className="form-control" value={this.state.first} type="text" placeholder="First Place" onChange={this.handleFirstChange}/>
                    </div>
                  </li>
                  <li>
                    <div className="form-group">
                      <input className="form-control" value={this.state.second} type="text" placeholder="Second Place" onChange={this.handleSecondChange}/>
                    </div>
                  </li>
                  <li>
                    <div className="form-group">
                      <input className="form-control" value={this.state.third} type="text" placeholder="Third Place" onChange={this.handleThirdChange}/>
                    </div>
                  </li>
                  <li>
                    <button className="btn btn-light" type="button" onClick={this.handlePayoutNowClick}>Payout Now</button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {contract: store.contract};
}

export default connect(mapStateToProps)(ManagingEvent);