module.exports = {
  delete: function (listId, articleId, callback) {
    let Axios = require('axios');
    let cookie = require('react-cookie');
    const token = cookie.load("Access-Token");
    const host = "https://api.vfree.org";
    const path = '/user/list/' + listId + '/article/' + articleId;


    let http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token": token},
    });

    http.delete(path)
      .then(
        (respond) => {
          callback()
        }
      )
      .catch(
        (err) => {
          console.log(err);
          if (err.status === 401) {
            console.log("invalid token");
          } else {
            console.log("invalid request of lists info");
          }
        })
  }

};
