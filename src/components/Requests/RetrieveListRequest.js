module.exports = {
  put(listId, group, groupId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = cookie.load('Access-Token');
    const host = 'https://api.vfree.org';

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token }
    });

    const path = group === 'true' ? `/group/list/${listId}/retrieve` : `/user/list/${listId}/retrieve`;

    const body = group === 'true' ? { data: { group_id: groupId } } : {};

    http.put(path, body)
      .then(
        (respond) => {
          callback(respond.data);
        }
      );
  }
};
