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
 
carModel.findById = function () {


}

carModel.findAll = function () {

}

carModel.updateById = function() {


}

carModel.deleteById = function () {


}




module.exports = carModel;