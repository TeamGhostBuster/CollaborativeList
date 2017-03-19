module.exports = {
  get: function (groupId, callback) {
    let cookie = require('react-cookie');
    let Axios = require('axios');
    const token = cookie.load('Access-Token');

    let http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token": token},
    });

    http.get('/group/' + groupId + '/lists')
      .then(
        // success call back
        (respond) => {
          callback(respond.data);
        })
  }
};
