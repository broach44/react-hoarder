import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Navbar from '../components/shared/Navbar/Navbar';

import firebaseConnection from '../helpers/data/connection';

import './App.scss';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Navbar authed={authed} />
        <h1>React Hoarder</h1>
        { (!authed) && <Auth />}
        <Home />
      </div>
    );
  }
}

export default App;
