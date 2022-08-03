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





// export 
module.exports = router