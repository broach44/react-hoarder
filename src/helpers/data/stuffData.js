import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStuffByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stuff.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allStuffObj = result.data;
      const stuffs = [];
      if (allStuffObj != null) {
        Object.keys(allStuffObj).forEach((stuffId) => {
          const newStuff = allStuffObj[stuffId];
          newStuff.id = stuffId;
          stuffs.push(newStuff);
        });
      }
      resolve(stuffs);
    })
    .catch((err) => reject(err));
});

const getSingleStuffById = (stuffId) => axios.get(`${baseUrl}/stuff/${stuffId}.json`);

const deleteSingleStuff = (stuffId) => axios.delete(`${baseUrl}/stuff/${stuffId}.json`);

const saveNewStuff = (stuffInfo) => axios.post(`${baseUrl}/stuff.json`, stuffInfo);

const updateStuff = (stuffId, stuffInfo) => axios.put(`${baseUrl}/stuff/${stuffId}.json`, stuffInfo);

export default {
  getStuffByUid,
  getSingleStuffById,
  deleteSingleStuff,
  saveNewStuff,
  updateStuff,
};
