const express = require('express')
const app = express()
const router = express.Router()
const sqlite3 = require("sqlite3")



/*
    RENDER INSERT FORM
    HANDLE POST REQUEST
 */
try{
    router.get('/insert', (req, res)=>{
        res.render('../views/forms/item_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ITEM", action:"/item/insert", refer:" "})
    })

    router.post('/insert', async (req, res)=>{
        await insertINTO(req.body)
        res.render('../views/forms/item_form', {task: "insert", id: " ", method: "POST", where: "INSERT into ITEM", action:"/item/insert", refer:" "})
    })
    
}catch(err){
    console.error("Item Insert Error Catched.")
}


/*
    RENDER UPDATE FORM
    HANDLE PUT REQUEST
 */
// take care request from insert file
try{
    router.get('/update', (req, res)=>{
        let obj = {
            task: "update", 
            id: " 1 ", 
            method: "POST", 
            where: "UPDATE on ITEM", 
            action:"/item/update",
            refer:" "
        }

        res.render('../views/forms/item_form', obj)
    })

    router.post('/update', async(req, res)=>{
        await updateON(req.body)
        res.render('../views/forms/item_form', {task: "update", id: " 1 ", method: "POST", where: "UPDATE on ITEM", action:"/item/update", refer:" "})
    })

}catch(err){
    console.error("Item update Error Catched.")
}


/*
    RENDER DELETE FORM
    HANDLE DELETE REQUEST
 */
try{
    router.get('/delete', (req, res)=>{
        res.render('../views/forms/item_form', {task: "delete", id: " 1 ", method: "POST", where: "DELETE on ITEM", action:"/item/delete", refer:" "})
    })

    router.post('/delete', async (req, res)=>{
        // if item_id is in use in order_detail, then it should not delete
        if(await isExist(req.body.id)) {
            // if exist
            console.log("item_id is in use of Order_detail table")
            // output 
            let sql = `SELECT * FROM Order_detail WHERE Item_id = $id;`
            let param = {$id: req.body.id}
            let refer = await sqliteAl(sql, param)

            res.render('../views/forms/item_form', {task: "delete", id: " 1 ", method: "POST", where: "DELETE on ITEM", action:"/item/delete", refer: refer})
        }else {
            // if item_id is not in use, then delete ok
            await deleteFROM(req.body)
            res.render('../views/forms/item_form', {task: "delete", id: " 1 ", method: "POST", where: "DELETE on ITEM", action:"/item/delete", refer:" "})
        }
    })


}catch(err){
    console.error("Item Delete error catched.")
}


// ITEM search
try{
    // will render Item form  to get the information as UPDATE
    router.get('/search', (req, res)=>{
        // res.send("WELCOME TO C SEARCH")
        res.render('../views/search/s_item', {task:"search", method: "POST", where: "SEARCH from ITEM", action:"/item/search", crows: " "})
    })

    // will render cunstomr_form to delete info as DELETE
    router.post('/search', async(req, res)=>{
        console.log(req.body.code)
        if(req.body.code == 'id'){
            console.log(req.body.id)
            let sql = `SELECT * FROM Item WHERE Item_id = $id;`

            let param = {$id: req.body.id}
            let row = await sqliteA(sql, param, "SEARCH")

            res.render('../views/search/s_item', {task:"search", method: "POST", where: "SEARCH from ITEM", action:"/item/search", crows: row})

        } else if (req.body.code == 'iname') {
            console.log(req.body.itemName)
            let sql = `SELECT * FROM Item WHERE item_name = $name;`
            let param = {$name: req.body.itemName}
            let row = await sqliteA(sql, param, "SEARCH")

            res.render('../views/search/s_item', {task:"search", method: "POST", where: "SEARCH from ITEM", action:"/item/search", crows: row})
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
            INSERT INTO Item (item_name, price, weight, description) 
            VALUES ($n, $p, $w, $d)
            `
    let parameter = {
        $n: data.itemName,
        $p: data.price,
        $w: data.weight,
        $d: data.description
    }
    await sqliteRun(sql, parameter, "INSERT");
}


// update
async function updateON(data) {
    let sql = `
            UPDATE Item 
            SET item_name = $n,price = $p, weight = $w, description = $d 
            WHERE Item_id = $i
            `
    // let id = parseInt(data.id);
    let parameter = {
        $n: data.itemName,
        $p: data.price,
        $w: data.weight,
        $d: data.description,
        $i: parseInt(data.id)
    }
    await sqliteRun(sql, parameter, "UPDATE")
}


// delete
async function deleteFROM(data) {
    let sql = `
            DELETE FROM Item WHERE Item_id = $i
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

async function sqliteAl(sql, parameters) {
    let promise = new Promise((resolve, reject) => {
        let database = new sqlite3.Database("Shop.db");
        database.serialize();
        database.all(sql, parameters, function(error, rows) {
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

/**
 * CHECK if Item key exists in Order_details, then should not delete
 */

 async function isExist(id) {
    let sql = `
        SELECT EXISTS(SELECT * FROM Order_detail
            WHERE Item_id = $id) AS Count;
        `
    let param = {
        $id: id
    };
    let rows = await sqliteAll(sql, param, "Check Exist")
    let result = !rows[0].Count;
    return result;
}



// List 
async function sqliteA(sql, param,  msg) {
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
