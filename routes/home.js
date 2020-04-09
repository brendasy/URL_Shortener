const express = require('express')
const router = express.Router()

// 載入 url model
const Url = require('../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  var randomCode
  while (randomCode === undefined) {
    let tempCode
    tempCode = Math.random().toString(36).slice(-5) //產生五碼英數亂碼
    await Url.findOne({ code: tempCode }).then((url) => {
      if (url) {
        return  //如果亂碼已重複就再產生一次
      }
      else {
        randomCode = tempCode
      }
    })
  }
  Url.create({  //產生一組新的網址對應資料
    code: randomCode,   //亂碼代號
    destination: req.body.destination   //實際網址
  })

  res.render('index', { oriUrl: req.body.destination, url: req.headers.origin + '/' + randomCode })
})

router.get('/:code', (req, res) => {

  Url.findOne({ code: req.params.code })  //利用網址後的代碼當作參數找到對應的真實網址
    .then(url => {
      if (url) {
        res.redirect(url.destination)
      }
      else {  //找不到相對代碼就導回首頁
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))

})


module.exports = router