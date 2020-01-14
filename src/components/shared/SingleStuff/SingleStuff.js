import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import stuffData from '../../../helpers/data/stuffData';

import './SingleStuff.scss';

class SingleStuff extends React.Component {
  state = {
    stuff: {},
  }

  componentDidMount() {
    const { stuffId } = this.props.match.params;
    this.getStuff(stuffId);
  }

  getStuff = (stuffId) => {
    stuffData.getSingleStuffById(stuffId)
      .then((response) => {
        this.setState({ stuff: response.data });
      })
      .catch((errFromGetSingleStuff) => console.error(errFromGetSingleStuff));
  }

  deleteStuff = (e) => {
    e.preventDefault();
    const { stuffId } = this.props.match.params;
    stuffData.deleteSingleStuff(stuffId)
      .then(() => this.setRedirect())
      .catch((errFromSingleDelete) => console.error(errFromSingleDelete));
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  // eslint-disable-next-line consistent-return
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/stuff' />;
    }
  }

  render() {
    const { stuff } = this.state;
    const { stuffId } = this.props.match.params;
    return (
      <div className="SingleStuff">
        {this.renderRedirect()}
        <h1>Single Stuff</h1>
        <Link className="btn btn-primary m-3" to="/stuff">Go Back to My Stuff</Link>
        <div className="row justify-content-center">
              {
                (stuff !== null) && <div className="card col-6">
                  <img src={stuff.itemImage} alt={stuff.itemName} className="card-img-top stuff-image" />
                  <div className="card-body">
                    <h5 className="card-title">{stuff.itemName}</h5>
                    <p className="card-text">{stuff.itemDescription}</p>
                    <button className="btn btn-danger" onClick={this.deleteStuff} >Delete Item</button>
                    <Link className="btn btn-primary m-2" to={`/stuff/${stuffId}/edit`}>Edit Item</Link>
                  </div>
                </div>
              }
        </div>
      </div>
    );
  }
}

export default SingleStuff;
