import React from 'react';
import { Link } from 'react-router-dom';

import authData from '../../../helpers/data/authData';
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
    stuffData.getStuffByUid(authData.getUid())
      .then((stuffs) => {
        this.setState({ stuffs });
      })
      .catch((errFromGetStuff) => console.error(errFromGetStuff));
  }

  deleteItem = (e) => {
    e.preventDefault();
    const stuffId = e.target.id.split('delete-')[1];
    stuffData.deleteSingleStuff(stuffId)
      .then(() => {
        this.getStuff();
      })
      .catch((errFromDeleteItem) => console.error(errFromDeleteItem));
  }

  render() {
    const { stuffs } = this.state;
    return (
      <div className="MyStuff">
        <h1>My Stuff</h1>
        <div className="container list-container">
          <ul className="list-group">
          {
            stuffs.map((stuff, index) => <li key={stuff.id} className="list-group-item">
              {index + 1}. <Link to={`/stuff/${stuff.id}`}>{stuff.itemName}</Link>
              <div className="ml-auto">
                <button className="btn btn-danger btn-sm m-2" id={`delete-${stuff.id}`} onClick={this.deleteItem}>Delete Item</button>
                <Link className="btn btn-primary btn-sm m-2" to={`/stuff/${stuff.id}/edit`}>Edit Item</Link>
              </div>
              </li>)
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default MyStuff;
