const conn = require("../db");
const authTools = require("../utilis/authTools");
const util = require("util");
function employeePayClientModel(CPC) {
    this.eid = CPC.eid;
    this.pid = CPC.pid;
    this.reserve_id=EPC.reserve_id;
    this.Did=EPC.Did;
    this.cost=EPC.cost;


};


employeePayClientModel.create = function(CPC) {
    const newCPC = new employeePayClientModel(CPC);    
    const  sql = `
    INSERT INTO payment (amount,pay_dir,pid) VALUES ("${newCPC.cost}","In","SELECT pid FROM reservation AS r inner join demander AS d on(r.Did=d.Did) WHERE reserve_id = ${newCPC.reserve_id}");
    INSERT INTO demander_pay (eid,pid,reserve_id,Did) VALUES ("${newCPC.eid}", "SELECT MAX(pay_id) FROM payment","${newCPC.reserve_id}","${newCPC.Did}");`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
 
employeePayClientModel.findByEid = function (id) {
    const sql = `SELECT * FROM demander_pay WHERE eid = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}
employeePayClientModel.findByReserve_id = function (id) {
    const sql = `SELECT * FROM demander_pay WHERE reserve_id = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}

employeePayClientModel.findAll = function () {
    const sql = `SELECT * FROM demander_pay`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);

}

//employeePayClientModel.updateById = function() {


//}

//employeePayClientModel.deleteById = function () {


//}




module.exports = employeePayClientModel;