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




module.exports = reservationModel;