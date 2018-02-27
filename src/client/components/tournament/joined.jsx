import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';

class Joined extends Component {
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

  handleEnterSubmit(e) {
    e.preventDefault();

    const player = this.refs.name.value;
    const fee = this.refs.entry.value;

    this.tournamentInstance.enterTournament(player, {
      gas: 3000000,
      value: web3.toWei(fee, 'ether')
    }, (err, res) => {
      if (!err) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="jumbo">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 text-center jumbo">
            <form className="form-text form-margin" onSubmit={this.handleEnterSubmit.bind(this)}>
              <div className="form-group">
                <label className="label-margin">Name</label>
                <input ref="name" type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label className="label-margin">Entry Fee</label>
                <input type="number" ref="entry" step="0.00000001" className="form-control"/>
              </div>
              <div className="btn-margin">
                <button type="submit" className="btn btn-light" name="action">Enter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {contract: store.contract};
}

export default connect(mapStateToProps)(Joined);