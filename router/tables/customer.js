const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("Customer HOME")
    res.render('../views/forms/customer_form', {method: "POST", where: "Insert into CUSTOMER", action:"/insert"})
})

router.get('/insert', (req, res)=>{
    // res.send("Customer HOME")
    res.render('../views/forms/customer_form', {method: "POST", where: "Insert into CUSTOMER", action:"/insert"})
})

// will render customer_form to get the information as INSERT
router.post('/insert', (req, res)=>{
    
    console.log(req.body)
    res.render('../views/forms/customer_form', {method: "POST", where: "Insert into CUSTOMER", action:"/customer/insert"})
})


router.get('/update', (req, res)=>{
    // res.send("Customer HOME")
    res.render('../views/forms/customer_form', {method: "POST", where: "Insert into CUSTOMER", action:"/insert"})
})

// will render customer_form to get the information as INSERT
router.post('/update', (req, res)=>{
    
    console.log(req.body)
    res.render('../views/forms/customer_form', {method: "POST", where: "Insert into CUSTOMER", action:"/customer/insert"})
})


// will render customer_form to get the information as UPDATE
router.put('/update', (req, res)=>{
    res.send("Customer UPDATE")
})

// will render cunstomr_form to delete info as DELETE
router.get('/delete', (req, res)=>{
    res.send("Customer delete")
})


// export 
module.exports = router