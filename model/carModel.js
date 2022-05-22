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
        VALUES ("${newCar.name}", "${newCar.model}", "${newCar.plate_no}", "${newCar.status}", "${newCar.cond}", "SELECT warehouse_id FROM warehouse where Avail_capacity>0 LIMIT 1")`;
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);
}
 
carModel.find = function (conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) {
     if (counter > 1) {
         conditions += ' AND ';
     }
     counter++;
   conditions += `'${property}' = '${conditionsObject[property]}'`
 }
     const sql = `SELECT * FROM car WHERE ${conditions}`;
     const queryPromise = util.promisify(conn.query).bind(conn);
     return queryPromise(sql);

}

carModel.findAll = function () {
    const sql = `SELECT * FROM car `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}

carModel.updateById = function(id,conditionsObject) {
    let conditions = "";
   var counter = 1;
for (const property in conditionsObject) {
    if (counter > 1) {
        conditions += ' AND ';
    }
    counter++;
  conditions += `${property} = '${conditionsObject[property]}'`
}
    const sql = `UPDATE  car SET ${conditions} WHERE cid = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}

carModel.delete= function (car) {
    const Car = new carModel(car);
    const  sql = `DELETE * FROM car WHERE plate_no = ${Car.plate_no} ; `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}




module.exports = carModel;