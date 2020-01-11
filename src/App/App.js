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
import EditStuff from '../components/shared/EditStuff/EditStuff';
import Home from '../components/pages/Home/Home';
import MyStuff from '../components/pages/MyStuff/MyStuff';
import Navbar from '../components/shared/Navbar/Navbar';
import NewStuff from '../components/pages/NewStuff/NewStuff';
import SingleStuff from '../components/shared/SingleStuff/SingleStuff';

import firebaseConnection from '../helpers/data/connection';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar authed={authed} />
          <Switch>
            <PrivateRoute path="/home" exact component={Home} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
            <PrivateRoute path="/stuff/new" exact component={NewStuff} authed={authed} />
            <PrivateRoute path="/stuff" exact component={MyStuff} authed={authed} />
            <PrivateRoute path="/stuff/:stuffId/edit" exact component={EditStuff} authed={authed} />
            <PrivateRoute path="/stuff/:stuffId" exact component={SingleStuff} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
