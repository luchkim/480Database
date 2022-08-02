const express = require('express')
const app = express()


const router = express.Router()

router.get('/', (req, res)=>{
    res.render('../views/insert', {message: "hello from kim, INSERT"})
})


// take care request from insert file
router.get('/', (req, res)=>{
    res.send("Insert with ID")
})

// export 
module.exports = router
