import React, { Component } from 'react';
import { getPlayer, getFriends } from './util/getData';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      player: {
        data: null,
        friends: null,
      },
    };
  }

  componentDidMount() {
    // getPlayer('76561197998827793').then(data => {
    //   this.setState({
    //     player: {
    //       ...this.state.player,
    //       data: data.response.players[0],
    //     },
    //   });
    // });

    getFriends('76561197998827793', 'all').then(data => {
      this.setState({
        player: {
          ...this.state.player,
          friends: data,
        },
      });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.player.data === null ? (
          <h1>Loading</h1>
        ) : (
          <div className="mainContent">
            <h1>{this.state.player.data.realname}</h1>
            <div className="profilePic">
              <img src={this.state.player.data.avatarfull} alt="avatar" />
            </div>
            <h2>Friends</h2>
            <ul>{}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default App;
