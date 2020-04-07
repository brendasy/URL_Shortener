const express = require('express')
const app = express()

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')

//載入express-handlebars作為template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

//設定路由
app.use('/', require('./routes/home'))

//設定mongoose連線的dbs位置
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/url',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//把這個連線狀態,儲存到 db 這個物件
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.listen(process.env.PORT || 3000, () => {
  console.log('Express is running on port 3000')
})