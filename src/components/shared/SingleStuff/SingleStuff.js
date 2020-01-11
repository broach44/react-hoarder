import React from 'react';

import stuffData from '../../../helpers/data/stuffData';

import './SingleStuff.scss';

class SingleStuff extends React.Component {
  state = {
    stuff: {},
  }

  componentDidMount() {
    const { stuffId } = this.props.match.params;
    stuffData.getSingleStuffById(stuffId)
      .then((response) => {
        this.setState({ stuff: response.data });
      })
      .catch((errFromGetSingleStuff) => console.error(errFromGetSingleStuff));
  }

  render() {
    const { stuff } = this.state;
    return (
      <div className="SingleStuff">
        <h1>Single Stuff</h1>
        <div className="row justify-content-center">
          <div class="card col-6">
            <img src={stuff.itemImage} alt={stuff.itemName} class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{stuff.itemName}</h5>
              <p class="card-text">{stuff.itemDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleStuff;
