const express = require('express')
const app = express()
const port = 3000
const routers = require('./routers')

// console.log(Art)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(routers)


app.listen(port, () =>{
  console.log(`success port`, port)
})

