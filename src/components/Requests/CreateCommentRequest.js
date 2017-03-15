module.exports = {
  post: function (articleId, dataObject, callback) {
    let Axios = require('axios');
    let cookie = require('react-cookie');

    const host = "https://api.vfree.org";
    const token = cookie.load('Access-Token');
    const path = '/article/'+articleId+'/comment';

    let http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {
        "Access-Token":token,
        "Content-Type":"application/json",
      }
    });

    http.post(path, dataObject)
      .then((respond) =>{
          callback();
      })
      .catch((err) => {
        console.log(err);
        if (err.status===401){
          console.log("invalid token");
        } else {
          console.log("invalid request of lists info1111");
        }
      })
  }

};
