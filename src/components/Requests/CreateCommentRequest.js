module.exports = {
  post(articleId, dataObject, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');

    const host = 'https://api.vfree.org';
    const token = localStorage.token;
    const path = `/article/${articleId}/comment`;

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: {
        'Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

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
