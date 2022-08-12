const express = require('express')
const router = express.Router()
// const db = require('../../server/database/database')
const sqlite3 = require("sqlite3")





/*
    RENDER INSERT FORM
    HANDLE POST REQUEST
 */
try{
    // RENDER INSERT FORM WITH POST METHOD
    router.get('/insert', (req, res)=>{
        res.render('../views/forms/customer_form', {task: "insert", id: " ", method: "POST", where: "INSERT into CUSTOMER", action:"/customer/insert"})
    })

    // TAKE CARE OF POST FROM INSERT
    router.post('/insert', async(req, res)=>{
        await insertINTO(req.body)
        res.render('../views/forms/customer_form', {task: "insert", id: " ", method: "POST", where: "INSERT into CUSTOMER", action:"/customer/insert"})
    })
}catch(err){
    console.error("Catch error on INSERT into customers")
}



/*
    RENDER UPDATE FORM
    HANDLE PUT REQUEST
 */

try{
    router.get('/update', (req, res)=>{
        // res.send("Customer HOME")
        res.render('../views/forms/customer_form', {task: "update", id: " 1 ", method: "POST", where: "UPDATE on CUSTOMER", action:"/customer/update"})
    })
    
    // will render customer_form to get the information as INSERT
    router.post('/update', async(req, res)=>{
        await updateON(req.body)
        res.render('../views/forms/customer_form', {task:"update", id: " 1 ", method: "POST", where: "UPDATE on CUSTOMER", action:"/customer/update"})
    })
}catch(err){
    console.error("Error catched in customer update.")
}


/*
    RENDER DELETE FORM
    HANDLE DELETE REQUEST
 */

try{
    // will render customer_form to get the information as UPDATE
    router.get('/delete', (req, res)=>{
        res.render('../views/forms/customer_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/delete"})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/delete', async(req, res)=>{
        await deleteFROM(req.body)
        res.render('../views/forms/customer_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/delete"})
    })
}catch(err){
    console.error("Error catched in customer delete")
}


// Customer search
try{

    // will render customer_form to get the information as UPDATE
    router.get('/search', (req, res)=>{
        // res.send("WELCOME TO C SEARCH")
        res.render('../views/search/s_customer', {task:"search", method: "POST", where: "SEARCH from CUSTOMER", action:"/customer/search", crows: " "})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/search', async(req, res)=>{
        console.log(req.body.code)
        if(req.body.code == 'id'){
            console.log(req.body.id)
            let sql = `SELECT * FROM Customer WHERE Customer_id = $id;`
            let param = {$id: req.body.id}
            let row = await sqliteAll(sql, param, "SEARCH")

            res.render('../views/search/s_customer', {task:"search", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/search", crows: row})

        } else if (req.body.code == 'name') {
            console.log(req.body.lastName)
            let sql = `SELECT * FROM Customer WHERE last_name = $lname;`
            let param = {$lname: req.body.lastName}
            let row = await sqliteAll(sql, param, "SEARCH")

            res.render('../views/search/s_customer', {task:"search", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/search", crows: row})

        }else if (req.body.code == 'ph') {
            let sql = `SELECT * FROM Customer WHERE phone = $ph;`
            let param = {$ph: req.body.phone}
            let row = await sqliteAll(sql, param, "SEARCH")
            res.render('../views/search/s_customer', {task:"search", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/search", crows: row})
        }


        // res.render('../views/search/s_customer', {task:"search", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/search", crows: " "})
    })
}catch(err){
    console.error("Error catched in customer delete")
}






/*
    FUNCTIONS
 */

// PREPARE INSERT 
async function insertINTO(data) {
    let sql = `
            INSERT INTO Customer (first_name, last_name, phone) 
            VALUES ($f, $l, $p)
            `
    let parameter = {
        $f: data.firstName,
        $l: data.lastName,
        $p: data.phone
    }
    await sqliteRun(sql, parameter, "INSERT");
}


// update
async function updateON(data) {
    let sql = `
            UPDATE Customer 
            SET first_name = $f,last_name = $l, phone = $p 
            WHERE Customer_id = $i
            `
    // let id = parseInt(data.id);
    let parameter = {
        $f: data.firstName,
        $l: data.lastName,
        $p: data.phone,
        $i: parseInt(data.id)
    }
    await sqliteRun(sql, parameter, "UPDATE")
}


// delete
async function deleteFROM(data) {
    let sql = `
            DELETE FROM Customer WHERE Customer_id = $i
        `
    let parameter = {
        $i: parseInt(data.id)
    }
    await sqliteRun(sql, parameter, "DELETE")
}


// runs the sql queries with given parameters
async function sqliteRun(sql, parameters, msg){
    let promise = new Promise( function(resolve, reject){
        let database = new sqlite3.Database("Shop.db");
        database.serialize();

        database.run(sql, parameters, function(err, rows){
            if(err){
                reject(err)
            }
            else {
                resolve(rows)
            }
        }); 

        console.log(msg + " SUCCESS!")
        database.close();
    });

    let result = await promise;
    
    return result;
}


// List 
async function sqliteAll(sql, param,  msg) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database("Shop.db");
        database.serialize();
        database.all(sql, param, function(error, rows) {
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