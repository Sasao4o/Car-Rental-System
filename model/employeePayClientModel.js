const conn = require("../db");
const authTools = require("../utilis/authTools");
const util = require("util");
function employeePayClientModel(EPC) {
    this.eid = EPC.eid;
    this.pid = EPC.pid;
    this.contra_id=EPC.contra_id;
    this.cost=EPC.cost;


};


employeePayClientModel.create = function(EPC) {
    const newEPC = new employeePayClientModel(EPC);    
    const  sql = `
    INSERT INTO payment (amount,pay_dir,pid) VALUES ("${newEPC.cost}","Out","SELECT pid FROM contract AS c inner join supplier AS s on(c.sid=s.sid) WHERE contra_id = ${newEPC.contra_id}");
    INSERT INTO employee_pay_cont (eid,pid,contra_id) VALUES ("${newEPC.eid}", "SELECT MAX(pay_id) FROM payment","${newEPC.contra_id}");`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
 
employeePayClientModel.findByEid = function (id) {
    const sql = `SELECT * FROM employee_pay_cont WHERE eid = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}
employeePayClientModel.findBycontra_id = function (id) {
    const sql = `SELECT * FROM employee_pay_cont WHERE contra_id = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}

employeePayClientModel.findAll = function () {
    const sql = `SELECT * FROM employee_pay_cont`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);

}

//employeePayClientModel.updateById = function() {


//}

//employeePayClientModel.deleteById = function () {


//}




module.exports = employeePayClientModel;