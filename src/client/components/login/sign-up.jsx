import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import Store from '../../../store';
import { firebase, auth } from '../../../utils/firebase';
import history from '../../../utils/history';

class SignUp extends Component {
  constructor() {
    super()

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 detected from external source.');
      this.web3 = new Web3(web3.currentProvider);
    } else {
      console.log('Error: No web3 detected. Please install an external source such as Metamask.');
    }
  }

  handleSignUp(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.signUpEmail.value;
    const password = this.refs.signUpPassword.value;
    let address 

    web3.eth.getAccounts((err, res) => {
      if (!err) {
        address = res[0];
      } else {
        throw new Error(err);
      }
    });

    console.log(address)

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        Store.dispatch({type: 'LOG_IN', payload: true});
        auth.onAuthStateChanged(user => {
          user.updateProfile({
            displayName: username
          })
          .then(() => {
            fetch('/post/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                username: username,
                email: email,
                walletAddress: address
              })
            });

            console.log('Sign up successful.');
          })
        })
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
    return (
      <section className="container-fluid login-background">
        <div className={this.props.validUser.error === false ? "col-sm-4 col-sm-offset-4 login-box" : "col-sm-4 col-sm-offset-4 error-shake"} ref="signUp">
          <div className="login-headers">
            <header className="text-center">
              <h2>Sign Up</h2>
            </header>
          </div>
          <div>
            <form className="text-center" onSubmit={this.handleSignUp.bind(this)}>
              <div className="form-group">
                <input className="form-control login-inputs" type="text" ref="username" placeholder="Username"/>
                <span className="underline"></span>
              </div>
              <div className="form-group">
                <input className="form-control login-inputs" type="email" ref="signUpEmail" placeholder="Email"/>
                <span className="underline"></span>
              </div>
               <div className="form-group">
                 <input className="form-control login-inputs" type="password" ref="signUpPassword" placeholder="Password"/>
                 <span className="underline"></span>
               </div>
              <div className="login-buttons-container">
                <button className="login-buttons" type="submit" name="action">Register</button>
              </div>
            </form>
            <div className="text-center">
              <p className="inline-text">Already have an account?</p>
              <Link to="/login" className="inline-text login-links">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return {validUser: store.signIn};
}

export default connect(mapStateToProps)(SignUp);