const express = require("express");
const bodyParser = require("body-parser");
const {MongoClient} = require("mongodb");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyParser.json())
// mongodb+srv://rajadahri11:2U42RySiCedejB3c@cluster0.lxwesof.mongodb.net/?retryWrites=true&w=majority
const url =
  "mongodb://localhost:27017";
  const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect()
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("raja");
    const quotesCollection = db.collection("quotes");
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    })
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(/* ... */)
       
    });
    app.put('/quotes', (req, res) => {
      console.log(req.body)
      console.log("Hello This Is My Group")
    })
  

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));
