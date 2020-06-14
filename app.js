const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
//?   日志中间件
// const logger = require("morgan");

const indexRouter = require("./routes/index");
const homesRouter = require("./routes/home");
const goodsRouter = require("./routes/goods");
const detailsRouter = require("./routes/detail");

const app = express();

//* 跨域访问
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method.toLowerCase() == "options") res.send(200);
  else next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
// 设置模板引擎
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/home", homesRouter);
app.use("/goods",goodsRouter)
app.use("/detail",detailsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(() =>{
  console.log('app listening on port 3000.');
})
module.exports = app;
