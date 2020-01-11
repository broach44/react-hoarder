import React from 'react';
import { Redirect } from 'react-router-dom';
import './NewStuff.scss';
import authData from '../../../helpers/data/authData';
import stuffData from '../../../helpers/data/stuffData';

class NewStuff extends React.Component {
  state = {
    newItemName: '',
    newItemImage: '',
    newItemDescription: '',
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

  saveNewItem = (newStuffInfo) => {
    stuffData.saveNewStuff(newStuffInfo)
      .then(() => {
        this.setRedirect();
        this.setState({
          newItemName: '',
          newItemImage: '',
          newItemDescription: '',
          redirect: false,
        });
      })
      .catch((errFromSaveNew) => console.error(errFromSaveNew));
  }

  saveNewItemEvent = (e) => {
    e.preventDefault();
    const { newItemName, newItemImage, newItemDescription } = this.state;
    const newItem = {
      itemDescription: newItemDescription,
      itemName: newItemName,
      itemImage: newItemImage,
      uid: authData.getUid(),
    };
    this.saveNewItem(newItem);
  }

  itemNameChange = (e) => {
    e.preventDefault();
    this.setState({ newItemName: e.target.value });
  }

  itemImageChange = (e) => {
    e.preventDefault();
    this.setState({ newItemImage: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ newItemDescription: e.target.value });
  }

  render() {
    return (
      <div className="NewStuff">
        {this.renderRedirect()}
        <h1>New Stuff</h1>
        <div className="container w-65">
          <form>
            <div className="form-group">
              <label>Item Name:</label>
              <input
                type="text"
                className="form-control"
                id="itemNameInput"
                placeholder="Enter Item Name"
                value={this.state.newItemName}
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
                value={this.state.newItemImage}
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
                value={this.state.newItemDescription}
                onChange={this.descriptionChange}
              />
            </div>
            <button type="submit" className="btn btn-success" onClick={this.saveNewItemEvent}>Save Item</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewStuff;
