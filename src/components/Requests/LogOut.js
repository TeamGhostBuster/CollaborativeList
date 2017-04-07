module.exports = {
  logout(){
    delete localStorage.token;
    delete localStorage.cl_email;
    window.location.assign('/login')
  },
};
