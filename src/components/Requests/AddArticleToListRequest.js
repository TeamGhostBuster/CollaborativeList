const Axios = require('axios');
const cookie = require('react-cookie');

const token = cookie.load('Access-Token');
const host = 'https://api.vfree.org';

module.exports = {
  group_add(listId, articleId, groupId, callback) {
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/group/${groupId}/list/${listId}/articles`;
    http.post(path, {article_id:articleId})
      .then((respond) => {
        if (callback) {
          callback(respond.data);
        }
      });
  },

  personal_add(listId, articleId, callback){
    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const path = `/user/list/${listId}/articles`;
    http.post(path, {article_id:articleId})
      .then((respond) => {
        if (callback) {
          callback(respond.data);
        }
      });
  }
};
