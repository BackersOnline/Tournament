import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Store from '../../../store';
import { firebase, auth } from '../../../utils/firebase';
import history from '../../../utils/history';

class SignUp extends Component {
  handleSignUp(e) {
    e.preventDefault();

    const username = this.refs.username.value;
    const email = this.refs.signUpEmail.value;
    const password = this.refs.signUpPassword.value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        Store.dispatch({type: 'LOG_IN', payload: true});
        auth.onAuthStateChanged(user => {
          user.updateProfile({
            displayName: username
          })
          .then(() => {
            console.log('Sign up successful.')
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