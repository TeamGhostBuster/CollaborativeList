const Axios = require('axios');
const cookie = require('react-cookie');

const token = cookie.load('Access-Token');
const host = 'https://api.vfree.org';

module.exports = {
  put(listId, newListName, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/user/list/${listId}/rename`;
    http.put(path, { name: newListName })
      .then((respond) => {
        callback(respond.data);
      });
  }
};
