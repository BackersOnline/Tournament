import React from 'react';

function NoWeb3() {
  return (
    <section className="container-fluid" id="no-web3">
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4" id="no-web3-box">
          <div className="text-center">
            <img src="ethereum.png" id="eth"/>
            <img src="prohibit.gif" id="prohibit"/>
          </div>
          <div className="text-center">
            <h1>No Web3 Detected</h1>
          </div>
          <div className="text-center">
            <h4>It seems like you do not have an injected Web3 instance. Please install Metamask or another Web3 provider and make sure your wallet is unlocked with at least one account in the accounts list.</h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NoWeb3;