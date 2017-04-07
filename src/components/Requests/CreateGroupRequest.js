module.exports = {
  post(dataObject, callback, errorCallback) {
    const cookie = require('react-cookie');
    const Axios = require('axios');
    const token = localStorage.token;


    const http = Axios.create({
      baseURL: 'https://api.vfree.org',
      responseType: 'json',
      headers: {
        'Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

    http.post('/group', dataObject)
      .then((respond) => {
        callback(respond.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          console.log('invalid token');
        } else {
          errorCallback();
        }
      });
  }
};
