const conn = require("../db");
const util = require("util");
function reservationModel(reserve) {
    this.Did = reserve.Did;
    this.startDate = reserve.startDate;
    this.EndDate = reserve.EndDate;
    this.car_id = reserve.car_id;
    this.Eid = reserve.Eid;
    this.reserve_status=reserve.reserve_status;
    this.reserve_date=reserve.reserve_date;
    this.pay_status=reserve.pay_status;
};   



reservationModel.create = function(reservation) {
    reservation.reserve_date = new Date().toISOString().slice(0, 10);
    reservation.pay_status = "Not";
    const newReservation = new reservationModel(reservation);    
    const  sql = ` INSERT INTO reservation  (Did, startDate, EndDate, car_id, Eid, reserve_status, reserve_date ,pay_status) 
                    VALUES ("${newReservation.Did}", "${newReservation.startDate}", "${newReservation.EndDate}", "${newReservation.car_id}", "${newReservation.Eid}", "On", "${newReservation.reserve_date}", "${newReservation.pay_status}") `
    
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
reservationModel.find = function(conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) {
     if (counter > 1) {
         conditions += ' AND ';
     }
     counter++;
   conditions += `${property} = '${conditionsObject[property]}'`
 }
     const sql = `SELECT * FROM reservation WHERE ${conditions}`;
     const queryPromise = util.promisify(conn.query).bind(conn);
     return queryPromise(sql);
 }
reservationModel.findById = function (reservationId) {
    const  sql = `SELECT * FROM reservation WHERE reserve_id = '${reservationId}';`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
reservationModel.findAll = function () {
    const  sql = `SELECT * FROM reservation`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}
reservationModel.updateById = function(reservationId , updateObject) {
    let conditions = "";
    var counter = 1;
 for (const property in updateObject) {
     if (counter > 1) {
         conditions += ',';
     }
     counter++;
   conditions += `${property} = '${updateObject[property]}'`;
    }
    const  sql = ` UPDATE reservation SET ${conditions} WHERE reserve_id = ${reservationId}`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

reservationModel.deleteById = function () {


}


reservationModel.findAllByPeriod = function (start_date,end_date) {   
    const  sql = `SELECT r.reserve_date,r.startDate,r.endDate,r.reserve_status,r.pay_status,c.NAME,c.model,c.plate_no,c.cond,p.fname,p.lname,p.email,p.gender,p.mobileno,p.BankNo FROM reservation AS r INNER JOIN demander AS d INNER JOIN person AS p INNER JOIN car AS c on( r.Did = d.Did AND r.car_id = c.car_id AND d.pid = p.pid) WHERE r.reserve_date BETWEEN '${start_date}' AND '${end_date}' GROUP BY r.reserve_id`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

    
}
reservationModel.findCusRsrv = function (id) {   
    const  sql = `SELECT fname, lname, email, mobileno, reserve_id, startDate, EndDate, plate_no,model, pay_status FROM reservation AS r INNER JOIN demander AS d INNER JOIN person AS p INNER JOIN car AS c on( r.Did = d.Did AND r.car_id = c.car_id AND d.pid = p.pid) WHERE d.Did = '${id}' GROUP BY d.Did;`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
module.exports = reservationModel;