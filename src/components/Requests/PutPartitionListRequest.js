const Axios = require('axios');
const cookie = require('react-cookie');
const token = localStorage.token;
const host = 'https://api.vfree.org';

module.exports = {
  put(listId, newListName, articles, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/user/list/${listId}/partition`;
    http.put(path, { name: newListName, articles })
      .then((respond) => {
        callback(respond.data);
      });
  }
};
