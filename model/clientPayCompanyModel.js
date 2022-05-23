const conn = require("../db");
const authTools = require("../utilis/authTools");
const util = require("util");
function clientPayCompanyModel(CPC) {
    this.pid = CPC.pid;
    this.reserve_id=CPC.reserve_id;
    this.Did=CPC.Did;
    this.cost=CPC.cost;
    this.pay_date=CPC.pay_date;

};


clientPayCompanyModel.create = function(CPC) {
    const newCPC = new clientPayCompanyModel(CPC);    
    const  sql = `
    INSERT INTO payment (pid,amount,pay_dir,pay_date) SELECT pid,"${newCPC.cost}","In", "${newCPC.pay_date}"FROM demander WHERE Did = ${newCPC.Did};`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
clientPayCompanyModel.create2 = function(CPC) {
    const newCPC = new clientPayCompanyModel(CPC);    
    const  sql = `
    INSERT INTO demander_pay (pid,reserve_id,Did) SELECT  MAX(pay_id) ,"${newCPC.reserve_id}","${newCPC.Did}" FROM payment;
`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

clientPayCompanyModel.UpdateRes = function(CPC) {
    const newCPC = new clientPayCompanyModel(CPC);    
    const  sql = `UPDATE reservation SET pay_status = 'paid' WHERE reserve_id = ${newCPC.reserve_id};`;// m4t8lt4 bs elba2y e4t8l felproccess Check Query for mistakes
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
 // INSERT INTO demander_pay (eid,pid,reserve_id,Did) VALUES ("${newCPC.eid}", "SELECT MAX(pay_id) FROM payment","${newCPC.reserve_id}","${newCPC.Did}");
 clientPayCompanyModel.findMyLatepay = function (id) {
    const sql = `SELECT * FROM reservation WHERE Did = ${id} AND pay_status = "Not"`;
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}
clientPayCompanyModel.findByReserve_id = function (id) {
    const sql = `SELECT * FROM demander_pay WHERE reserve_id = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}

clientPayCompanyModel.findAll = function () {
    const sql = `SELECT * FROM demander_pay`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);

}
clientPayCompanyModel.findByDid = function (id) {
    const sql = `SELECT * FROM demander_pay WHERE Did = ${id}`
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);


}
//employeePayClientModel.updateById = function() {


//}

//employeePayClientModel.deleteById = function () {


//}




module.exports = clientPayCompanyModel;