module.exports = {
  post(action, groupId, listId, articleId, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = localStorage.token;
    const host = 'https://api.vfree.org';

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: { 'Access-Token': token },
    });

    const pathPrefix = `/group/${groupId}/list/${listId}/article/${articleId}`;
    const path = action === 'up' ?
      `${pathPrefix}/upvote` :
      `${pathPrefix}/downvote`;

    http.post(path)
      .then(
        (respond) => {
          callback();
        }
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status === 401) {
            console.log('invalid token');
          } else {
            console.log('invalid request of lists info');
          }
        });
  }
};
