module.exports = {
  get: function (listId, group, groupId, callback) {
    let Axios = require('axios');
    let cookie = require('react-cookie');
    const host = "https://api.vfree.org";
    const token = cookie.load("Access-Token");

    let http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token": token},
    });

    const url = group === "true" ?
      "/group/" + groupId + "/list/" + listId + "/articles" :
      "/user/list/" + listId + "/articles";

    http.get(url)
      .then(
        (respond) => {
          callback(respond.data)
        }
      )
  }

};
