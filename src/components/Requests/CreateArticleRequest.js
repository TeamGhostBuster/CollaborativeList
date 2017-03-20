module.exports = {
  post(listId, group, groupId, dataObject, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = cookie.load('Access-Token');
    const host = 'https://api.vfree.org';

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: {
        'Access-Token': token,
        'Content-Type': 'application/json',
      }
    });


    const path = group === 'true' ?
      `/group/${groupId}/list/${listId}/article` :
      `/user/list/${listId}/article`;


    http.post(path, dataObject)
      .then((respond) => {
        callback();
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          console.log('invalid token');
        } else {
          console.log('invalid request of lists info1111');
        }
      });
  }

};
