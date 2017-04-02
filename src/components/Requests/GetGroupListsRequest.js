module.exports = {
  get(groupId, callback) {
    const cookie = require('react-cookie');
    const Axios = require('axios');
    const token = localStorage.token;

    const http = Axios.create({
      baseURL: 'https://api.vfree.org',
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    http.get(`/group/${groupId}/lists`)
      .then(
        // success call back
        (respond) => {
          callback(respond.data);
        });
  }
};
