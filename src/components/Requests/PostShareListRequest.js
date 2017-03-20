const Axios = require('axios');
const cookie = require('react-cookie');

const token = cookie.load('Access-Token');
const host = 'https://api.vfree.org';

module.exports = {
  post(listId, groupIdList, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = '/share/lists';
    http.post(path, { list_id: listId, group_id:groupIdList})
      .then((respond) => {
        callback(respond.data);
      });
  }
};