/* eslint-disable */
import axios from 'axios';
 
console.log(axios);
export const login = async (email, password, role) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user',
      data: {
        email,
        password,
        role
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err);
  
  }
};

let btns = document.querySelectorAll(".btn-class");

btns.forEach(btn => {
  console.log(btn);
   btn.addEventListener('click', (event)=> {
    alert("Love");
   
   });

  });