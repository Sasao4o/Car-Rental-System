

 const logout = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/user/signout'
      });
      if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
      console.log(err);
    
    }
  };
const logOutButton = document.getElementById("aLogout");

logOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
})