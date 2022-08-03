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
        res.render('../views/forms/order_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ORDER", action:"/orders/insert", rows: " "})
    })

    // TAKE CARE OF POST FROM INSERT
    router.post('/insert', async(req, res)=>{
        if(!await isExist(req.body.customer_id)){
            await insertINTO(req.body)
        } else {
            console.log("Customer Does not exist, so can not reference INSERT")
        }
        res.render('../views/forms/order_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ORDER", action:"/orders/insert", rows: " "})
    })
}catch(err){
    console.error("Catch error on INSERT into Orders")
}



/*
    RENDER UPDATE FORM
    HANDLE PUT REQUEST
 */

try{
    router.get('/update', (req, res)=>{
        // res.send("Customer HOME")
        res.render('../views/forms/order_form', {task: "update", id: " 1 ", method: "POST", where: "UPDATE on ORDER", action:"/orders/update", rows: " "})
    })
    
    // will render order_form to get the information as INSERT
    router.post('/update', async(req, res)=>{
        if(!await isExist(req.body.customer_id)){
            await updateON(req.body)
        } else {
            console.log("Customer Does not exist, so can not reference UPDATE")
        }
        res.render('../views/forms/order_form', {task:"update", id: " 1 ", method: "POST", where: "UPDATE on ORDER", action:"/orders/update", rows: " "})
    })
}catch(err){
    console.error("Error catched in ORDER update.")
}


/*
    RENDER DELETE FORM
    HANDLE DELETE REQUEST
 */

try{
    // will render customer_form to get the information as UPDATE
    router.get('/delete', (req, res)=>{
        res.render('../views/forms/order_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from ORDER", action:"/orders/delete", rows: " "})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/delete', async(req, res)=>{
        if(!await isOidExist(req.body.id)){
            // if the order_id is in use of Order_details
            console.log("Order_id is in use of Order_detail table")
            // output the order_detail table that order_id = 
            let sql = `SELECT * FROM Order_detail WHERE Order_id = $id;`
            let param = {$id: req.body.id}
            let rows = await sqliteAll(sql, param, "DELETE REFERENCE")
            res.render('../views/forms/order_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from ORDER", action:"/orders/delete", rows:rows})
        }
        else{
            await deleteFROM(req.body)
            res.render('../views/forms/order_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from ORDER", action:"/orders/delete", rows: " "})
        }
    })
}catch(err){
    console.error("Error catched in Orders delete")
}






// ORDER search
try{
    // will render customer_form to get the information as UPDATE
    router.get('/search', (req, res)=>{
        res.render('../views/search/s_orders', {task:"search", method: "POST", where: "SEARCH from ORDER", action:"/orders/search", crows: " "})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/search', async(req, res)=>{

        console.log(req.body.code)
        // res.send("Waht is Order")

        if(req.body.code == 'id'){
            console.log(req.body.id)
            let sql = `SELECT * FROM Orders WHERE Order_id = $id;`
            let param = {$id: req.body.id}
            let row = await sqliteAll(sql, param, "SEARCH")

            res.render('../views/search/s_orders', {task:"search", method: "POST", where: "DELETE from ORDER", action:"/orders/search", crows: row})
        } else {
            res.render('../views/search/s_orders', {task:"search", method: "POST", where: "SEARCH from ORDER", action:"/orders/search", crows: " "})
        }


        // res.render('../views/search/s_orders', {task:"search", method: "POST", where: "DELETE from CUSTOMER", action:"/customer/search", crows: " "})
    })
}catch(err){
    console.error("Error catched in customer delete")
}








/**
 * CHECK if Foreign key exists for Reference
 */

async function isExist(id) {
    let sql = `
        SELECT EXISTS(SELECT * FROM Customer
            WHERE Customer_id = $id) AS Count;
        `
    let param = {
        $id: id
    };
    let rows = await sqliteAll(sql, param, "Check Exist")
    let result = !rows[0].Count;
    return result;
}

// check if order id in order_details
async function isOidExist(id) {
    let sql = `
        SELECT EXISTS(SELECT * FROM Order_detail
            WHERE Order_id = $i) AS Count;
        `
    let param = {
        $i: id
    };
    let rows = await sqliteAll(sql, param, "Check Exist")
    let result = !rows[0].Count;
    return result;
}

/*
    FUNCTIONS
 */

// PREPARE INSERT 
async function insertINTO(data) {
    let sql = `
            INSERT INTO Orders (Customer_id, date) 
            VALUES ($c, $d)
            `
    let parameter = {
        $c: data.customer_id,
        $d: data.date
    }
    await sqliteRun(sql, parameter, "INSERT");
}


// update
async function updateON(data) {
    let sql = `
            UPDATE Orders 
            SET Order_id = $i, Customer_id = $c, date = $d
            WHERE Order_id = $i
            `
    // let id = parseInt(data.id);
    let parameter = {
        $d: data.date,
        $c: data.customer_id,
        $i: parseInt(data.id)
    }
    await sqliteRun(sql, parameter, "UPDATE")
}


// delete
async function deleteFROM(data) {
    let sql = `
            DELETE FROM Orders WHERE Order_id = $i;
        `
    let parameter = {
        $i: parseInt(data.id)
    }
    await sqliteRun(sql, parameter, "DELETE")
}

// List 
async function sqliteAll(sql, parameters, msg) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database("Shop.db");
        database.serialize();
        database.all(sql, parameters, function(error, rows) {
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