const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Order_details HOME")
})

// to access this page from URL, http://localhost:3000/order_details/contact
router.get('/insert', (req, res)=>{
    res.send("Order_details INSERT")
})

router.get('/update', (req, res)=>{
    res.send("Order_details UPDATE")
})


router.get('/delete', (req, res)=>{
    res.send("Order_details DELETE")
})

// export 
module.exports = router