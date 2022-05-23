const conn = require("../db");
const authTools = require("../utilis/authTools");
const util = require("util");
function userModel(user) {
    //Error Handling 

    //End Error Handling
    this.carCount=user.carCount;
    this.userRole=user.userRole;
    this.pid = user.pid;
    this.firstname = user.firstname;
    this.middlename = user.middlename;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.gender = user.gender;
    this.role = user.role;
    this.cityId = user.cityId;
    this.phoneNumber = user.phoneNumber;
    this.visaNo = user.visaNo;
    this.enrolled_date=user.enrolled_date;
   
}


userModel.create = function(user) {
     //Hash My Password
    const hashedPw = authTools.hashPassword(user.password);
    user.password = hashedPw;
 
    //End Hashing
    const newUser = new userModel(user);  
    const userRole =newUser.userRole;
    var sql="";  
     sql =
      `INSERT INTO person (fname,mname,lname,email,gender,role,cid,mobileno, PASSWORD, BankNo) VALUES 
    ('${newUser.firstname}', '${newUser.middlename}','${newUser.lastname}', '${newUser.email}', '${newUser.gender}', 
        '${newUser.role}', '${newUser.cityId}','${newUser.phoneNumber}','${newUser.password}','${newUser.visaNo}');
        `;
    
    // INSERT INTO demander (pid) VALUES('SELECT MAX(pid) FROM person');
    // INSERT INTO supplier (pid,car_count) VALUES("SELECT MAX(pid) FROM person",'${newUser.carCount}');
        const queryPromise = util.promisify(conn.query).bind(conn);
        //Bind To Make This inside promisify Refer to conn
        return queryPromise(sql);
    
}
userModel.createDemanderOrSupplierOrEmp = function(user) {
    //Hash My Password
   //End Hashing
   const newUser = new userModel(user);  
   const userRole =newUser.userRole;
   var sql="";  
   if(userRole=="Demander"){
    sql =
     `INSERT INTO demander(pid) SELECT MAX(pid) FROM person LIMIT 1; `;
   }
   else if (userRole=="Supplier"){
    sql =
    `INSERT INTO supplier(pid) SELECT MAX(pid),'${newUser.carCount}' FROM person LIMIT 1; `;
   }
   else{

    sql =
    `INSERT INTO employee (salary,enrolled_date,POSITION,In_Work,pid) SELECT MAX(pid),"2000","${newUser.enrolled_date}","N/A","Free",'${newUser.carCount}' FROM person; `;


   }
   // INSERT INTO demander (pid) VALUES('SELECT MAX(pid) FROM person');
   // INSERT INTO supplier (pid,car_count) VALUES("SELECT MAX(pid) FROM person",'${newUser.carCount}');
       const queryPromise = util.promisify(conn.query).bind(conn);
       //Bind To Make This inside promisify Refer to conn
       return queryPromise(sql);
   
}


userModel.findById = function (id) {
    const sql = `SELECT * FROM person WHERE pid = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);

}

userModel.find = function(conditionsObject) {
   let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ' AND ';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`
}
    const sql = `SELECT * FROM person WHERE ${conditions}`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}
userModel.findAll = function () {
    const sql = `SELECT * FROM person `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

userModel.findPayByPeriod = function (start_date,end_date) {
    const sql = `SELECT * FROM payment WHERE pay_date BETWEEN '${start_date}' AND '${end_date}' `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
userModel.updateById = function(id,conditionsObject) {
    let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ' AND ';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`
}
    const sql = `UPDATE  person SET ${conditions} WHERE pid = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}

userModel.deleteById = function (id) {    
    const  sql = ` DELETE * FROM demander WHERE pid = ${id};
    DELETE * FROM person WHERE pid = ${id} ;
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}




module.exports = userModel;