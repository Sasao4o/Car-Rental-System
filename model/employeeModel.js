const conn = require("../db");
const util = require("util");
function employeeModel(employee) {
    this.salary = employee.salary;
    this.enrolled_date = employee.date;
    this.position = employee.POSITION;
    this.In_Work = employee.In_Work;
    this.person_id = employee.pid;
}


employeeModel.create = function(employee) {
    employee.enrolled_date = new Date().toISOString().slice(0, 10);
        const newEmployee = new employeeModel(employee);    
        const sql = `INSERT INTO employee (salary,enrolled_date,POSITION,In_Work,pid) VALUES 
        ('${newEmployee.salary}', '${newEmployee.enrolled_date}','${newEmployee.position}', '${newEmployee.In_Work}' , '${newEmployee.person_id}')`;
            const queryPromise = util.promisify(conn.query).bind(conn);
            //Bind To Make This inside promisify Refer to conn
            return queryPromise(sql);

}
employeeModel.find = function(conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) {
     if (counter > 1) {
         conditions += ' AND ';
     }
     counter++;
   conditions += `${property} = '${conditionsObject[property]}'`
 }
     const sql = `SELECT * FROM employee WHERE ${conditions}`;
     const queryPromise = util.promisify(conn.query).bind(conn);
     return queryPromise(sql);
 }
employeeModel.findById = function () {


}

employeeModel.findAll = function () {

}

employeeModel.updateById = function(id,conditionsObject) {
    let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ',';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`;
  
}
    const sql = `UPDATE  employee SET ${conditions} WHERE eid = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
employeeModel.deleteById = function () {


}




module.exports = employeeModel;