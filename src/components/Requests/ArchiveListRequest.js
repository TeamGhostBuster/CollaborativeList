module.exports = {
  delete: function (listId, group, groupId, callback) {
    let Axios = require('axios');
    let cookie = require('react-cookie');
    const token = cookie.load("Access-Token");
    const host = "https://api.vfree.org";

    let http = Axios.create({
      baseURL: host,
      responseType: "json",
      headers: {"Access-Token":token}
    });

    const path = group==='true' ? '/group/list/'+listId+'/archive': '/user/list/'+listId+'/archive';

    const body = group==='true' ? {data: {group_id: groupId}} : {};

    http.delete(path, body)
      .then(
        (respond)=> {
          callback();
        }
      )


  }
};
