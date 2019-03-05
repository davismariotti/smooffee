import React, { Component } from 'react';
import * as firebaseApp from 'firebase';
import Notelist from './Notelist';

class Dashboard extends Component {
  constructor(props) {
    const user = firebaseApp.auth().currentUser;
    super(props);
    this.state = { user, text: '', notes: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillMount() {
    const _this = this;
    const items = firebaseApp
      .database()
      .ref(`users/${  this.state.user.uid  }/notes`);
    items.on('value', function(snapshot) {
      const obj = snapshot.val();
      // convert object to array
      const arr = [];
      for (const key in obj) {
        if (key) {
          const value = obj[key];
          obj[key].key = key;
          arr.push(value);
        }
      }
      _this.setState({ notes: arr });
    });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    const _this = this;
    e.preventDefault();
    firebaseApp
      .database()
      .ref(`users/${  this.state.user.uid  }/notes`)
      .push({
        note: _this.state.text
      });
  }

  render() {
    return (
      <div className="Dashboard">
        <br/>
        <p>
          You’re signed is as: {this.state.user.displayName} |{' '}
          {this.state.user.email}
        </p>

        <div className="form-group">
          <h4 className="note-title">Add a little note: </h4>
          <form onSubmit={this.handleSubmit} className="form-inline col-xs-12">
            <input
              type="text"
              className="form-control text-input"
              value={this.state.text}
              onChange={this.handleTextChange}
              placeholder="Enter Text"
            />
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
          <br/> <br/>
          <div>
            <h4>My Notes: </h4>
            <Notelist items={this.state.notes}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
