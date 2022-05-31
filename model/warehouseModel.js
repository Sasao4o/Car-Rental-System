const conn = require("../db");
const util = require("util");
 
 
function warehouseModel(warehouse) {
    //Error Handling 

    //End Error Handling
    this.warehouse_id = warehouse.warehouse_id;
    this.avalCapacity = warehouse.avalCapacity;
    this.location = warehouse.location;
    this.cityId = warehouse.cityId;
    
   
}
warehouseModel.create = function() {


}
warehouseModel.getWareHouseCapacityById = function(id) {


    
}
 
warehouseModel.findById = function (id) {
    const sql = `SELECT * FROM warehouse WHERE warehouse_id = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

warehouseModel.findAll = function () {
    const  sql = `SELECT * FROM warehouse`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}
 
warehouseModel.updateById = function() {


}

warehouseModel.deleteById = function () {


}




module.exports = warehouseModel;