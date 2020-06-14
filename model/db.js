/* 
mongo.exe     // 进入mongodb环境
show dbs     // 查看全部数据库
use Model    // 使用Model数据库
show collections    // 查看Model数据库的全部集合
db.student.find()    // 查看student集合的数据，在访问页面后就会数据就会写入这个集合
*/
const MongoClient = require('mongoose');

// const MongoClient2 = require('mongodb').MongoClient;
// const MongoClient = MongoClient1 || MongoClient2

// 封装内部函数 连接数据库
_connectDB = (callback) => {
    let url = 'mongodb://localhost:27017/mogu';
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,db) => {
        if(err) {
            callback(err,null)
            db.close()
            return;
        }
        callback(err,db)
    })
}

//?封装新增数据函数
exports.insertOne = (collectionName, json, callback) => {
  // 连接数据库成功之后回调插入数据
  _connectDB((err,db) => {
      // 插入数据后回调参数  再传递回给形参
      db.collection(collectionName).insertOne(json, (err, result) => {
          callback(err, result)
          // 每次操作完毕记得关闭数据库
          db.close()
      })
  })
}

//? 封装删除数据函数
exports.deleteMany = (collectionName,json,callback) => {
  _connectDB((err,db) => {
      // 选择集合 删除具体的一条数据
      db.collection(collectionName).deleteMany(
          json,
          (err,result) => {
              callback(err,result);
              db.close()
      })
  })
}
//? 修改封装
exports.updateMany = (collectionName, json1, json2, callback) => {
  // 选择具体集合 json1: 要修改的旧数据  json2: 修改成什么样
  _connectDB((err,db) => {
      json1,
      json2,
      (err,result) => {
          callback(err, results)
          db.close()
      }
  })
}


//? 查询封装
exports.find = (collectionName,json,C,D) => {
  // 列表名称 查找条件 分页查询  回调函数
  let result = []
  // 不传第三个参数的时候，默认查询全部 如果全部参数都传了，就按照条件查询
  if(arguments.length == 3) {
      let callback = C
      let skipnumber = 0
      let limit = 0
  } else if(arguments.length == 4){
      let callback = D
      let args = C
      // 忽略数量 = 每页显示多少条 * 当前页数
      let skipnumber = args.pageamount * args.page || 0
      let limit = args.pageamount || 0        // 数目限制显示多少条
      let sort = args.sort || {}        // 排序方式
  } else {
      throw new Error('find函数的参数个数，必须是三个或者四个')
      return;
  }

  _connectDB((err,db) => {
      // 创建新游标
      let cursor = db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);

      cursor.each((err,doc) => {
          if(err) {
              callback(err,null)
              db.close()
              return;
          }
          // 判断 doc 是否有效 无效的话就是遍历结束了 那就返回查询到的全部数据
          if(doc != null) {
              result.push(doc)
          } else {
              callback(null,result)
              db.close()
          }
      })
  })
}

