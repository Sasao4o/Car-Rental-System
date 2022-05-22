const conn = require("../db");
const util = require("util");
function contractModel(contract) {

this.contra_id=contract.contra_id;
this.sid=contract.sid;
this.car_id=contract.car_id;
this.cost=contract.cost;
this.status=contract.status;
this.start_date=contract.start_date;
this.end_date=contract.end_date;


};


contractModel.create = function(contract) {
    const newCont = new contractModel(contract);    
    const  sql = `INSERT INTO contract(sid, car_id, cost, Status, start_date, end_date) 
    VALUES ("${newCont.sid}", "${newCont.car_id}", "${newCont.cost}", "${newCont.status}", "${newCont.start_date}", "${newCont.end_date}")`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}
 
contractModel.findById = function (id) {
    const sql = `SELECT * FROM contract WHERE contra_id = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
contractModel.find4Sid = function (id) {
    const sql = `SELECT * FROM contract WHERE sid = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
contractModel.find4CarId = function (id) {
    const sql = `SELECT * FROM contract WHERE car_id = ${id}`
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);


}
contractModel.findAll = function () {
    const sql = `SELECT * FROM contract `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}

contractModel.updateCarId = function(contract) {
    const Contract = new contractModel(contract);    
    const  sql = ` UPDATE contract
    SET car_id = ${Contract.car_id}
    WHERE sid=${Contract.sid}; `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

contractModel.deleteById = function (id) {
    const  sql = ` 
    DELETE * FROM contract WHERE contra_id = ${id} ;
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

contractModel.ExpellSupplier = function (id) {
    const  sql = ` 
    DELETE * FROM contract WHERE sid = ${id} ;
    `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}




module.exports = contractModel;