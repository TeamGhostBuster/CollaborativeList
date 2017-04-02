const Axios = require('axios');
const cookie = require('react-cookie');

const token = localStorage.token
const host = 'https://api.vfree.org';

module.exports = {
  put(id, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/user/invitation/${id}/accept`;
    http.put(path)
      .then((respond) => {
        if (respond.status === 200) {
          callback();
        }
      });
  }
};
