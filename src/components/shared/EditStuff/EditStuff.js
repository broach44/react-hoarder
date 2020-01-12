import React from 'react';
import { Redirect } from 'react-router-dom';
import stuffData from '../../../helpers/data/stuffData';

import './EditStuff.scss';
import authData from '../../../helpers/data/authData';

class EditStuff extends React.Component {
  state = {
    updatedItemName: '',
    updatedItemImage: '',
    updatedItemDescription: '',
    redirect: false,
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

  componentDidMount() {
    const { stuffId } = this.props.match.params;
    this.getStuff(stuffId);
  }

  getStuff = (stuffId) => {
    stuffData.getSingleStuffById(stuffId)
      .then((response) => {
        const stuff = response.data;
        this.setState({
          updatedItemName: stuff.itemName,
          updatedItemImage: stuff.itemImage,
          updatedItemDescription: stuff.itemDescription,
        });
      })
      .catch((errFromGetSingleStuff) => console.error(errFromGetSingleStuff));
  }

  itemNameChange = (e) => {
    e.preventDefault();
    this.setState({ updatedItemName: e.target.value });
  }

  itemImageChange = (e) => {
    e.preventDefault();
    this.setState({ updatedItemImage: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ updatedItemDescription: e.target.value });
  }

  saveUpdatedStuffEvent = (e) => {
    e.preventDefault();
    const { updatedItemDescription, updatedItemImage, updatedItemName } = this.state;
    const { stuffId } = this.props.match.params;
    const updatedStuff = {
      itemName: updatedItemName,
      itemImage: updatedItemImage,
      itemDescription: updatedItemDescription,
      uid: authData.getUid(),
    };
    stuffData.updateStuff(stuffId, updatedStuff)
      .then(() => {
        this.setRedirect();
      })
      .catch((errFromUpdate) => console.error(errFromUpdate));
  }

  render() {
    const { updatedItemName, updatedItemImage, updatedItemDescription } = this.state;
    return (
      <div className="EditStuff">
        {this.renderRedirect()}
        <h1>Edit</h1>
        <div className="container w-65">
          <form>
            <div className="form-group">
              <label>Item Name:</label>
              <input
                type="text"
                className="form-control"
                id="itemNameInput"
                placeholder="Enter Item Name"
                value={updatedItemName}
                onChange={this.itemNameChange}
              />
            </div>
            <div className="form-group">
              <label>Item Image Url:</label>
              <input
                type="text"
                className="form-control"
                id="itemImageUrlInput"
                placeholder="Enter Item Image Url"
                value={updatedItemImage}
                onChange={this.itemImageChange}
              />
            </div>
            <div className="form-group">
              <label>Item Description:</label>
              <input
                type="text"
                className="form-control"
                id="itemDescriptionInput"
                placeholder="Enter Item Description"
                value={updatedItemDescription}
                onChange={this.descriptionChange}
              />
            </div>
            <button type="submit" className="btn btn-success" onClick={this.saveUpdatedStuffEvent}>Save Updates</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditStuff;
