const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    // res.send("Order HOME")
})

router.get('/insert', (req, res)=>{
    res.send("Order INSERT")
})

router.get('/update', (req, res)=>{
    res.send("Order UPDATE")
})

router.get('/delete', (req, res)=>{
    res.send("Order DELETE")
})


// export 
module.exports = router