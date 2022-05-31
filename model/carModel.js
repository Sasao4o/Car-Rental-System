const conn = require("../db");
const util = require("util");
function carModel(car) {
    this.model = car.model;
    this.plate_no = car.plate_no;
    this.status = car.status;
    this.cond = car.cond;
    this.warehouse_id = car.warehouse_id;

    this.name = car.name;

}
carModel.create = function(car) {

    const newCar = new carModel(car);    
        const  sql = `INSERT INTO car(NAME, model, plate_no, Status, cond, warehouse_id) 
        VALUES ("${newCar.name}", "${newCar.model}", "${newCar.plate_no}", "${newCar.status}", "${newCar.cond}", "${newCar.warehouse_id}")`;
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);
}
    carModel.find = function(conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) {
     if (counter > 1) {
         conditions += ' AND ';
     }
     counter++;
   conditions += `${property} = '${conditionsObject[property]}'`
 }
     const sql = `SELECT * FROM car WHERE ${conditions}`;
     const queryPromise = util.promisify(conn.query).bind(conn);
     return queryPromise(sql);
 }
carModel.findById = function (id) {
    const sql = `SELECT * FROM car WHERE car_id = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

        

}

carModel.findAll = function () {
    const  sql = `SELECT * FROM car`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}

carModel.updateById = function(id,conditionsObject) {
    let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ',';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`;
  
}
    const sql = `UPDATE  car SET ${conditions} WHERE car_id = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}


carModel.deleteById = function () {


}


carModel.findAllCarByPeriod = function (plate_no,startDate,endDate) {   
    const  sql = `SELECT r.reserve_date,r.startDate,r.endDate,r.reserve_status,r.pay_status,c.NAME,c.model,c.plate_no,c.cond FROM reservation AS r INNER JOIN car AS c on( r.car_id = c.car_id ) WHERE c.plate_no = '${plate_no}' AND r.reserve_date BETWEEN '${startDate}' AND '${endDate}'GROUP BY r.reserve_id;`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

    
}
carModel.findStatAll = function (day) {
    const sql = `
    SELECT C.car_id ,C.model, "active" 
    FROM car C LEFT JOIN reservation R ON C.car_id = R.car_id
    WHERE startDate IS NULL OR '${day}' NOT BETWEEN reserve_date and EndDate
    UNION
    SELECT C1.car_id ,C1.model, "reserved" 
    FROM car C1 LEFT JOIN reservation R1 ON C1.car_id = R1.car_id
    WHERE '${day}' BETWEEN reserve_date and EndDate
    GROUP BY C1.car_id;
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}
module.exports = carModel;