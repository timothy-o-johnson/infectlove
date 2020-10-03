var express = require('express')
var app = express()
var port = 3000
var database = 'infect_love_website'
var login = 'FFBlhXjFTBCkUo5C'
var connectionString = `mongodb+srv://InfectLoveAdmin:${login}@infectlove0.7wwgn.mongodb.net/${database}?authSource=admin&replicaSet=InfectLove0-shard-0&readPreference=primary&ssl=true`

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
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
  // console.log(myData)
  myData
    .save()
    .then(item => {
      console.log(item)
      res.send('item saved to database')
    })
    .catch(err => {
      res.status(400), send('unable to save to database')
    })
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})
