const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');

const DB_NAME = 'mogu'
const DB_URL = '127.0.0.1:27017'

mongoose.connect(`mongodb:\/\/${DB_URL}/${DB_NAME}`,{useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  if(err) {
    throw err
  }else {
    console.log(`${DB_NAME} 数据库连接成功`);
  }
})

const detailSchema = new mongoose.Schema({})

const detailModel = mongoose.model('Detail',detailSchema,'details')

router.get('/',(req,res) =>{
  detailModel.find({} ,(err,data) => {
    if(err) {
      console.log(err);
    }else {
      res.send(data)
    }
  })
})

module.exports = router


//************ 本地读取JSON文件 ********************* */
// const express = require('express');
// const path = require('path');
// const fs =  require('fs');

// const router = express()

// router.get('/',(req,res) => {
//   let file = path.join(__dirname,'../public/json/detail.json')

//   fs.readFile(file,'utf-8',(err,data) => {
//     if(err){
//       res.send('File Not Found')
//     }else {
//       res.send(data)
//     }
//   })
// })

// module.exports = router
