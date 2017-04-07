module.exports = {
  get(groupId, callback) {
    const Axios = require('axios');
    const token = localStorage.token;

    const http = Axios.create({
      baseURL: 'https://api.vfree.org',
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/group/${groupId}`
    http.get(path)
      .then((respond) => {
        callback(respond.data);
      });
  }
};

