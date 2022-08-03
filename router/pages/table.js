const express = require('express')
// const morgan = require('morgan')
const router = express.Router()
// const db = require('../../server/database/database')
const sqlite3 = require("sqlite3")

router.get('/', async(req, res)=>{
    // before rendering, we have to print out all DBases
    let sql = `SELECT * FROM Customer;`
    let isql = `SELECT * FROM Item;`
    let or = `SELECT * FROM Orders;`
    let od = `SELECT * FROM Order_detail;`

    let crows = await sqliteAll(sql)
    let irows = await sqliteAll(isql)
    let orders = await sqliteAll(or)
    let odetail = await sqliteAll(od)

    res.render('../views/index', {crows: crows, irows: irows, orders:orders, odetail: odetail})
})



async function sqliteAll(sql) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database("Shop.db");
        database.serialize();
        database.all(sql, function(error, rows) {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
        database.close();
    });

    let result = await promise;
    return result;
}







// export 
module.exports = router