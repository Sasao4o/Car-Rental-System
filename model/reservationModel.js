// lazem naddd status llreservation "On","Terminated" "DONNNNNNNEEE"
const conn = require("../db");
const util = require("util");
function reservationModel(reserve) {
    this.Did = reserve.Did;
    this.startDate = reserve.startDate;
    this.EndDate = reserve.EndDate;
    this.car_id = reserve.car_id;
    this.Eid = reserve.Eid;
    this.CarStatus = reserve.CarStatus;
    this.reserve_status=reserve.reserve_status;
    this.reserve_date=reserve.reserve_date;
};


reservationModel.create = function(reserve) {
    const newreserve = new reservationModel(reserve);    
    const  sql = ` INSERT INTO reservation (Did, startDate, EndDate, car_id, Eid, reserve_status, reserve_date) 
    VALUES ("${newreserve.Did}", "${newreserve.startDate}", "${newreserve.EndDate}", "${newreserve.car_id}", "${newreserve.Eid}","On","${newreserve.reserve_date}");
    UPDATE car SET Status = 'reserved' WHERE car_id = ${newreserve.car_id};
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
 
reservationModel.findCarRsrv = function (plate_no) {   
    const  sql = `SELECT * FROM reservation WHERE car_id = (SELECT car_id FROM car WHERE plate_no = '${plate_no}');`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}

reservationModel.findEmpRsrv = function (id) {   
    const  sql = `SELECT * FROM reservation WHERE Eid = '${Eid}';`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
reservationModel.findCusRsrv = function (id) {   
    const  sql = `SELECT * FROM reservations WHERE Did = '${id}';`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
reservationModel.findAll = function () {
   const sql = `SELECT * FROM reservation `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}

reservationModel.updateByEId = function(IdOld,IdNew) {
    const sql = `UPDATE  reservation SET Eid = ${IdNew} WHERE Eid = ${IdOld}`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
reservationModel.TerminateCarRsrv = function (plate_no,car_status) {   
    const  sql = `UPDATE  reservation SET reserve_status = "Terminated" WHERE car_id = (SELECT car_id FROM car WHERE plate_no = '${plate_no}') AND reserve_status = "On";
    UPDATE car SET Status = "${car_status}" WHERE plate_no = '${plate_no}';
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}

// Lazm ntklm eih eli 7y7sl llreserves eli 5lst hl nktfy enna n5leha terminated wla n4elha 5als we dah 7l la ad3mo
// 7age tania lw 3ayzen ytm elupdate automatic "3n tre2 eltaree5 y3ny" HHHHHOOOOOOOOWWWWW???????
//reservationModel.deleteById = function () {


//}




module.exports = reservationModel;