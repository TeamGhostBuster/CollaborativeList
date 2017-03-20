module.exports = {
  get(listId, group, groupId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const host = 'https://api.vfree.org';
    const token = cookie.load('Access-Token');

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const url = group === 'true' ?
      `/group/${groupId}/list/${listId}/articles` :
      `/user/list/${listId}/articles`;

    http.get(url)
      .then(
        (respond) => {
          callback(respond.data);
        }
      );
  }

};
