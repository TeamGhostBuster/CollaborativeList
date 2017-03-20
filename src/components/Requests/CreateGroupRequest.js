module.exports = {
  post(dataObject, callback) {
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

    http.post('/group', dataObject)
      .then((respond) => {
        callback(respond.data);
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
