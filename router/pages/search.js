const express = require('express')
const app = express()
const sqlite3 = require("sqlite3")
const router = express.Router()
// const db = require('../../server/database/database')

try{
    router.get('/', (req, res)=>{
        res.render('../views/search.ejs', {data: " ", message: "SEARCH"})
    })
    
    router.post('/', async(req, res)=>{
        console.log(req.body)
        let sql

        if(req.body.nested == "itemAvgP"){
            sql = `SELECT * FROM Item WHERE price > (SELECT AVG(price) FROM Item);`
            let rows = await sqliteAll(sql);

            res.render('../views/search.ejs', {data: "a", message: "SEARCH", rows: rows})
        }else if (req.body.nested == "itemAvgW"){
            sql = `SELECT * FROM Item WHERE weight > (SELECT AVG(weight) FROM Item);`
            let rows = await sqliteAll(sql);

            res.render('../views/search.ejs', {data: "a", message: "SEARCH", rows: rows})
        }else if (req.body.nested == "fifty"){
            sql=`SELECT * FROM Customer WHERE Customer_id IN 
                (SELECT DISTINCT Customer_id FROM Orders JOIN Order_detail ON Orders.Order_id = Order_detail.Order_id WHERE price > 50);`
                
            let rows = await sqliteAll(sql);

            res.render('../views/search.ejs', {data: "b", message: "SEARCH", rows: rows})
        }else if (req.body.nested == "nameMatch"){
            sql=`SELECT * FROM Customer WHERE Customer_id IN (SELECT Customer_id  FROM CUSTOMER WHERE last_name LIKE 'S%h')`
            console.log("fired")
            let rows = await sqliteAll(sql);
            res.render('../views/search.ejs', {data: "b", message: "SEARCH", rows: rows})
        }
        
    })
}catch(err){
    console.log("Error Search")
}


async function sqliteRun(sql, parameters) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database();
        database.serialize();
        database.run(sql, parameters, function(error, rows) {
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


// List 
async function sqliteAll(sql, msg) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database("Shop.db");
        database.serialize();
        database.all(sql, function(error, rows) {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
        console.log(msg + " SUCCESS!")
        database.close();
    });

    let result = await promise;
    return result;
}

// export 
module.exports = router