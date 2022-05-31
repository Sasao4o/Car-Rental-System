const conn = require("../db");
const reportAndSearchModel = {};
const demanderModel = require("./demanderModel");
const userModel = require("./userModel");
const reservationModel = require("./reservationModel");
const util = require("util");
reportAndSearchModel.search = function (conditionsObject) {
    let conditions = "";
    var counter = 1;
 for (const property in conditionsObject) { 
     if(!conditionsObject[property] || conditionsObject[property].toLowerCase() == "any")
     {
        continue;
     } else {
       if (counter > 1) {
        conditions += ' AND ';
       }
     }
     counter++;
   conditions += `temp.${property} = '${conditionsObject[property]}'`
 }
      const sql = `SELECT * FROM ( 
        SELECT person.fname,person.email, person.mobileno, c.plate_no, c.model, c.Status, c.cond , res.startDate, res.EndDate, res.pay_status, res.reserve_status,res.reserve_date FROM reservation as res LEFT JOIN car as c 
            ON res.car_id = c.car_id 
                LEFT JOIN demander as dem
                ON dem.Did = res.Did
                LEFT JOIN person 
                ON person.pid = dem.pid
          UNION
              SELECT person.fname,person.email, person.mobileno, c.plate_no, c.model, c.Status, c.cond , res.startDate, res.EndDate, res.pay_status, res.reserve_status,res.reserve_date FROM reservation as res RIGHT JOIN car as c 
            ON res.car_id = c.car_id 
                RIGHT JOIN demander as dem
                ON dem.Did = res.Did
                LEFT JOIN person 
                ON person.pid = dem.pid) as temp
                WHERE ${conditions}`;
  console.log(conditions);
     const queryPromise = util.promisify(conn.query).bind(conn);
   
     return queryPromise(sql);

}

reportAndSearchModel.findAllByPeriod = function (start_date,end_date) {   
  const  sql = `SELECT * FROM reservation AS r INNER JOIN demander AS d INNER JOIN person AS p INNER JOIN car AS c on( r.Did = d.Did AND r.car_id = c.car_id AND d.pid = p.pid) WHERE r.reserve_date BETWEEN '${start_date}' AND '${end_date}' GROUP BY r.reserve_id;`;
  const queryPromise = util.promisify(conn.query).bind(conn);
  return queryPromise(sql);

  
}
module.exports = reportAndSearchModel;