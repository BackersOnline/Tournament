import React, { Component } from 'react';
import { connect } from 'react-redux';

class UpcomingEvents extends Component {
  constructor(props) {
    super(props)
    this.state = { events: null };
  }

  shouldComponentUpdate() {
    if (this.state.events === null) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    if (this.props.validUser.userInfo !== null) {
      fetch('/get/participant/upcoming/events/' + this.props.validUser.userInfo[0].id)
      .then(res => res.json())
      .then(data => {
        this.setState({events: data});
      })
      .catch(err => {
        throw new Error(err);
      });
    }
  }

  render() {
    return (
      <div className="col-sm-12">
        <div>
          <header>
            <h5>Upcoming Events</h5>
          </header>
        </div>
        <div>
          {(() => {
            if (this.state.events === null || this.state.events.length < 1) {
              return (
                <div>
                  <h6>No Upcoming Events.</h6>
                </div>
              )
            } else {
              return (
                <table>
                  <tbody>
                    {
                      this.state.events.map((row, index) => {
                        return (
                          <tr key={index}>
                            <td>{row.title}</td>
                            <td>{row.role}</td>
                            <td>{row.start_date}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
            }
          })()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {validUser: store.signIn};
}

export default connect(mapStateToProps)(UpcomingEvents);