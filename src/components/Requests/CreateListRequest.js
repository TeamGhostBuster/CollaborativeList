module.exports = {
  post(group, dataObject, callback) {
    const cookie = require('react-cookie');
    const Axios = require('axios');
    const token = cookie.load('Access-Token');

    const http = Axios.create({
      baseURL: 'https://api.vfree.org',
      responseType: 'json',
      headers: {
        'Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

    const path = group === 'true' ? '/group/list' : '/user/list';

    http.post(path, dataObject)
      .then(
        // success call back
        (respond) => {
          callback(respond);
        });
  }
};
