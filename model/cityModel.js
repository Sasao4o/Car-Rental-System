const conn = require("../db");
const util = require("util");
function cityModel(city) {
    this.name = city.name;
    this.countryName = city.countryName;
    this.cid=city.cid;
}

cityModel.create = function(city) {
    const newCity = new cityModel(city);    
        const  sql = `
        INSERT INTO country (countryname) VALUES ("${newCity.countryname}");
        INSERT INTO city (cname, countryid) VALUES ("${newCity.name}", "SELECT countryid FROM country WHERE countryname ='${newCity.countryname}'");`;
        const queryPromise = util.promisify(conn.query).bind(conn);
        return queryPromise(sql);

}
 
cityModel.findById = function (city) {
    const City = new cityModel(city);    
    const  sql = `SELECT * FROM city WHERE cid = ${City.cid} LIMIT 1;`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

cityModel.findAll = function (city) {
    const City = new cityModel(city);    
    const  sql = `SELECT * FROM city;`;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);
}

cityModel.updateById = function(city) {
    const City = new cityModel(city);    
    const  sql = ` UPDATE city
    SET cname = ${City.name}
    WHERE cid=${City.cid}; `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}

cityModel.deleteById = function (city) {
    const City = new cityModel(city);    
    const  sql = ` DELETE city WHERE cid=${City.cid}; `;
    const queryPromise = util.promisify(conn.query).bind(conn);
    return queryPromise(sql);

}




module.exports = cityModel;