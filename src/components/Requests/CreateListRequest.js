module.exports = {
  post : function (group, dataObject, callback) {
    let cookie = require('react-cookie');
    let Axios = require('axios');
    const token = cookie.load('Access-Token');

    let http = Axios.create({
      baseURL: "https://api.vfree.org",
      responseType: "json",
      headers: {
        "Access-Token":token,
        "Content-Type":"application/json",
      }
    });

    const path = group==="true" ? '/group/list' : '/user/list';

    http.post(path,dataObject)
      .then(
        // success call back
        (respond) => {
          callback(respond);
        })
  }
};
