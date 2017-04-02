module.exports = {
  put(listIds, group, groupId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = localStorage.token;
    const host = 'https://api.vfree.org';

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token }
    });

    const path = group === 'true' ? `/group/${groupId}/lists/retrieve` : '/user/lists/retrieve';

    const body = { lists: listIds };
    console.log(body);
    http.put(path, body)
      .then(
        (respond) => {
          callback(true);
        }
      );
  }
};
