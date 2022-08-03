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
        res.render('../views/forms/order_detail_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ORDER DETAIL", action:"/order_detail/insert"})
    })

    // TAKE CARE OF POST FROM INSERT
    router.post('/insert', async(req, res)=>{
        let sql = `
        SELECT EXISTS(SELECT * FROM Item
            WHERE Item_id = $id) AS Count;
        `
        let sq = `
        SELECT EXISTS(SELECT * FROM Orders
            WHERE Order_id = $id) AS Count;
        `

        let item = await isExist(sql, req.body.item_id) 
        let order = await isExist(sq, req.body.order_id)

        if(!item && !order){
            await insertINTO(req.body)
            // if both exists INSERT
        } else if (!item && order) {
            console.log("Order Detail insert fail. No Order_id: ", req.body.order_id)
        }else if (item && !order){
            console.log("Order Detail insert fail. No Item_id: ", req.body.item_id)
        } else {
            console.log("Order Detail insert fail. Both ID Does not exist.")
        }

        res.render('../views/forms/order_detail_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ORDER DETAIL", action:"/order_detail/insert"})
    })
}catch(err){
    console.error("Catch error on INSERT into Orders Detail")
}



/*
    RENDER UPDATE FORM
    HANDLE PUT REQUEST
 */

try{
    router.get('/update', (req, res)=>{
        res.render('../views/forms/order_detail_form', {task: "update", id: " ", method: "POST", where: "UPDATE on ORDER DETAIL", action:"/order_detail/update"})
    })
    
    // will render order_detail_form to get the information
    router.post('/update', async(req, res)=>{
        let sql = `
        SELECT EXISTS(SELECT * FROM Item
            WHERE Item_id = $id) AS Count;
        `
        let sq = `
        SELECT EXISTS(SELECT * FROM Orders
            WHERE Order_id = $id) AS Count;
        `

        let item = await isExist(sql, req.body.item_id) 
        let order = await isExist(sq, req.body.order_id)
        if(!item && !order){
            // if both exists UPDATE
            await updateON(req.body)
        } else if (!item && order) {
            console.log("Order Detail UPDATE fail. No Order_id: ", req.body.order_id)
        }else if (item && !order){
            console.log("Order Detail UPDATE fail. No Item_id: ", req.item_id)
        } else {
            console.log("Order Detail UPDATE fail. Both ID Does not exist.")
        }
        res.render('../views/forms/order_detail_form', {task:"update", id: " ", method: "POST", where: "UPDATE on ORDER DETAIL", action:"/order_detail/update"})
    })
}catch(err){
    console.error("Error catched in ORDER Detail update.")
}


/*
    RENDER DELETE FORM
    HANDLE DELETE REQUEST
 */


try{
    // will render order-detail form  to get the information as UPDATE
    router.get('/delete', (req, res)=>{
        res.render('../views/forms/order_detail_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from ORDER DETAIL", action:"/order_detail/delete"})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/delete', async(req, res)=>{
        let sql = `
        SELECT EXISTS(SELECT * FROM Item
            WHERE Item_id = $id) AS Count;
        `
        let sq = `
        SELECT EXISTS(SELECT * FROM Orders
            WHERE Order_id = $id) AS Count;
        `

        let item = await isExist(sql, req.body.item_id) 
        let order = await isExist(sq, req.body.order_id)

        if(!item && !order){
            // if both exists DELETE
            await deleteFROM(req.body)
            
        } else if (!item && order) {
            console.log("Order Detail DELETE fail. No Order_id: ", req.body.order_id)
        }else if (item && !order){
            console.log("Order Detail DELETE fail. No Item_id: ", req.item_id)
        } else {
            console.log("Order Detail DELETE fail. Both ID Does not exist.")
        }
        res.render('../views/forms/order_detail_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE from ORDER DETAIL", action:"/order_detail/delete"})
    })
}catch(err){
    console.error("Error catched in Orders Detail delete")
}



/**
 * CHECK if Foreign key exists for Reference
 */

async function isExist(sql, id) {
    let param = {
        $id: parseInt(id)
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
            INSERT INTO Order_detail (Order_id, Item_id, quantity, price) 
            VALUES ($oid, $iid, $q, $p)
            `
    let parameter = {
        $oid: parseInt(data.order_id),
        $iid: parseInt(data.item_id),
        $q: data.quantity,
        $p: data.price
    }
    await sqliteRun(sql, parameter, "INSERT");
}


// update
async function updateON(data) {
    let sql = `
            UPDATE Order_detail
            SET Order_id = $oid, Item_id = $iid, quantity = $q, price =$p
            WHERE Order_id = $oid AND Item_id = iid
            `
    // let id = parseInt(data.id);
    let parameter = {
        $oid: parseInt(data.order_id),
        $iid: parseInt(data.item_id),
        $q: quantity,
        $p: price
    }
    await sqliteRun(sql, parameter, "UPDATE")
}


// delete
async function deleteFROM(data) {
    let sql = `
            DELETE FROM Order_detail WHERE Order_id = $oid AND Item_id = $iid
        `
    let parameter = {
        $oid: data.order_id,
        $iid: data.item_id
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