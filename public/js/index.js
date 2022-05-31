 
//This Page is Responsible For DOM maniuplation
const addCar = async (model, plate_no, cond, warehouse_id, name = "default") => {
  try {
    
    const res = await axios({
      method: 'POST',
      url: `/api/v1/car`,
      data:{
        model,
        plate_no,
        cond,
        warehouse_id,
        name
      }
    });
    console.log(res);
    if (res.data.message === 'success') {
      alert("Car Is ADDED");
      window.setTimeout(() => {
        location.reload(true)
      }, 800);
    } 
  } catch (err) {
      console.log(err);
      alert("Please Fill Form Correctly");
  }
};

const signUp = async(fName,mName ,lName, g, phoneNumber, emailR, passwordR) => {
  try {
    
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/register',
      data: {
       
          firstname: fName,
          middlename: mName,
          lastname : lName,
          email : emailR,
          password : passwordR,
          gender : g,
          cityId:"5",
          phoneNumber:phoneNumber,
          visaNo:12345,
          userRole:"demander"
          
      }
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 800);
    } 
  } catch (err) {
    console.log(err);
    alert("Please Enter Valid Information");
  }
};

const terminate = async (reservationId) => {
  try {
    
    const res = await axios({
      method: 'POST',
      url: `/api/v1/reservation/${reservationId}/reserve`,
      
    });
    console.log(res);
    if (res.data.message === 'success') {
      window.setTimeout(() => {
        alert("Your Reservation is Done...")
        location.assign('/');
      }, 800);
    } 
  } catch (err) {
      console.log(err);
      alert("Can't Reserve Car Now");
      location.assign('/');

  }
};


const reserve = async (carId,startDate,endDate) => {
  try {
    
    const res = await axios({
      method: 'POST',
      url: '/api/v1/reservation',
      data: {
         startDate,
         endDate,
         car_id:carId
      }
    });
    console.log(res.data);
    if (res.data.message === 'success') {
      window.setTimeout(() => {
        alert("Your Reservation is Done...")
        location.assign('/');
      }, 800);
    } 
  } catch (err) {
      console.log(err);
      alert("Can't Reserve Car Now");
      location.assign('/');

  }
};

 
 const login = async (email, password, role) => {
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
    console.log(res.data);
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 800);
    } 
  } catch (err) {
    
         if (err.response.data.status.toLowerCase() === "failed") {
            alert("Please Enter Correct Email and Password");
         }
  }
};

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

const getWareHouse = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/warehouse'
    });
  
    if ((res.data.status = 'success')) {
      return res.data.warehouses;
    }
  } catch (err) {
    console.log(err);
  
  }
};

const updateStatus = async (id, status) => {
  try {
  
    const res = await axios({
      method: 'POST',
      url: '/api/v1/car/update',
      data: {
        id,
        status
      }
    });
  
    if ((res.data.status = 'success')) {
      console.log(res.data);
        if (res.data.updatedCount > 0) {
          alert("Update Done Sucessfully....");
        } else {
          alert("No Update Can be Done");
        }
    }
  } catch (err) {
    console.log(err);
  
  }
};
const advancedSearch = async (clientName, clientEmail, mobileNumber, carPlate, carModel, carCondition, startDate, endDate, reservationDate, reservationStatus ,carPaid) => {
  try {
  console.log(clientEmail);
    const res = await axios({
      method: 'POST',
      url: '/search/results',
      data: {
        clientName:clientName,
        clientEmail:clientEmail,
        mobileNumber:mobileNumber,
        carPlate:carPlate,
        carModel:carModel,
        carCondition:carCondition ,
        startDate:startDate,
        endDate:endDate,
        reservationDate:reservationDate,
        reservationStatus:reservationStatus,
        carPaid:carPaid
      }
    });
  
    if ((res.data.status = 'success')) {
      createTable(res.data.result);
    }
  } catch (err) {
    console.log(err);
  
  }
};

const loginForm = document.getElementById("login-form");
 const email = document.getElementById("email");
 const password = document.getElementById("password");
 const roles = document.getElementsByName('role');
 
 
 if (loginForm) {
     loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            var role;
            for(var i = 0; i < roles.length; i++){
                if(roles[i].checked){
                 role = roles[i].value;
           
                 
                }
            }
        login(email.value,password.value, role)
        
     });
 }
 const signOutButton = document.getElementById("signout");
 if (signOutButton) {
 
 
 signOutButton.addEventListener("click", (e) => {
 
    e.preventDefault();
    logout();
  
 });
}


function get(name){
  if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
     return decodeURIComponent(name[1]);
}

const reserveButton = document.getElementById("reserveButton");
if(reserveButton) {
reserveButton.addEventListener("click" , (e) => {
  e.preventDefault();   0
  const queryString = window.location.pathname.split("/")[2];
  const endDate =document.getElementById("checkout-date").value;
  const startDate = document.getElementById("checkin-date").value;
  if (!endDate || !startDate) {
    alert("Enter start and end date");
    return;
  }
  
  reserve(queryString,startDate,endDate);



});
}


let btns = document.querySelectorAll(".btn-class");

btns.forEach(btn => {

  
   btn.addEventListener('click', (event)=> {
     terminate(btn.id);
   
   });

  });
const signUpButton = document.getElementById("signUp-button");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();


});
}
 function handleSignUp() {
 
  const fName = document.getElementById("fname");
  const mName = document.getElementById("mname");
  const lName = document.getElementById("lname");
  const gender = document.querySelector('input[name="gender"]:checked').value;
  var genders = document.getElementsByName('gender');
  var g;
  for(var i = 0; i < genders.length; i++){
      if(genders[i].checked){
          g = genders[i].value;
      }
  }
  
  const phoneNumber = document.getElementById("mobileno");
  const emailR = document.getElementById("email");
  const passwordR = document.getElementById("password");  
  if (!fName || !mName || !lName || !gender || !phoneNumber || !emailR || !passwordR) {
    alert("Please Fill The Whole Form");
  }
  
 
  signUp(fName.value,mName.value ,lName.value, g, phoneNumber.value, emailR.value, passwordR.value)
 }

 if (signUpButton) {
 signUpButton.addEventListener("click", () => {handleSignUp()})
 }


 const carForm = document.getElementById("car-form");
 if (carForm) {
  const carPlate = document.getElementById("carPlate");
  const carModel = document.getElementById("carModel");
  const carCondition = document.getElementById("carCondition");
    const warehouse = document.getElementById("dropdown");
   async function x() {
  const whs = await getWareHouse();
  console.log(whs);
   
   whs.forEach(v => {
   const newOption = document.createElement('option');
  const warehouseName = document.createTextNode(`${v.location}`);
  newOption.appendChild(warehouseName);
  newOption.setAttribute('id',`${v.warehouse_id}`);
  warehouse.appendChild(newOption);
   });
   
 
 
   }
   x();
   carForm.addEventListener("submit", (e) => {
      e.preventDefault();
     
   addCar(carModel.value, carPlate.value, carCondition.value,warehouse[warehouse.selectedIndex].id);
   });
 }

 const carStatusChange = document.getElementById("carstatuschange");
 
 if (carStatusChange) {
  const carId = document.getElementById("carId");
  const carStatus = document.getElementById("carStatus");
 
  carStatusChange.addEventListener("submit", (e) => {
    e.preventDefault();
   updateStatus(carId.value, carStatus.value);
  })
 }


 const advancedSearchForm = document.getElementById("searchForm");
if (advancedSearchForm) {
  const clientName = document.getElementById("clientName");
  const clientEmail = document.getElementById("clientEmail");
  const mobileNumber = document.getElementById("mobileNumber");
  const carPlate = document.getElementById("carPlate");
  const carModel = document.getElementById("carModel");
  const carCondition = document.getElementById("carCondition");
  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");
  const reservationDate = document.getElementById("res-date");
  const reservationStatus = document.getElementById("reservationStatus");
  const carPaid = document.getElementById("carPaid");
  advancedSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    advancedSearch(clientName.value, clientEmail.value, mobileNumber.value, carPlate.value, carModel.value, carCondition.value, startDate.value, endDate.value, reservationDate.value, reservationStatus.value ,carPaid.value);
    
    /*
    console.log(clientName);
    console.log(clientEmail);
    console.log(mobileNumber);
    console.log(carPlate);
    console.log(carModel);
    console.log(startDate);
    console.log(endDate);
    console.log(reservationDate);
    console.log(reservationStatus);
    console.log(carPaid);
 */ 
  });
 

}
function createTable(results) {
  let myTable = document.getElementById('table');
  myTable.innerHTML = "";
  let headers = ['Name', 'Email', 'mobileno', 'plate_no', 'model', 'Status', 'cond','startDate','endDate', 'pay_status', 'reserve_status', 'reserve_date'];
 
      let table = document.createElement('table');
      let headerRow = document.createElement('tr');
      headers.forEach(headerText => {
          let header = document.createElement('th');
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
      });
      table.appendChild(headerRow);
      results.forEach(emp => {
          let row = document.createElement('tr');
          Object.values(emp).forEach(text => {
              let cell = document.createElement('td');
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);
          })
          table.appendChild(row);
      });
      myTable.appendChild(table);
 
  

}