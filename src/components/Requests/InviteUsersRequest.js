const Axios = require('axios');
const cookie = require('react-cookie');

const token = localStorage.token;
const host = 'https://api.vfree.org';

module.exports = {
  post(groupId, email, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/group/${groupId}/invite`;
    const body = { email: email };
    http.post(path, body)
      .then((respond) => {
        callback();
      });
  }
};
