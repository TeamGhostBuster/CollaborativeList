module.exports = {
  get: function (callback) {
    let cookie = require('react-cookie');
    let Axios = require('axios');
    const token = cookie.load('Access-Token');

    let http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {"Access-Token": token},
    });

    http.get('/user/lists')
      .then(
        // success call back
        (respond) => {
          if (respond.status === 200) {

            callback(respond.data);
          }
        })
  }
};
