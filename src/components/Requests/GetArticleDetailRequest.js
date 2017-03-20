module.exports = {
  get(articleId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const host = 'https://api.vfree.org';
    const path = `/user/article/${articleId}`;
    const token = cookie.load('Access-Token');

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    http.get(path)
      .then(
        (respond) => {
          callback(respond.data);
        }
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status === 401) {
            console.log('invalid token');
          } else {
            console.log('invalid request of lists info');
          }
        });
  }
};
