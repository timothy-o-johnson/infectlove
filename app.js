var express = require('express')
var login = require('./login')
var app = express()
var port = 3000
var database = 'infect_love_website'
var login = login.login()
var connectionString = `mongodb+srv://InfectLoveAdmin:${login}@infectlove0.7wwgn.mongodb.net/${database}?authSource=admin&replicaSet=InfectLove0-shard-0&readPreference=primary&ssl=true`

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static(__dirname + "/public/"))

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var definitionSchema = new mongoose.Schema({
  _id: Number,
  definition: String
})

var User = mongoose.model('definitions', definitionSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/addDefinition', (req, res) => {
  // console.log({req, res})
  var myData = new User(req.body)
  console.log(req.body)
  // today, 10/6/20 2:40pm:   1602009700527
  myData
    .save()
    .then(item => {
      console.log(item)
      res.sendFile(__dirname + '/index.html')
      // res.send('item saved to database')
    })
    .catch(err => {
      res.status(400), send('unable to save to database')
    })
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
