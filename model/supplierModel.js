const conn = require("../db");
const util = require("util");
function supplierModel(supplier) {
    this.car_count = supplier.car_count;
    this.pid = supplier.person_id;
}


supplierModel.create = function(supplier) {
     supplier.car_count = 0;
     const newSupplier = new supplierModel(supplier);    
     const sql = `INSERT INTO supplier(pid, car_count) VALUES (${newSupplier.pid}, 0)`;
         const queryPromise = util.promisify(conn.query).bind(conn);
         //Bind To Make This inside promisify Refer to conn
         return queryPromise(sql);

}
 
supplierModel.findById = function () {


}

supplierModel.findAll = function () {

}

supplierModel.updateById = function() {


}

supplierModel.deleteById = function () {


}




module.exports = supplierModel;