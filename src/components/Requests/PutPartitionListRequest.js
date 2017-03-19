var Axios = require('axios');
var cookie = require('react-cookie');
const token = cookie.load('Access-Token');
const host = 'https://api.vfree.org';

module.exports={
  put: function (listId, newListName, articles, callback) {

    let http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token":token},
    });

    const path = "/user/list/"+listId+"/partition";
    http.put(path, {name:newListName, articles:articles})
      .then((respond)=>{
        callback(respond.data);
      })
  }
};
