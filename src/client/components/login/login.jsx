import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { Link, Redirect } from 'react-router-dom';
import Store from '../../../store';
import { firebase, auth } from '../../../utils/firebase';
import history from '../../../utils/history';
import NoWeb3 from '../web3.jsx';

class LoginPage extends Component {
  constructor() {
    super() 
      if (typeof web3 !== 'undefined') {
        console.log('Using web3 detected from external source.');
        this.web3 = new Web3(web3.currentProvider);
      } else {
        console.log('Error: No web3 detected. Please install an external source such as Metamask.');
      }
  }

  handleLogin(e) {
    e.preventDefault();

    const email = this.refs.loginEmail.value;
    const password = this.refs.loginPassword.value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        Store.dispatch({type: 'LOG_IN', payload: true});
        history.push('/');
      })
      .catch(error => {
        Store.dispatch({type: 'LOGIN_ERROR', payload: true});
        setTimeout(() => {
          Store.dispatch({type: 'RESOLVE_ERROR', payload: false});
        }, 1000);
        throw new Error(error.code + ': ' + error.message);
      });
  }

  render() {
    if (typeof web3 !== 'undefined') {
      return (
        <section className="container-fluid login-background">
          <div className="row">
            <div className={this.props.validUser.error === false ? "col-sm-4 col-sm-offset-4 login-box" : "col-sm-4 col-sm-offset-4 error-shake"} ref="login">
              <div className="login-headers">
                <header className="text-center">
                  <h2>Welcome to</h2>
                  <img id="login-image" src="backers-logo.png"/>
                </header>
              </div>
              <div>
                <form className="text-center" onSubmit={this.handleLogin.bind(this)}>
                  <div className="form-group">
                    <input className="form-control login-inputs" type="email" ref="loginEmail" placeholder="Email"/>
                    <span className="underline"></span>
                  </div>
                  <div className="form-group">
                    <input className="form-control login-inputs" type="password" ref="loginPassword" placeholder="Password"/>
                    <span className="underline"></span>
                  </div>
                  <div className="login-buttons-container">
                    <button className="login-buttons" type="submit" name="action">Login</button>
                  </div>
                </form>
              </div>
              <div className="text-center">
                <p className="inline-text">Don't have an account?</p>
                <Link to="/sign-up" className="login-links inline-text">Sign Up</Link>
              </div>
            </div>
          </div>
        </section>
      )
    } else {
      return (
        <NoWeb3/>
      )
    }
  }
}

function mapStateToProps(store) {
  return {validUser: store.signIn};
}

export default connect(mapStateToProps)(LoginPage);