module.exports = {
  delete(listId, articleId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = localStorage.token;
    const host = 'https://api.vfree.org';
    const path = `/user/list/${listId}/article/${articleId}`;


    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    http.delete(path)
      .then(
        (respond) => {
          callback(respond.data);
        }
      )
      .catch(
        (err) => {
          console.log('Error: archive article request:', err);
          if (err.status === 401) {
            console.log('invalid token');
          } else {
            console.log('invalid request of lists info');
          }
        });
  },

  archive(listId,articleId,callback){
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = localStorage.token;
    const host = 'https://api.vfree.org';
    const path = `/user/list/${listId}/article/${articleId}/archive`;


    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    http.delete(path)
      .then(
        (respond) => {
          callback(respond.data);
        }
      )
      .catch(
        (err) => {
          console.log('Error: archive article request:', err);
          if (err.status === 401) {
            console.log('invalid token');
          } else {
            console.log('invalid request of lists info');
          }
        });
  }
}

;
