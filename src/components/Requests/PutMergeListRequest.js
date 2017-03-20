const Axios = require('axios');
const cookie = require('react-cookie');
const token = cookie.load('Access-Token');
const host = 'https://api.vfree.org';

module.exports = {
  put_personal(baseId, targetId, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/user/list/${baseId}/merge/list/${targetId}`;
    http.put(path)
      .then((respond) => {
        callback(respond.data);
      });
  }
};
