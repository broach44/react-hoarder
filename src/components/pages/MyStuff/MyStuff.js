import React from 'react';
import { Link } from 'react-router-dom';

import stuffData from '../../../helpers/data/stuffData';

import './MyStuff.scss';

class MyStuff extends React.Component {
  state = {
    stuffs: [],
  }

  componentDidMount() {
    this.getStuff();
  }

  getStuff = () => {
    const userId = '12345';
    stuffData.getStuffByUid(userId)
      .then((stuffs) => {
        this.setState({ stuffs });
      })
      .catch((errFromGetStuff) => console.error(errFromGetStuff));
  }

  render() {
    const { stuffs } = this.state;
    const stuffId = '12345';
    return (
      <div className="MyStuff">
        <h1>My Stuff</h1>
        <Link className="btn btn-primary m-2" to={`/stuff/${stuffId}/edit`}>Edit</Link>
        <Link className="btn btn-primary m-2" to={`/stuff/${stuffId}`}>Single</Link>
        <div className="container list-container">
          <ul className="list-group">
          {
            stuffs.map((stuff, index) => <li className="list-group-item">{index + 1}. <Link to={`/stuff/${stuff.id}`}>{stuff.itemName}</Link></li>)
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default MyStuff;
