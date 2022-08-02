const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.send("Item HOME")
    // res.render('../views/item', {message: "hello from kim, INSERT"})
})


// take care request from insert file
router.get('/', (req, res)=>{
    res.send("Item HOME")
})

router.get('/insert', (req, res)=>{
    res.send("Item INSERT")
})

router.get('/update', (req, res)=>{
    res.send("Item UPDATE")
})

router.get('/delete', (req, res)=>{
    res.send("Item DELETE")
})



// export 
module.exports = router
