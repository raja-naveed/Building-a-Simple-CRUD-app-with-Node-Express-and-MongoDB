const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
// mongodb+srv://rajadahri11:2U42RySiCedejB3c@cluster0.lxwesof.mongodb.net/?retryWrites=true&w=majority
// getting local host url
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });

// connecting to database
client
  .connect()
  .then((client) => {
    console.log("Connected to Database");
    // creating a database
    const db = client.db("raja");
    // creating a collection in database
    const quotesCollection = db.collection("quotes");

    // post data to database
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });
    // get data from database
    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch(/* ... */);
    });

    // update data from database
    app.put("/quotess", (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Hosh' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        }
      )
        .then(result => {
          res.json('Success')
        })
        .catch(error => console.error(error))
    });

    // listing on port 3000
    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));
