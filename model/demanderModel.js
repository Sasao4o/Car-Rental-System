const conn = require("../db");
const util = require("util");
function demanderModel(demander) {
    this.pid = demander.person_id;
}


demanderModel.create = function(demander) {
     const newDemander = new demanderModel(demander);    
     const sql = `INSERT INTO demander(pid) VALUES ("${newDemander.pid}")`;
         const queryPromise = util.promisify(conn.query).bind(conn);
         //Bind To Make This inside promisify Refer to conn
         return queryPromise(sql);

}
demanderModel.find = function(conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) {
     if (counter > 1) {
         conditions += ' AND ';
     }
     counter++;
   conditions += `${property} = '${conditionsObject[property]}'`
 }
     const sql = `SELECT * FROM demander WHERE ${conditions}`;
     const queryPromise = util.promisify(conn.query).bind(conn);
     return queryPromise(sql);
 }
demanderModel.findById = function () {


}

demanderModel.findAll = function () {

}

demanderModel.updateById = function() {


}

demanderModel.deleteById = function () {


}




module.exports = demanderModel;