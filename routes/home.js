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

const homeSchema = new mongoose.Schema({})

const homeModel = mongoose.model('Home',homeSchema,'homes')

router.get('/',(req,res) =>{
  homeModel.find({} ,(err,data) => {
    if(err) {
      console.log(err);
    }else {
      res.send(data)
    }
  })
})

module.exports = router


// const express = require('express');
// const path = require('path');
// const fs = require('fs');

// const router = express()

// router.get('/',(req,res) => {
//   let file = path.join(__dirname,'../public/json/mall-home.json')

//   //* 读取文件
//   fs.readFile(file,'utf-8',(err,data) => {
//     if (err) {
//       res.send('FILE Not Found!!!!')
//     }else {
//       res.send(data)
//     }
//   })
// })
// module.exports = router
