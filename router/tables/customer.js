const express = require('express')
const router = express.Router()



/*
    RENDER INSERT FORM
    HANDLE POST REQUEST
 */

// RENDER INSERT FORM WITH POST METHOD
router.get('/insert', (req, res)=>{
    res.render('../views/forms/customer_form', {task: "insert", id: " ", method: "POST", where: "Insert into CUSTOMER", action:"/customer/insert"})
})

// TAKE CARE OF POST FROM INSERT
router.post('/insert', (req, res)=>{

    console.log(req.body)
    res.render('../views/forms/customer_form', {task: "insert", id: " ", method: "POST", where: "Insert into CUSTOMER", action:"/customer/insert"})
})



/*
    RENDER UPDATE FORM
    HANDLE PUT REQUEST
 */

router.get('/update', (req, res)=>{
    // res.send("Customer HOME")
    res.render('../views/forms/customer_form', {task: "update", id: " 1 ", method: "POST", where: "UPDATE on CUSTOMER", action:"/customer/update"})
})

// will render customer_form to get the information as INSERT
router.post('/update', (req, res)=>{
    console.log(req.body)
    res.render('../views/forms/customer_form', {task:"update", id: " 1 ", method: "POST", where: "UPDATE on CUSTOMER", action:"/customer/update"})
})


/*
    RENDER DELETE FORM
    HANDLE DELETE REQUEST
 */

// will render customer_form to get the information as UPDATE
router.get('/delete', (req, res)=>{
    res.render('../views/forms/customer_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE on CUSTOMER", action:"/customer/delete"})
})

// will render cunstomr_form to delete info as DELETE
router.post('/delete', (req, res)=>{
    console.log(req.body)
    res.render('../views/forms/customer_form', {task:"delete", id: " 1 ", method: "POST", where: "DELETE on CUSTOMER", action:"/customer/delete"})
})


/*
    RENDER SEARCH FORM
    HANDLE SEARCH REQUEST
 */

// will render customer_form to get the information as UPDATE
router.get('/search', (req, res)=>{
    res.send("Customer UPDATE")
    // res.render('../views/forms/customer_form', {task:"search", id: " 1 ", method: "POST", where: "SEARCH on CUSTOMER", action:"/customer/delete"})
})

// will render cunstomr_form to delete info as DELETE
router.post('/search', (req, res)=>{
    res.send("Customer delete")
})


// export 
module.exports = router