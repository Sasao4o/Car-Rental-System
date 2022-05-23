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
carModel.findById = function () {


}

carModel.findAll = function () {
    
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




module.exports = carModel;