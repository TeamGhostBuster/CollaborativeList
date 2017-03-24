module.exports = {
  post(baseListId, targetListid, articleId, groupId, group, callback) {
    const Axios = require('axios');
    const cookie = require('react-cookie');
    const token = cookie.load('Access-Token');
    const host = 'https://api.vfree.org';

    const http = Axios.create({
      baseURL: host,
      responseType: 'json',
      headers: {
        'Access-Token': token,
        'Content-Type': 'application/json',
      }
    });

    // TODO
    // const path = group === 'true' ?
    //   `/group/${groupId}/list/${baseListId}/article/${articleId}/copy/list/${targetListid}` :
    //   `/user/list/${baseListId}/article/${articleId}/copy/list/${targetListid}`;
    const path = `/user/list/${baseListId}/article/${articleId}/copy/list/${targetListid}`;

    http.put(path)
      .then((respond) => {
        if (respond.status === 200) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          console.log('invalid token');
        } else {
          console.log('invalid request of lists info1111');
        }
      });
  }
};
