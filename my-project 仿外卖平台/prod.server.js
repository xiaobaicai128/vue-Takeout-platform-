var express = require('express')
var config = require('./config/index')
var port = process.env.PORT || config.build.port 

var app = express()
var router = express.Router()
router.get('/', function(req,res,next) {
  req.url = '/index.html'
  next()
})
app.use(router)
var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
var apiRoutes = express.Router()

		  app.get('/api/seller', (req, res) => {
		    res.json({
		      // 这里是你的json内容
		      errno: 0,
		      data: seller
		    })
		  }),
		  app.get('/api/goods', (req, res) => {
		    res.json({
		      // 这里是你的json内容
		      errno: 0,
		      data: goods
		    })
		  }),
		  app.get('/api/ratings', (req, res) => {
		    res.json({
		      // 这里是你的json内容
		      errno: 0,
		      data: ratings
		    })
app.use('/api', apiRoutes)		     
app.use(express.static('./dist'))

app.listen(port, function(err){
	if(err) {
		console.log(err)
		return
	}
})